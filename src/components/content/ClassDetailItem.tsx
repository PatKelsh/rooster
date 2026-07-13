"use client";

import { useState } from "react";
import { ClassDetailProps}  from "@/lib/props";
import { BorderColor } from "@mui/icons-material";
import SessionClassForm from "../forms/sessionClass";
import DeleteItemModal from "@/components/modals/DeleteItem";
import Button from "@/components/.ui/Button";

interface ClassDetailItemProps {
  classDetail: ClassDetailProps;
  sessionId: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sessionName?: string;
}

const ClassDetailItem = ({
  classDetail,
  sessionId,
  setIsLoading,
  sessionName
}: ClassDetailItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    classId: classDetail.classId,
    className: classDetail.class.name,
    price: classDetail.price,
    capacity: classDetail.capacity,
    termSpecificDescription: classDetail.termSpecificDescription || "",
    classInstances: classDetail.classInstances.map(instance => ({
      daysOfTheWeek: instance.daysOfTheWeek,
      startTime: instance.startTime,
      endTime: instance.endTime
    })),
    termId: sessionId
  });

  return (
    <div className={`admin-session-class-detail${isEditing ? " editing" : ""}`}>
      {!isEditing ? (
        <>
          <div className="class-detail-info">
            <div>
              <h3>{formData.className}</h3>
            </div>
            <div>
              {formData.classInstances.map((instance, idx) => (
                <div key={idx}>
                  {instance.daysOfTheWeek.join(", ")}: {instance.startTime} - {instance.endTime}
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="action-buttons">
              <Button className="icon x-small transparent no-border" onClick={() => setIsEditing(!isEditing)}>
                <BorderColor />
              </Button>
              <DeleteItemModal
                itemId={formData.classId}
                name={`${formData.className} from ${sessionName || "this session"}`}
                type="classDetails"
                setIsLoading={setIsLoading}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <SessionClassForm
            sessionId={sessionId}
            submitting={submitting}
            setFormData={setFormData}
            formData={formData}
          />
          <Button className="transparent" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};

export default ClassDetailItem;