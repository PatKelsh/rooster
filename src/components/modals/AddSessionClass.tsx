"use client";

import { Dispatch, SetStateAction, SubmitEvent, useEffect, useState } from "react";
import { Add } from '@mui/icons-material';
import ModalComponent from "@/components/.ui/Modal";
import Button from "@/components/.ui/Button";
import SessionClassForm from "../forms/sessionClass";

interface AddSessionClassModalProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  sessionId: string;
  sessionName?: string;
}

const AddSessionClassModal = ({
  setIsLoading,
  sessionId,
  sessionName
}: AddSessionClassModalProps) => {
  const [classOptions, setClassOptions] = useState<{ id: string; name: string }[]>([]);
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [formData, setFormData] = useState({
    classId: "",
    className: "",
    price: 0,
    capacity: 0,
    termSpecificDescription: "",
    classInstances: [{
      daysOfTheWeek: [] as string[],
      startTime: "",
      endTime: "",
    }],
    termId: sessionId,
  });
  const [submitting, setSubmitting] = useState(false);

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false);
    }, 1000);
  }

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await fetch("/api/admin/classNames");
        const data = await response.json();
        setClassOptions(data);
      } catch (error) {
        console.error(`Failed to fetch class options: ${error instanceof Error ? error.message : "An unexpected error occurred"}`);
      }
    };

    fetchClassOptions();
  }, []);

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const selectedClass = classOptions.find(option => option.id === value);
    setFormData(prev => prev ? { ...prev, [name]: value, className: selectedClass ? selectedClass.name : "" } : prev);
  };

  const handleInstanceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      const updatedRoster = [...prev.classInstances];
      updatedRoster[index] = { ...updatedRoster[index], [name]: value };
      return { ...prev, classInstances: updatedRoster };
    });
  };

  const handleAddAnotherDayTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(prev => prev ? {
      ...prev,
      classInstances: [...prev.classInstances, { daysOfTheWeek: [], startTime: "", endTime: "" }]
    } : prev);
  };

  const handleRemoveDayTime = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const updatedInstances = formData.classInstances.filter((_, i) => i !== index);
    setFormData(prev => prev ? { ...prev, classInstances: updatedInstances } : prev);
  };

  const handleDayToggle = (index: number, dayId: string) => {
    setFormData(prev => {
      if (!prev) return prev;
      const updatedInstances = [...prev.classInstances];
      const currentDays = updatedInstances[index].daysOfTheWeek as string[];
      updatedInstances[index] = {
        ...updatedInstances[index],
        daysOfTheWeek: currentDays.includes(dayId)
          ? currentDays.filter(d => d !== dayId)
          : [...currentDays, dayId]
      };
      return { ...prev, classInstances: updatedInstances };
    });
  };

  const addSessionBtn = <><Add /> Add <span className="hide-for-mobile">Class</span></>;

  const modalHeader = <h2>Add Class to {sessionName || "Session"}</h2>;

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/classDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to add class.");
      }
      
      setCloseOnAction(true);
      resetCloseOnAction();
      setIsLoading(true);
    } catch (error) {
      console.error("Error adding class:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const submitBtn = () => {
    return (
      <Button handleSubmit={handleSubmit}>
        Add Class
      </Button>
    );
  };

  return (
    <>
      <ModalComponent
        modalBtnContent={addSessionBtn}
        ariaTitle="Add Class Modal"
        ariaDescription="Modal for adding a new class to the session"
        modalHeader={modalHeader}
        modalBtnClassName="w-icon small"
        btnAction={submitBtn()}
        closeOnAction={closeOnAction}
      >
        <SessionClassForm
          sessionId={sessionId}
          submitting={submitting}
          setFormData={setFormData}
          formData={formData}
        />
      </ModalComponent>
    </>
  )
}

export default AddSessionClassModal;