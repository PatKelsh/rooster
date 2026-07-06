"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { usePathname } from "next/navigation";
import { fetchClasses } from "@/lib/api/class";
import { Add, DeleteForeverOutlined, ImportExport } from "@mui/icons-material";
import Button from "@/components/.ui/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

const SingleSessionPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<TermProps | null>(null);
  console.log("session", session);

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
        <Link href="/admin/sessions" className="back-link">
          <ArrowBackIcon className="back-arrow" /> All Sessions
        </Link>
      </div>
      {!session ? (
        <div>
          Whoops! Looks like this session doesn&apos;t exist. Please check the URL and try again.
        </div>
      ) : (
        <div className="admin-session-header">
          <div>
            <h1>{session?.name}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSessionPage;