import Card from "@/components/.ui/Card";
import AddLocationCard from "@/components/cards/addLocation";
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const AdminSettingsMainPage = () => {
  return (
    <div>
      <Card
        title="Studio Identity"
        subtitle="Name, description, and branding for your studio"
        icon={<BusinessIcon />}
      >
        Card content goes here. This is a simple card component.
      </Card>
      <Card
        title="Contact & Location"
        subtitle="Displayed in footer and contact page for your studio"
        icon={<LocationOnOutlinedIcon />}
      >
        Card content goes here. This is a simple card component.
      </Card>
      <AddLocationCard />
      <Card
        title="Social Media"
        subtitle="Linked in your public website footer"
        icon={<LinkIcon />}
      >
        Card content goes here. This is a simple card component.
      </Card>
    </div>
  );
};

export default AdminSettingsMainPage;