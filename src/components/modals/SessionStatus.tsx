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
  const [closeOnAction, setCloseOnAction] = useState(false);
  const [status, setStatus] = useState(termStatus);

  const resetCloseOnAction = () => {
    setTimeout(() => {
      setCloseOnAction(false);
    }, 1000);
  }

  if (!status || !termId) return null;

  if (status === "ENDED") {
    return (
      <div className="term-status ended">
        Session Ended
      </div>
    )
  }

  const updateStatus = () => {
    setIsLoading(true);
    try {
      if (status === "LIVE") {
        updateTermStatusById(termId, "DRAFT");
        setStatus("DRAFT");
      } else {
        updateTermStatusById(termId, "LIVE");
        setStatus("LIVE");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCloseOnAction(true);
      setIsLoading(false);
      resetCloseOnAction();
    }
  }

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

  const changeStatus = () => {
    return (
      <Button onClick={updateStatus}>
        Set Session Live
      </Button>
    );
  }

  return (
    <>
      <ModalComponent
        ariaTitle="Update Session Status"
        ariaDescription="Modal to update the status of the session"
        btnAction={changeStatus()}
        closeOnAction={closeOnAction}
        modalHeader={<h2>Update Session Status</h2>}
        modalBtnContent={modalBtn()}
        modalBtnClassName="w-icon status-btn"
      >
        <div className="modal-content">
          <p>Are you sure you want to change the session status to <strong>Live</strong>?</p>
          <p>Changing the status to <strong>Live</strong> will make the session visible to students and allow them to register for classes.</p>
          {/* TODO: Send email to students for live classes. */}
          {/* <p>Students will receive an email notification that the session is now live.</p> */}
        </div>
      </ModalComponent>
    </>
  )
}

export default StatusUpdateModal;