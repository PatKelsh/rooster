"use client";

import { useEffect, useState } from "react";
import { ClassDetailProps } from "@/lib/props";
import AddSessionClassModal from "@/components/modals/AddSessionClass";
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";

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
          <h4>Classes in this Session</h4>
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
      <div>
        {isLoading ? (
          <div>Loading classes...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : classes.length === 0 ? (
          <div>No classes found for this session.</div>
        ) : (
          <ul>
            {classes.map((classDetail) => (
              <li key={classDetail.id}>
                {classDetail.class.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
};

export default SessionClasses;