"use client";

import { Dispatch, SetStateAction, SubmitEvent, useState } from "react";
import { DriveFileRenameOutlineOutlined } from '@mui/icons-material';
import { TermProps } from "@/lib/props";
import { titleCaseFormat } from "@/helpers/formatting";
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import TextField from "@/components/.ui/TextField";

interface EditSessionModalProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  session: TermProps;
}

const EditSessionModal = ({ setIsLoading, session }: EditSessionModalProps) => {
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [formData, setFormData] = useState({
    name: titleCaseFormat(session.name),
    startDate: session.startDate,
    endDate: session.endDate,
    weeks: session.weeks,
    description: session.description,
  });

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false);
    }, 500);
  }

  const editSessionBtn = <><DriveFileRenameOutlineOutlined /> Edit Session</>;

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
    if (!startDate || !formData.startDate) return;
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "failed to edit session");
      }

      setCloseOnAction(true);
    } catch (error) {
      console.error("Error editing session:", error);
    } finally {
      resetCloseOnAction();
    }
  };

  const submitBtn = (
    <Button className="primary" type="submit" handleSubmit={handleSubmit}>
      Save Changes
    </Button>
  );

  return (
    <>
      <ModalComponent
        ariaTitle="Edit Session"
        ariaDescription="Edit an existing session for your studio"
        modalBtnContent={editSessionBtn}
        modalBtnClassName="transparent no-border card-action-btn"
        modalHeader={<h2>Edit Session</h2>}
        btnAction={submitBtn}
        closeOnAction={closeOnAction}
      >
        <div className="form-container modal-form">
          <form id="location-form">
            <TextField
              label="Session Name"
              name="name"
              type="text"
              initialValue={formData.name}
              onChange={handleInputChange}
              formHelperText
            />
            <div className="form-row">
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                initialValue={formData.startDate}
                InputLabelProps={{
                  shrink: true, // Forces the label to move to the top
                }}
                onChange={handleInputChange}
              />
              <TextField
                label="Duration"
                name="weeks"
                type="number"
                initialValue={formData.weeks}
                endAdornment={<span>weeks</span>}
                onChange={handleInputChange}
                formHelperText
              />
            </div>
            <TextField
              label="Description • optional"
              name="description"
              type="text"
              initialValue={formData.description}
              onChange={handleInputChange}
              formHelperText
            />
          </form>
        </div>
      </ModalComponent>
    </>
  )
}

export default EditSessionModal;