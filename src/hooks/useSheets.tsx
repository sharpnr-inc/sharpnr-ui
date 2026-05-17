// src/context/SheetContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type SheetSize = "1/4" | "2/4" | "3/4" | "full";

interface SheetState {
  title?: string;
  description?: string;
  content?: ReactNode;
  size?: SheetSize;
  isOpen: boolean;
}

interface SheetContextProps {
  openSheet: (
    content: ReactNode,
    // title?: string,
    // description?: string,
    size?: SheetSize,
  ) => void;
  closeSheet: () => void;
}

const SheetContext = createContext<SheetContextProps | undefined>(undefined);

export const useSheet = () => {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("useSheet must be used inside SheetProvider");
  return ctx;
};

export const SheetProvider = ({ children }: { children: ReactNode }) => {
  const [sheet, setSheet] = useState<SheetState>({
    isOpen: false,
    // title: undefined,
    // description: undefined,
    content: undefined,
    size: "2/4",
  });

  const openSheet = (
    content: ReactNode,
    // title?: string,
    // description?: string,
    size: SheetSize = "2/4",
  ) => {
    setSheet({ content, size, isOpen: true });
  };

  const closeSheet = () => {
    setSheet((prev) => ({ ...prev, isOpen: false }));
  };

  // Map fraction size to Tailwind width classes
  const getWidthClass = (size?: SheetSize) => {
    switch (size) {
      case "1/4":
        return "w-1/4 p-4";
      case "2/4":
        return "sm:w-2/4 w-3/4 p-4";
      case "3/4":
        return "w-3/4 p-4 ";
      case "full":
        return "w-full p-4 ";
      default:
        return "w-2/4 p-4";
    }
  };

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}

      <Sheet open={sheet.isOpen} onOpenChange={closeSheet}>
        <SheetContent
          side="right"
          className={`w-full max-w-none overflow-y-scroll ${getWidthClass(sheet.size)} 
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-slate-300
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
            scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300`}
        >
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>{sheet.title || "Sheet Dialog"}</SheetTitle>

              {sheet.description && (
                <SheetDescription>{sheet.description}</SheetDescription>
              )}
            </SheetHeader>
          </VisuallyHidden>
          <div>{sheet.content}</div>
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
};
