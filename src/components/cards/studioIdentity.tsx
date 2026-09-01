import Card from "@/components/.ui/Card";
import BusinessIcon from '@mui/icons-material/Business';

const StudioIdentityCard = () => {
  return (
    <Card
      title="Studio Identity"
      subtitle="Name, tagline and description shown on the public website"
      icon={<BusinessIcon />}
    >
      <div className="card-section">
        Form
      </div>
    </Card>
  );
};

export default StudioIdentityCard;