"use client";

import { Dispatch, SetStateAction, SubmitEvent, useEffect, useState } from "react";
import { Add, AttachMoney } from '@mui/icons-material';
import Autocomplete from "@/components/.ui/Autocomplete";
import ModalComponent from "@/components/.ui/Modal";
import TextField from "@/components/.ui/TextField";
import Button from "@/components/.ui/Button";

interface AddSessionClassModalProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  sessionId: string;
  classCount: number;
  sessionName?: string;
}

const AddSessionClassModal = ({
  setIsLoading,
  sessionId,
  classCount,
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
      dayOfTheWeek: "",
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
      classInstances: [...prev.classInstances, { dayOfTheWeek: "", startTime: "", endTime: "" }]
    } : prev);
  };

  const handleRemoveDayTime = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const updatedInstances = formData.classInstances.filter((_, i) => i !== index);
    setFormData(prev => prev ? { ...prev, classInstances: updatedInstances } : prev);
  };

  const addSessionBtn = <><Add /> Add <span className="hide-for-mobile">Class</span></>;

  const modalHeader = <h2>Add Class to {sessionName || "Session"}</h2>

  return (
    <>
      <ModalComponent
        modalBtnContent={addSessionBtn}
        ariaTitle="Add Class Modal"
        ariaDescription="Modal for adding a new class to the session"
        modalHeader={modalHeader}
        modalBtnClassName="w-icon small"
        closeOnAction={closeOnAction}
      >
        <div className="form-container">
          <form className="add-session-class-form">
            <Autocomplete
              options={classOptions}
              label="Class"
              name="classId"
              initialValue={formData.className}
              disabled={submitting}
              handleChange={handleClassChange}
            />
            <div className="form-row">
              <TextField
                label="Price"
                name="price"
                type="number"
                initialValue={formData.price}
                onChange={handleChange}
                disabled={submitting}
                slotAdornment={
                  <AttachMoney />
                }
              />
              <TextField
                label="Capacity"
                name="capacity"
                type="number"
                initialValue={formData.capacity}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
            {formData.classInstances.map((instance, index) => (
              <div key={index} className="roster-entry">
                <div className="instance-fields">
                  <div className="form-row">
                    <TextField
                      label="Start Time"
                      name="startTime"
                      type="time"
                      InputLabelProps={{
                        shrink: true, // Forces the label to move to the top
                      }}
                      initialValue={instance.startTime}
                      resetInitialValue={true}
                      onChange={(e) => handleInstanceChange(index, e)}
                      disabled={submitting}
                    />
                    <TextField
                      label="End Time"
                      name="endTime"
                      type="time"
                      InputLabelProps={{
                        shrink: true, // Forces the label to move to the top
                      }}
                      initialValue={instance.endTime}
                      resetInitialValue={true}
                      onChange={(e) => handleInstanceChange(index, e)}
                      disabled={submitting}
                    />
                  </div>
                </div>
                  {formData.classInstances.length > 1 && (
                <div className="remove-instance-btn">
                    <Button
                      className="danger small"
                      handleClick={(e) => handleRemoveDayTime(e, index)}
                    >
                      Remove
                    </Button>
                </div>
                  )}
              </div>
            ))}
          </form>
        </div>
      </ModalComponent>
    </>
  )
}

export default AddSessionClassModal;