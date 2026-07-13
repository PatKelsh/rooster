"use client";

import { useState } from "react";
import { ClassDetailProps}  from "@/lib/props";
import { BorderColor } from "@mui/icons-material";
import DeleteItemModal from "@/components/modals/DeleteItem";
import Button from "@/components/.ui/Button";

interface ClassDetailItemProps {
  classDetail: ClassDetailProps;
  sessionName?: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClassDetailItem = ({
  classDetail,
  sessionName,
  setIsLoading
}: ClassDetailItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={`admin-session-class-detail${isEditing ? " editing" : ""}`}>
      {!isEditing ? (
        <>
          <div className="class-detail-info">
            <div>
              <h3>{classDetail.class.name}</h3>
            </div>
            <div>
              {classDetail.classInstances.map((instance, idx) => (
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
                itemId={classDetail.id}
                name={`${classDetail.class.name} from ${sessionName || "this session"}`}
                type="classDetails"
                setIsLoading={setIsLoading}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Button onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};

export default ClassDetailItem;