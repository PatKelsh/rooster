"use client";

import { SubmitEvent } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import Select from "@/components/.ui/Select";
import TextField from "@/components/.ui/TextField";

const AddLocationModal = () => {

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const addLocationBtn = <><AddIcon /> Add Location</>;

  const submitBtn = (
    <Button handleSubmit={handleSubmit} className="primary">
      Add Location
    </Button>
  );

  return (
    <ModalComponent
      ariaTitle="Add Location"
      ariaDescription="Add a new location for your studio"
      modalBtnContent={addLocationBtn}
      modalBtnClassName="w-icon"
      modalHeader={<h2>New Location</h2>}
      btnAction={submitBtn}
    >
      <div className="form-container modal-form">
        <form id="location-form">
          <div className="form-row-two-thirds">
            <TextField
              label="Location Name"
              name="name"
              type="text"
            />
            <Select
              label="Location Type"
              options={["Indoor", "Outdoor", "Online"]}
              value=""
              onChange={(event) => console.log(event.target.value)}
            />
          </div>
          <TextField
            label="Notes"
            name="notes"
            type="text"
          />
        </form>
      </div>
    </ModalComponent>
  )
}

export default AddLocationModal;