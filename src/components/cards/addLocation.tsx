"use client";

import Card from "@/components/.ui/Card";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AddLocationModal from "@/components/modals/AddLocation";

const AddLocationCard = () => {
  return (
      <Card
        title="Studio & Spaces"
        subtitle="Locations available for classes and events"
        icon={<LocationCityIcon />}
        headerActions={<AddLocationModal />}
      >
        Card content goes here. This is a simple card component.
      </Card>
  );
}

export default AddLocationCard;