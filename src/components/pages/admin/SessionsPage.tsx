"use client";

import { useEffect, useState } from "react";
import { TermProps } from "@/lib/props";
import { fetchTerms } from "@/lib/api/term";
import { ImportExport } from "@mui/icons-material";
import DeleteItemModal from "@/components/modals/DeleteItem";
import AddSessionModal from "@/components/modals/AddSession";

const AdminSessionsMainPage = () => {
  const [termList, setTermList] = useState<TermProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) fetchTerms(setError, setIsLoading, setTermList);
  }, [isLoading]);

  return (
    <div className="admin-dash-page-container">
      <div className="admin-page-header">
        <h1>Sessions</h1>
      </div>
      <div className="admin-page-subheader">
        <div>
        </div>
        <div>
          <AddSessionModal />
        </div>
      </div>
      <div className="admin-page-content">
        <div className="table-container">
          <div className="table-header table-row">
            <div className="table-cell">
              Session <ImportExport />
            </div>
          </div>
          {termList.length > 0 && !isLoading ? (
            <div className="table-body">
              {termList.map((session) => (
                <div key={session.id} className="table-row hover-reveal">
                  <div className="table-cell">
                    {session.name}
                  </div>
                  <div >
                    <DeleteItemModal
                      itemId={session.id}
                      type="session"
                      name={session.name}
                    />
                  </div>
                </div>
              ))}
            </div>  
          ) : (
            <div className="table-body">
              <div className="table-row">
                <div className="table-cell">
                  No sessions found.
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="table-row">
              <div className="table-cell">
                Error: {error}
              </div>
            </div>
          )}
          {isLoading && (
            <div className="table-row">
              <div className="table-cell">
                Loading...
              </div>
            </div>
          )}
          {/* {termList.map((session) => (
            <div key={session.id} className="table-row hover-reveal">
              <div className="table-cell">
                {session.name}
              </div>
              <div >
                <DeleteItemModal
                  itemId={session.id}
                  type="session"
                  name={session.name}
                />
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default AdminSessionsMainPage;