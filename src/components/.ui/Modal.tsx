import { ReactNode, useState } from 'react';
import Button from './Button';
import Modal from '@mui/material/Modal';

interface ModalComponentProps {
  children: ReactNode;
  ariaTitle: string;
  ariaDescription: string;
  modalBtnContent: ReactNode;
  btnAction?: ReactNode;
  modalBtnClassName?: string;
}

export default function ModalComponent({
  children,
  ariaTitle,
  ariaDescription,
  modalBtnContent,
  btnAction,
  modalBtnClassName
}: ModalComponentProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className={modalBtnClassName}>{modalBtnContent}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={ariaTitle}
        aria-describedby={ariaDescription}
      >
        <div className="modal-container">
          <div className="modal-content-container">
            <div className="modal-content">
              {children}
            </div>
            <div className="modal-actions">
              {btnAction}
              <Button onClick={handleClose} className="transparent no-border">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}