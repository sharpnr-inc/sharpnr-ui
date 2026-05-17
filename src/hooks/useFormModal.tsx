import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface FormModalState {
  heading: string;
  description: string;
  isOpen: boolean;
  component: ReactNode | null;
}

interface ModalContextProps {
  showModal: (
    heading: string,
    description: string,
    component: ReactNode,
  ) => void;
  closeModal: () => void;
}

const FormModalContext = createContext<ModalContextProps | undefined>(
  undefined,
);

export const useFormsModal = () => {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error("useFormsModal must be used within a FormsModalProvider");
  }
  return context;
};

export const FormsModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<FormModalState>({
    heading: "",
    description: "",
    isOpen: false,
    component: null,
  });

  const showModal = (
    heading: string,
    description: string,
    component: ReactNode,
  ) => {
    setModalState({ heading, description, component, isOpen: true });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <FormModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      <DialogPrimitive.Root
        open={modalState.isOpen}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogPrimitive.Portal>
          {/* ── Overlay ── */}
          <DialogPrimitive.Overlay
            className="
              fixed inset-0 z-50
              bg-black/60 backdrop-blur-md
              data-[state=open]:animate-in   data-[state=open]:fade-in-0   data-[state=open]:duration-300
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200
            "
          />

          {/* ── Dialog shell ── */}
          <DialogPrimitive.Content
            onInteractOutside={closeModal}
            className="
              fixed left-1/2 top-1/2 z-50
              -translate-x-1/2 -translate-y-1/2
              w-[70vw] max-h-[88vh]
              rounded-2xl
              ring-1 ring-white/10
              shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_32px_64px_-12px_rgba(0,0,0,0.7),0_0_80px_-20px_rgba(120,80,255,0.15)]
              bg-background
              flex flex-col overflow-hidden
              data-[state=open]:animate-in   data-[state=open]:fade-in-0   data-[state=open]:zoom-in-[97%]  data-[state=open]:slide-in-from-bottom-2  data-[state=open]:duration-300  data-[state=open]:ease-out
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[97%] data-[state=closed]:duration-200 data-[state=closed]:ease-in
            "
          >
            {/* ── Decorative top gradient bar ── */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-500/60 to-transparent" />

            {/* ── Close button ── */}
            <DialogPrimitive.Close
              aria-label="Close modal"
              className="
                absolute top-4 right-4 z-50
                flex items-center justify-center
                w-7 h-7 rounded-full
                bg-white/5 hover:bg-white/10
                text-white/40 hover:text-white/80
                ring-1 ring-white/10 hover:ring-white/20
                transition-all duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
              "
            >
              <X className="w-3.5 h-3.5" strokeWidth={2.5} />
            </DialogPrimitive.Close>

            {/* ── Header ── */}
            {(modalState.heading || modalState.description) && (
              <div className="shrink-0 px-7 pt-7 pb-5 border-b border-border">
                {modalState.heading && (
                  <DialogPrimitive.Title className="text-[1.35rem] font-semibold tracking-tight text-foreground leading-snug pr-8">
                    {modalState.heading}
                  </DialogPrimitive.Title>
                )}
                {modalState.description && (
                  <DialogPrimitive.Description className="mt-1.5 text-[0.8375rem] text-muted-foreground leading-relaxed">
                    {modalState.description}
                  </DialogPrimitive.Description>
                )}
              </div>
            )}

            {/* ── Scrollable body with bottom fade ── */}
            <div className="relative flex-1 min-h-0">
              <div className="h-full overflow-y-auto px-7 py-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {modalState.component}
              </div>

              {/* Bottom fade-out hint */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-background to-transparent" />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </FormModalContext.Provider>
  );
};
