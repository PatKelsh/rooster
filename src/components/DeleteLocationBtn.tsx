
import { Dispatch, SetStateAction } from "react";
import Button from "@/components/.ui/Button";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

interface DeleteLocationBtnProps {
  id: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const DeleteLocationBtn = ({ id, setIsLoading }: DeleteLocationBtnProps) => {

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/location?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting location: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="icon x-small transparent no-border danger" onClick={handleDelete}>
      <DeleteForeverOutlinedIcon />
    </Button>
  );
};

export default DeleteLocationBtn;