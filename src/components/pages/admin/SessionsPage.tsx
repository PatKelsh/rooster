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
import { dateFormat, titleCaseFormat } from "@/helpers/formatting";
import Link from "next/link";

const AdminSessionsMainPage = () => {
  const [termList, setTermList] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) fetchTerms(setError, setIsLoading, setTermList);
  }, [isLoading]);

  const pillText = (status: string) => {
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
                    <span className="week-count-number">{term.weeks}</span><br />wk{term.weeks > 1 ? "s" : ""}
                  </div>
                  <div className="list-item-info">
                    <div className="list-item-name">
                      <Link className="list-item-link" href={`/admin/session?id=${term.id}`}>
                        <h3>{titleCaseFormat(term.name)}</h3>
                      </Link>
                      <div className={`pill ${term.status.toLowerCase()}`}>{pillText(term.status)}</div>
                    </div>
                    <div className="list-item-dates">
                      {dateFormat(term.startDate)} - {dateFormat(term.endDate)}
                    </div>
                    <div className="list-item-class-count">
                      # classes
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                  </div>
                  <div className="list-item-actions">
                    <Link className="list-item-btn" href={`/admin/session?id=${term.id}`}>
                      <ArrowForwardIosIcon />
                    </Link>
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