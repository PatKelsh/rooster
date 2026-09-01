"use client";

import { Dispatch, SetStateAction, SubmitEvent, useState } from "react";
import Button from "@/components/.ui/Button";
import DeleteItemModal from "@/components/modals/DeleteItem";
import { BorderColor } from "@mui/icons-material";
import TextField from "@/components/.ui/TextField";

interface ClassTableRowProps {
  classItem: {
    id: string;
    name: string;
    description?: string;
  };
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const ClassTableRow = ({ classItem, setIsLoading }: ClassTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: classItem.name,
    description: classItem.description || ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch("/api/admin/class", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: classItem.id, ...formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "failed to create class");
      }

      setIsLoading(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div key={classItem.id} className={`table-row hover-reveal${isEditing ? " editing" : ""}`}>
        {!isEditing ? (
          <>
            <div className="table-cell">
              {classItem.name}
            </div>
            <div className="action-buttons">
              <Button className="icon x-small transparent no-border reveal" onClick={() => setIsEditing(!isEditing)}>
                <BorderColor />
              </Button>
              <DeleteItemModal
                itemId={classItem.id}
                type="class"
                name={classItem.name}
                setIsLoading={setIsLoading}
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-actions">
              <form>
                <TextField
                  label="Class Name"
                  name="name"
                  type="text"
                  initialValue={formData.name}
                  onChange={handleInputChange}
                  formHelperText
                />
                <TextField
                  label="Description • optional"
                  name="description"
                  type="text"
                  initialValue={formData.description}
                  onChange={handleInputChange}
                  formHelperText
                />
              </form>
              <div className="action-buttons">
                <Button className="w-icon" handleSubmit={onSubmit} disabled={submitting}>
                  {submitting ? "Saving..." : "Save"}
                </Button>
                <Button className="transparent" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ClassTableRow;