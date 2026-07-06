"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { fetchTerms } from "@/lib/api/term";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteItemModal from "@/components/modals/DeleteItem";
import AddSessionModal from "@/components/modals/AddSession";


import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { dateFormat } from "@/helpers/dateFormatting";
import Button from "@/components/.ui/Button";

const AdminSessionsMainPage = () => {
  const [termList, setTermList] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) fetchTerms(setError, setIsLoading, setTermList);
  }, [isLoading]);

  const tagText = (status: string) => {
    const text = status.at(0) + status.slice(1).toLowerCase();
    return text;
  }

  return (
    <div className="admin-dash-page-container">
      <div className="admin-page-header">
        <h1>Sessions</h1>
      </div>
      <div className="admin-page-subheader">
        <div>
          {(termList.length > 1 || termList.length === 0) ? <p>{termList.length} sessions</p> : <p>{termList.length} session</p>}
        </div>  
        <div>
          <AddSessionModal setIsLoading={setIsLoading} />
        </div>
      </div>
      <div className="admin-page-content">
        {termList.length > 0 ? (
          <>
            {termList.map((term) => (
              <div key={term.id} className={`session-list-item-container`}>
                <div className="list-item-header">
                  <div className="week-count">
                    {term.weeks}w
                  </div>
                  <div>
                    <div>
                      {term.name}
                    </div>
                    <div>
                      <p>{dateFormat(term.startDate)} - {dateFormat(term.endDate)}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                  </div>
                  <div>
                    <Button>
                      <ArrowForwardIosIcon />
                    </Button>
                  </div>
                </div>
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