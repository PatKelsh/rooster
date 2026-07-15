"use client";

import { Dispatch, SetStateAction, SubmitEvent, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import TextField from "@/components/.ui/TextField";

const AddClassModal = ({ setIsLoading }: { setIsLoading: Dispatch<SetStateAction<boolean>> }) => {
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false);
    }, 500);
  }

  const addClassBtn = <><AddIcon /> New <span className="hide-for-mobile">Class</span></>;

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
      const response = await fetch("/api/admin/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "failed to create class");
      }

      setIsLoading(true);
      setCloseOnAction(true);
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      resetCloseOnAction();
    }
  };

  const submitBtn = (
    <Button className="primary" type="submit" handleSubmit={handleSubmit}>
      Create Class
    </Button>
  );

  return (
    <>
      <ModalComponent
        ariaTitle="Add Class"
        ariaDescription="Add a new class for your studio"
        modalBtnContent={addClassBtn}
        modalBtnClassName="w-icon"
        modalHeader={<h2>New Class</h2>}
        btnAction={submitBtn}
        closeOnAction={closeOnAction}
      >
        <div className="form-container modal-form">
          <form id="location-form">
            <TextField
              label="Class Name"
              name="name"
              type="text"
              onChange={handleInputChange}
              formHelperText
            />
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
  );
};

export default AddClassModal;