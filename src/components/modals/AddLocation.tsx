"use client";

import AddIcon from '@mui/icons-material/Add';
import ModalComponent from "@/components/.ui/Modal";

const AddLocationModal = () => {

  const addLocationBtn = () => {
    return (
      <>
        <AddIcon /> Add Location
      </>
    )
  }

  return (
    <ModalComponent
      ariaTitle="Add Location"
      ariaDescription="Add a new location for your studio"
      modalBtnContent={addLocationBtn()}
      modalBtnClassName="w-icon"
    >
      Add Location Modal
    </ModalComponent>
  )
}

export default AddLocationModal;