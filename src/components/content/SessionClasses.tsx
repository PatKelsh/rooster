"use client";

import { useEffect, useState } from "react";
import { ClassDetailProps } from "@/lib/props";
import AddSessionClassModal from "@/components/modals/AddSessionClass";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchClassDetailsByTerm } from "@/lib/api/classDetails";

const SessionClasses = ({ sessionId, sessionName }: { sessionId: string, sessionName?: string }) => {
  const [classes, setClasses] = useState<ClassDetailProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(classes)

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
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  className="class-detail-card"
                >
                  <h3>{classDetail.class.name}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </div>
    </>
  )
};

export default SessionClasses;