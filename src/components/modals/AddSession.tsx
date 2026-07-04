"use client";

import { Dispatch, SetStateAction, SubmitEvent, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import TextField from "@/components/.ui/TextField";

interface AddSessionModalProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const AddSessionModal = ({ setIsLoading }: AddSessionModalProps) => {
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    weeks: 0,
    description: "",
  });

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false);
    }, 500);
  }

  const addSessionBtn = <><AddIcon /> New Session</>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "startDate" || name === "weeks") {
      const startDate = name === "startDate" ? value : formData.startDate;
      const weeks = name === "weeks" ? parseInt(value) : formData.weeks;
      convertWeeksToEndDate(startDate, weeks);
    }
  };

  const convertWeeksToEndDate = (startDate?: string, weeks?: number) => {
    const start = new Date(startDate || formData.startDate);
    const durationInWeeks = weeks || formData.weeks;
    if (isNaN(durationInWeeks)) {
      setFormData((prevData) => ({
        ...prevData,
        endDate: "", // Clear endDate if weeks is not a valid number
      }));
      return;
    }
    const endDate = new Date(start.getTime() + durationInWeeks * 7 * 24 * 60 * 60 * 1000);
    setFormData((prevData) => ({
      ...prevData,
      endDate: endDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
    }));
  };

  const handleSubmit = async(event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/term", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "failed to create term");
      }

      setCloseOnAction(true);
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      resetCloseOnAction();
    }
  };

  const submitBtn = (
    <Button className="primary" type="submit" handleSubmit={handleSubmit}>
      Create Session
    </Button>
  );

  return (
    <>
      <ModalComponent
        ariaTitle="Add Session"
        ariaDescription="Add a new session for your studio"
        modalBtnContent={addSessionBtn}
        modalBtnClassName="w-icon"
        modalHeader={<h2>New Session</h2>}
        btnAction={submitBtn}
        closeOnAction={closeOnAction}
      >
        <div className="form-container modal-form">
          <form id="location-form">
            <TextField
              label="Session Name"
              name="name"
              type="text"
              onChange={handleInputChange}
              formHelperText
            />
            <div className="form-row">
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                InputLabelProps={{
                  shrink: true, // Forces the label to move to the top
                }}
                onChange={handleInputChange}
              />
              <TextField
                label="Duration"
                name="weeks"
                type="number"
                endAdornment={<span>weeks</span>}
                onChange={handleInputChange}
                formHelperText
              />
            </div>
            <TextField
              label="Description • optional"
              name="description"
              type="text"
              onChange={handleInputChange}
              formHelperText
            />
          </form>
        </div>
      </ModalComponent>
    </>
  )
}

export default AddSessionModal;