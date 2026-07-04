import { ChangeEvent, useState } from "react";
import TextField from "@/components/.ui/TextField";
import Select from "@/components/.ui/Select";

interface LocationFormData {
  name: string;
  type: "Indoor" | "Outdoor" | "Online";
  notes?: string;
}

interface LocationFormProps {
  initialData?: LocationFormData;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const LocationForm = ({ initialData, onChange }: LocationFormProps) => {
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

  return (
    <form id="location-form">
      <div className="form-row-two-thirds">
        <TextField
          label="Space Name"
          name="name"
          type="text"
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
        onChange={handleInputChange}
        formHelperText
      />
    </form>
  );
};

export default LocationForm;
