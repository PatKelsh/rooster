"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Adjust } from "@mui/icons-material";
import Button from "@/components/.ui/Button";
import ModalComponent from "@/components/.ui/Modal";
import { updateTermStatusById } from "@/lib/api/term";

interface StatusUpdateModalProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  termId: string;
  termStatus: "LIVE" | "DRAFT" | "ENDED";
}

const StatusUpdateModal = ({
  setIsLoading,
  termId,
  termStatus
}: StatusUpdateModalProps) => {

  const modalBtn = () => {
    switch (termStatus) {
      case "LIVE":
        return "End Session";
      case "DRAFT":
        return <><Adjust />Go Live</>;
      case "ENDED":
        return "Session Ended";
      default:
        return "";
    }
  }

  return (
    <>
      <ModalComponent
        ariaTitle="Update Session Status"
        ariaDescription="Modal to update the status of the session"
        modalBtnContent={modalBtn()}
        modalBtnClassName="w-icon status-btn"
      >
        <div>
          Modal content
        </div>
      </ModalComponent>
    </>
  )
}

export default StatusUpdateModal;