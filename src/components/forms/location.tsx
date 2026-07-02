import TextField from "@/components/.ui/TextField";

const LocationForm = () => {
  return (
    <div className="form-container modal-form">
      <form id="location-form">
        <TextField
          label="Location Name"
          name="name"
          type="text"
        />
        <TextField
          label="Notes"
          name="notes"
          type="text"
        />
      </form>
    </div>
  );
};

export default LocationForm;
