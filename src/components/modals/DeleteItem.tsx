
import { useRouter } from "next/navigation";
import { titleCaseFormat } from "@/helpers/formatting";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModalComponent from "@/components/.ui/Modal";
import Button from "@/components/.ui/Button";

interface DeleteItemModalProps {
  itemId: string;
  type: "session" | "class";
  name?: string;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  btnStyle?: "icon" | "forCard";
}

const DeleteItemModal = ({
  itemId,
  type,
  name,
  setIsLoading,
  btnStyle = "icon"
}: DeleteItemModalProps) => {
  const router = useRouter();

  const itemType = type === "session" ? "term" : type;

  const deleteItem = async () => {
    try {
      if (setIsLoading) setIsLoading(true);
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
    } catch (error) {
      console.log(`Error deleting ${type}:`, error);
    }
    router.push(`/admin/${type}s`);
  }

  const confirmDelete = () => {
    return (
      <Button className="danger" onClick={deleteItem}>
        Confirm Delete
      </Button>
    )
  }

  const buttonStyle = () => {
    switch (btnStyle) {
      case "icon":
        return "icon danger reveal";
      case "forCard":
        return "transparent no-border danger card-action-btn";
      default:
        return "";
    }
  }

  const buttonContent = () => {
    switch (btnStyle) {
      case "icon":
        return <DeleteForeverOutlinedIcon />;
      case "forCard":
        return (
          <>
            <DeleteForeverOutlinedIcon /> {` Delete ${type}`}
          </>
        );
      default:
        return "";
    }
  }

  return (
    <ModalComponent
      ariaTitle="Delete Item"
      ariaDescription="Are you sure you want to delete this item?"
      modalBtnContent={buttonContent()}
      modalBtnClassName={buttonStyle()}
      btnAction={confirmDelete()}
    >
      <div>
        <p>Are you sure you want to delete {name ? (<>the {type}: <strong>{titleCaseFormat(name)}</strong></>) : `this ${type}`}?</p>
        <p>If deleted, this action cannot be undone and will erase all associated data.</p>
      </div>
    </ModalComponent>
  );
};

export default DeleteItemModal;