"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { fetchTerms } from "@/lib/api/term";
import DeleteItemModal from "@/components/modals/DeleteItem";
import AddSessionModal from "@/components/modals/AddSession";


import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const AdminSessionsMainPage = () => {
  const [termList, setTermList] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) fetchTerms(setError, setIsLoading, setTermList);
  }, [isLoading]);

  const dateFormatter = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      // year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="admin-dash-page-container">
      <div className="admin-page-header">
        <h1>Sessions</h1>
      </div>
      <div className="admin-page-subheader">
        <div>
        </div>
        <div>
          <AddSessionModal setIsLoading={setIsLoading} />
        </div>
      </div>
      <div className="admin-page-content">
        {termList.length > 0 ? (
          <>
            {termList.map((term) => (
              <div key={term.id} className="accordion-container">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${term.id}-panel1-content`}
                    id={`${term.id}-panel1-header`}
                    className="session-accordion-header accordion-card"
                  >
                    <div className="session-info">
                      <div className="week-count">
                        {term.weeks}w
                      </div>
                      <div className="session-content">
                        <h3>{term.name}</h3>
                        <div>
                          {dateFormatter(term.startDate)} - {dateFormatter(term.endDate)}
                        </div>
                        {/* TODO: return class count */}
                        <div className="session-detail">
                          # classes
                        </div>
                      </div>
                    </div>
                    <div>
                      {term.status}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </>
        ) : (
          <div className="no-data-message">
            <p>No sessions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSessionsMainPage;