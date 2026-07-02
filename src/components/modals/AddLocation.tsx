"use client";

import AddIcon from '@mui/icons-material/Add';
import ModalComponent from "@/components/.ui/Modal";
import SelectComponent from "@/components/.ui/Select";
import TextField from "@/components/.ui/TextField";

const AddLocationModal = () => {

  const addLocationBtn = <><AddIcon /> Add Location</>;

  return (
    <ModalComponent
      ariaTitle="Add Location"
      ariaDescription="Add a new location for your studio"
      modalBtnContent={addLocationBtn}
      modalBtnClassName="w-icon"
      modalHeader={<h2>New Location</h2>}
    >
      <div className="form-container modal-form">
        <form id="location-form">
          <div className="form-row-two-thirds">
            <TextField
              label="Location Name"
              name="name"
              type="text"
            />
            <SelectComponent />
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