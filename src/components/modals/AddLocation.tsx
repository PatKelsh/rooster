"use client";

import { Dispatch, SetStateAction, SubmitEvent, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import Select from "@/components/.ui/Select";
import TextField from "@/components/.ui/TextField";


const AddLocationModal = ({ setIsLoading }: { setIsLoading: Dispatch<SetStateAction<boolean>> }) => {
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "Indoor",
    notes: "",
  });

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false);
    }, 500);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add location");
      }

      setCloseOnAction(true);
    } catch (error) {
      console.error("Error adding location:", error);
    } finally {
      resetCloseOnAction();
    }
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
      closeOnAction={closeOnAction}
    >
      <div className="form-container modal-form">
        <form id="location-form">
          <div className="form-row-two-thirds">
            <TextField
              label="Space Name"
              name="name"
              type="text"
              onChange={handleInputChange}
              formHelperText
            />
            <Select
              label="Location Type"
              options={["Indoor", "Outdoor", "Online"]}
              value={formData.type}
              onChange={(event) => setFormData((prevData) => ({
                ...prevData,
                type: event.target.value,
              }))}
              formHelperText
            />
          </div>
          <TextField
            label="Notes • optional"
            name="notes"
            type="text"
            onChange={handleInputChange}
            formHelperText
          />
        </form>
      </div>
    </ModalComponent>
  )
}

export default AddLocationModal;