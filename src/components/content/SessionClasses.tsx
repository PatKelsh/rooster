"use client";

import { useEffect, useState } from "react";
import { ClassDetailProps } from "@/lib/props";
import AddSessionClassModal from "@/components/modals/AddSessionClass";
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";
import DeleteItemModal from "../modals/DeleteItem";

const SessionClasses = ({ sessionId, sessionName }: { sessionId: string, sessionName?: string }) => {
  const [classes, setClasses] = useState<ClassDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetchClassDetailsByTerm(sessionId, setError, setIsLoading, setClasses);

        if (!response) {
          throw new Error("Failed to fetch class details.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load class details");
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading && sessionId) fetchClasses();
  }, [sessionId, isLoading]);

  return (
    <>
      <div className="admin-session-classes-header">
        <div>
          <h2>Classes in this Session</h2>
        </div>
        <div>
          <AddSessionClassModal
            setIsLoading={setIsLoading}
            sessionId={sessionId}
            sessionName={sessionName}
            classCount={classes.length}
          />
        </div>
      </div>
      <div className="admin-session-class-detail-list">
        {isLoading ? (
          <div>Loading classes...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : classes.length === 0 ? (
          <div>No classes found for this session.</div>
        ) : (
          <>
            {classes.map((classDetail, index) => (
              <div key={index} className="admin-session-class-detail">
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
                    {/* <Button className="icon x-small transparent no-border" onClick={() => editLocation(location)}>
                      <BorderColorIcon />
                    </Button> */}
                    <DeleteItemModal
                      itemId={classDetail.id}
                      name={`${classDetail.class.name} from ${sessionName || "this session"}`}
                      type="classDetails"
                      setIsLoading={setIsLoading}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
};

export default SessionClasses;