"use client";

import { Dispatch, SetStateAction, SubmitEvent, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import TextField from "@/components/.ui/TextField";
import { Add } from "@mui/icons-material";

const AddSessionModal = () => {
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    notes: "",
  });

  const addSessionBtn = <><AddIcon /> New Session</>;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitBtn = (
    <Button className="primary">
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
          </form>
        </div>
      </ModalComponent>
    </>
  )
}

export default AddSessionModal;