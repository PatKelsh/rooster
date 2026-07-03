"use client";

import { useEffect, useState } from "react";
import Card from "@/components/.ui/Card";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AddLocationModal from "@/components/modals/AddLocation";

const AddLocationCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  
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

  return (
      <Card
        title="Studio & Spaces"
        subtitle="Locations available for classes and events"
        icon={<LocationCityIcon />}
        headerActions={<AddLocationModal setIsLoading={setIsLoading} />}
      >
        {locations.length > 0 ? (
          <>
            Yay! You have {locations.length} location{locations.length > 1 ? "s" : ""} available.
          </>
        ) : (
          <>
            No locations available. Please add a location to get started.
          </>
        )}
      </Card>
  );
}

export default AddLocationCard;