import { ChangeEvent, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import TextField from "@/components/.ui/TextField";
import Select from "@/components/.ui/Select";
import Button from "../.ui/Button";

interface LocationFormData {
  name: string;
  type: "Indoor" | "Outdoor" | "Online";
  notes?: string;
}

interface LocationFormProps {
  initialData?: LocationFormData;
  editMode?: boolean;
  setEditLocationId?: (id: string | null) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const LocationForm = ({
  initialData,
  editMode = false,
  setEditLocationId,
  onChange
}: LocationFormProps) => {
  const [formData, setFormData] = useState<LocationFormData>({
    name: initialData?.name || "",
    type: initialData?.type || "Indoor",
    notes: initialData?.notes || "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (onChange) {
      onChange(event);
    }
  };

  const handleSelectChange = (event: ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string; }, Element> | (Event & { target: { value: string; name: string; }; })) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value as "Indoor" | "Outdoor" | "Online",
    }));
    if (onChange) {
      onChange(event as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!editMode) return;
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="form-container">
      <form id="location-form">
        <div className="form-row-two-thirds">
          <TextField
            label="Space Name"
            name="name"
            type="text"
            initialValue={formData.name}
            onChange={handleInputChange}
            formHelperText
          />
          <Select
            label="Location Type"
            options={["Indoor", "Outdoor", "Online"]}
            value={formData.type}
            onChange={handleSelectChange}
            formHelperText
          />
        </div>
        <TextField
          label="Notes • optional"
          name="notes"
          type="text"
          initialValue={formData.notes}
          onChange={handleInputChange}
          formHelperText
        />
        {editMode && (
          <div className="form-actions">
            <Button handleSubmit={() => console.log("Submit form data:", formData)} className="w-icon">
              <SaveIcon />
              Save
            </Button>
            <Button onClick={() => setEditLocationId && setEditLocationId(null)} className="transparent">
              Cancel
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LocationForm;
