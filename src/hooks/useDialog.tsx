import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface DialogModalContextType {
  openModal: (content: ReactNode, title?: string, description?: string) => void;
  closeModal: () => void;
}

const FormModalContext = createContext<DialogModalContextType | undefined>(
  undefined,
);

export const DialogModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalDescription, setModalDescription] = useState<string>("");

  const openModal = (
    content: ReactNode,
    title = "Dialog",
    description = "",
  ) => {
    setModalContent(content);
    setModalTitle(title);
    setModalDescription(description);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle("");
    setModalDescription("");
  };

  return (
    <FormModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className=" rounded-2xl">
          <DialogHeader className="hidden">
            {modalTitle ? (
              <DialogTitle>{modalTitle}</DialogTitle>
            ) : (
              <VisuallyHidden>
                <DialogTitle>Dialog</DialogTitle>
              </VisuallyHidden>
            )}

            {modalDescription && (
              <DialogDescription>{modalDescription}</DialogDescription>
            )}
          </DialogHeader>

          <div className="">{modalContent}</div>

          <DialogFooter />
        </DialogContent>
      </Dialog>
    </FormModalContext.Provider>
  );
};

export const useDialogModal = (): DialogModalContextType => {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error("useDialogModal must be used within a DialogModalProvider");
  }
  return context;
};
