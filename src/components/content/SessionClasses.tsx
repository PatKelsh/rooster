"use client";

import { useEffect, useState } from "react";
import { ClassDetailProps } from "@/lib/props";
import AddSessionClassModal from "@/components/modals/AddSessionClass";
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";
import { EventNote, SortByAlpha } from "@mui/icons-material";
import ClassDetailItem from "@/components/content/ClassDetailItem";
import Button from "@/components/.ui/Button";

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
          />
        </div>
      </div>
      <div className="view-buttons">
        <div>
          Sort By:
        </div>
        <Button>
          <SortByAlpha />
          <div>
            Name
          </div>
        </Button>
        <Button>
          <EventNote />
          <div>
            Schedule
          </div>
        </Button>
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
              <ClassDetailItem
                key={index}
                classDetail={classDetail}
                sessionName={sessionName}
                sessionId={sessionId}
                setIsLoading={setIsLoading}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
};

export default SessionClasses;