
import { useRouter } from "next/navigation";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModalComponent from "@/components/.ui/Modal";
import Button from "@/components/.ui/Button";

interface DeleteItemModalProps {
  itemId: string;
  type: "session" | "class";
  name?: string;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteItemModal = ({ itemId, type, name, setIsLoading }: DeleteItemModalProps) => {
  const router = useRouter();

  const itemType = type === "session" ? "term" : type;

  const deleteItem = async () => {
    try {
      const response = await fetch(`/api/admin/${itemType}?id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete ${type}`);
      }

      if (setIsLoading) setIsLoading(true);
    } catch (error) {
      console.log(`Error deleting ${type}:`, error);
    }
  }

  const confirmDelete = () => {
    return (
      <Button className="danger" onClick={deleteItem}>
        Confirm Delete
      </Button>
    )
  }

  return (
    <ModalComponent
      ariaTitle="Delete Item"
      ariaDescription="Are you sure you want to delete this item?"
      modalBtnContent={<DeleteForeverOutlinedIcon />}
      modalBtnClassName="icon danger reveal"
      btnAction={confirmDelete()}
    >
      <div>
        <p>Are you sure you want to delete {name ? (<>the {type}: <strong>{name}</strong></>) : `this ${type}`}?</p>
          <p>If deleted, this action cannot be undone and will erase all associated data.</p>
      </div>
    </ModalComponent>
  );
};

export default DeleteItemModal;