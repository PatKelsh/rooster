"use client";

import { useEffect, useState } from "react";
import Card from "@/components/.ui/Card";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import ComputerIcon from '@mui/icons-material/Computer';
import AddLocationModal from "@/components/modals/AddLocation";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Select from "@/components/.ui/Select";
import TextField from "@/components/.ui/TextField";

import Button from "@/components/.ui/Button";
import DeleteLocationBtn from "@/components/DeleteLocationBtn";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

interface LocationProps {
  id: string;
  name: string;
  type: "Indoor" | "Outdoor" | "Online";
  notes?: string;
}

const AddLocationCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<LocationProps[]>([]);
  const [editLocationId, setEditLocationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "Indoor",
    notes: "",
  });
  
  useEffect(() => {
    const fetchLocations = async () => {
      if (!isLoading) return; // Only fetch if isLoading is true
      try {
        const response = await fetch("/api/locations");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [isLoading]);

  const locationIcon = (type: string) => {
    switch (type) {
      case "Indoor":
        return <LocationCityIcon />;
      case "Outdoor":
        return <SpaOutlinedIcon />;
      case "Online":
        return <ComputerIcon />;
      default:
        return;
    }
  };

  const isLocationBeingEdited = (id: string) => {
    return editLocationId === id;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editLocationId) return;

    try {
      const response = await fetch(`/api/admin/location`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update location");
      }

      setIsLoading(true);
      setEditLocationId(null);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const editLocation = (location: LocationProps) => {
    setFormData({
      id: location.id,
      name: location.name,
      type: location.type,
      notes: location.notes || ""
    });
    setEditLocationId(location.id);
  }

  const cancelEdit = () => {
    setEditLocationId(null);
    setFormData({
      id: "",
      name: "",
      type: "Indoor",
      notes: "",
    });
  };

  return (
      <Card
        title="Studio & Spaces"
        subtitle={`${locations.length} ${locations.length === 1 ? "space" : "spaces"} available`}
        icon={<LocationCityIcon />}
        headerActions={<AddLocationModal setIsLoading={setIsLoading} />}
      >
        {locations.length > 0 ? (
          locations.map((location: LocationProps, index: number) => (
            <div key={index} className={`card-section ${isLocationBeingEdited(location.id) ? "editing" : ""}`}>
              {isLocationBeingEdited(location.id) ? (
                <div className="form-container">
                  <form id="location-form" onSubmit={handleEditSubmit}>
                    <div className="form-row-two-thirds">
                      <TextField
                        label="Space Name"
                        name="name"
                        type="text"
                        initialValue={location.name}
                        onChange={handleInputChange}
                      />
                      <Select
                        label="Location Type"
                        options={["Indoor", "Outdoor", "Online"]}
                        value={location.type}
                        onChange={(event) => setFormData((prevData) => ({
                          ...prevData,
                          type: event.target.value,
                        }))}
                        formHelperText
                      />
                    </div>
                    <TextField
                      label="Notes • optional"
                      name="notes"
                      type="text"
                      initialValue={location.notes || ""}
                      onChange={handleInputChange}
                      formHelperText
                    />
                    <div className="form-actions">
                      <Button className="w-icon" type="submit">
                        <SaveOutlinedIcon />
                        Save
                      </Button>
                      <Button className="transparent" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (<>
                <div className="card-section-content">
                  <div className={`card-section-icon ${location.type.toLowerCase()} location-type-icon-container`}>
                    {locationIcon(location.type)}
                  </div>
                  <div>
                    <div className="card-section-title">
                      <h3>{location.name}</h3>
                      <div className="card-section-labels">
                        <span className={`card-section-label ${location.type.toLowerCase()}`}>
                          {location.type}
                        </span>
                      </div>
                    </div>
                    {location.notes && (
                      <div className="card-section-notes">
                        {location.notes}
                      </div>
                    )}
                  </div>
                </div>
                <div className="reveal">
                  <div className="action-buttons">
                    <Button className="icon x-small transparent no-border" onClick={() => editLocation(location)}>
                      <BorderColorIcon />
                    </Button>
                    <DeleteLocationBtn id={location.id} setIsLoading={setIsLoading} />
                  </div>
                </div>
              </>)}
            </div> 
          ))
        ) : (
          <div className="card-section no-content">
            No locations available. Please add a location to get started.
          </div>
        )}
      </Card>
  );
}

export default AddLocationCard;