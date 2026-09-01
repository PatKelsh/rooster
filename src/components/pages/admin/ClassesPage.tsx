"use client";

import { useEffect, useState } from "react";
import { ClassProps } from "@/lib/props";
import { fetchClasses } from "@/lib/api/class";
import { BorderColor } from "@mui/icons-material";
import { Add, DeleteForeverOutlined, ImportExport } from "@mui/icons-material";
import AddClassModal from "@/components/modals/AddClass";
import Button from "@/components/.ui/Button";
import DeleteItemModal from "@/components/modals/DeleteItem";
import ClassTableRow from "@/components/content/ClassTableRow";

const AdminClassesMainPage = () => {
  const [classList, setClassList] = useState<ClassProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isLoading) fetchClasses(setError, setIsLoading, setClassList);
  }, [isLoading]);

  return (
    <div className="admin-dash-page-container">
      <div className="admin-page-header">
        <h1>Classes</h1>
      </div>
      <div className="admin-page-subheader">
        <div>
          {classList.length} classes
        </div>
        <div>
          <AddClassModal setIsLoading={setIsLoading} />
        </div>
      </div>
      <div className="admin-page-content">
        <div className="table-container">
          <div className="table-header table-row">
            <div className="table-cell">
              Class <ImportExport />
            </div>
          </div>
          {classList.map((classItem) => (
            <ClassTableRow key={classItem.id} classItem={classItem} setIsLoading={setIsLoading} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminClassesMainPage;