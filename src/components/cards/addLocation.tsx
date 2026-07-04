"use client";

import { useEffect, useState } from "react";
import Card from "@/components/.ui/Card";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import ComputerIcon from '@mui/icons-material/Computer';
import AddLocationModal from "@/components/modals/AddLocation";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import Button from "@/components/.ui/Button";
import DeleteLocationBtn from "@/components/DeleteLocationBtn";
import LocationForm from "@/components/forms/location";

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
                <>
                  <LocationForm
                    initialData={location}
                    editMode={true}
                    setEditLocationId={setEditLocationId}
                  />
                </>
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
                    <Button className="icon x-small transparent no-border" onClick={() => setEditLocationId(location.id)}>
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