import Card from "@/components/.ui/Card";
import AddLocationCard from "@/components/cards/addLocation";
import StudioIdentityCard from "@/components/cards/studioIdentity";
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';

const AdminSettingsMainPage = () => {
  return (
    <div className="admin-dash-page-container">
      <div className="admin-page-header">
        <h1>Settings</h1>
      </div>
      <StudioIdentityCard />
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
      <Card
        title="Customize Theme"
        icon={<PaletteOutlinedIcon />}
      >
        Card content goes here. This is a simple card component.
      </Card>
    </div>
  );
};

export default AdminSettingsMainPage;