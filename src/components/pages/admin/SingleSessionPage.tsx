"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { usePathname } from "next/navigation";
import { fetchClasses } from "@/lib/api/class";
import { Add, DriveFileRenameOutlineOutlined, ImportExport } from "@mui/icons-material";
import Button from "@/components/.ui/Button";
import { dateFormat, titleCaseFormat } from "@/helpers/formatting";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import DeleteItemModal from "@/components/modals/DeleteItem";

const SingleSessionPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<TermProps | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const sessionName = searchParams.get("name");
      const sessionDate = searchParams.get("date");

      if (sessionName && sessionDate) {
        try {
          const response = await fetch(`/api/admin/term?name=${sessionName}&date=${sessionDate}`);
          if (!response.ok) throw new Error("Failed to fetch session data.");
          const data = await response.json();
          setSession(data);
        } catch (error) {
          console.error("Error fetching session data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isLoading) fetchSessionData();
  }, [isLoading]);

  return (
    <div className="admin-dash-page-container">
      <div>
        <div>
          <Link href="/admin/sessions" className="back-link">
            <ArrowBackIcon className="back-arrow" /> All Sessions
          </Link>
        </div>
      </div>
      {!session ? (
        <div>
          Whoops! Looks like this session does not exist. Please check the URL and try again.
        </div>
      ) : (
        <>
          <div className="admin-session">
            <div className="admin-session-header">
              <div className="admin-session-header-info">
                <div className="week-counter">
                  <span className="week-count-number">{session?.weeks}</span><br />weeks
                </div>
                <div>
                  <h1>{titleCaseFormat(session?.name)}</h1>
                  <div>
                    {dateFormat(session?.startDate)} - {dateFormat(session?.endDate)}
                  </div>
                </div>
              </div>
              <div>
                <div className={`pill ${session.status.toLowerCase()}`}>
                  {session.status.at(0) + session.status.slice(1).toLowerCase()}
                </div>
              </div>
            </div>
            <div className="admin-session-actions">
              <div>
                <DeleteItemModal
                  itemId={session.id}
                  type="session"
                  name={session.name}
                  setIsLoading={setIsLoading}
                  btnStyle="forCard"
                />
              </div>
              <div>
                <Button className="transparent no-border card-action-btn">
                  <DriveFileRenameOutlineOutlined /> Edit Session
                </Button>
              </div>
            </div>
          </div>
          <div className="admin-session-classes-header">
            <div>
              <h4>Classes in this Session</h4>
            </div>
            <div>
              <Button>
                <Add /> Add Class
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleSessionPage;