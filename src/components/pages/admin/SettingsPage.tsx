import Card from "@/components/.ui/Card";
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import AddLocationModal from "@/components/modals/AddLocation";

const AdminSettingsMainPage = () => {
  return (
    <div>
      <Card
        title="Studio Identity"
        subtitle="Name, description, and branding for your studio"
        icon={<BusinessIcon />}
      />
      <Card
        title="Contact & Location"
        subtitle="Displayed in footer and contact page for your studio"
        icon={<LocationOnOutlinedIcon />}
      />
      <Card
        title="Studio & Spaces"
        subtitle="Locations available for classes and events"
        icon={<LocationCityIcon />}
        headerActions={<AddLocationModal />}
      />
      <Card
        title="Social Media"
        subtitle="Linked in your public website footer"
        icon={<LinkIcon />}
      />
    </div>
  );
};

export default AdminSettingsMainPage;