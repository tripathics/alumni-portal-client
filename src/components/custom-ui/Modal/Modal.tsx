import { useEffect, useRef, useState } from "react";
import { Xmark as XmarkIcon } from "iconoir-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  modalTitle?: string;
  footer?: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  setIsOpen,
  children,
  modalTitle = "",
  footer,
}) => {
  const [animatingState, setAnimatingState] = useState<"animating" | "active">(
    "animating"
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    if (!modalRef.current) return;
    setAnimatingState("animating");
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleFocus = (e: KeyboardEvent) => {
    if (!modalRef.current) return;

    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, label'
    );
    const firstElement = focusableModalElements[0] as HTMLElement;
    const lastElement = focusableModalElements[
      focusableModalElements.length - 1
    ] as HTMLElement;

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstElement) {
        // focused reached start of form then focus last input element on shift + tab
        lastElement.focus(); // focus last element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastElement) {
        // focused reached end of form then focus first input element on tab
        firstElement.focus(); // focus first element
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") handleFocus(e);
    };

    closeBtnRef.current?.focus();
    modalRef.current?.addEventListener("keydown", keyListener);

    () => {
      modalRef.current?.removeEventListener("keydown", keyListener);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setAnimatingState("active");
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }, 0);
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isOpen]);

  const modalStyles = {
    modalRoot: {
      animating: "opacity-0 pointer-events-none",
      active: "opacity-1",
    },
    modalContent: {
      animating: "translate-y-4",
      active: "translate-y-0",
    },
  };

  return createPortal(
    isOpen && (
      <div
        aria-modal="true"
        role="dialog"
        ref={modalRef}
        tabIndex={0}
        className={`py-4 px-2 fixed inset-0 z-[9500] bg-foreground/30 flex transition-opacity duration-200 ${modalStyles.modalRoot[animatingState]}`}
      >
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-transparent -z-[1]"
        ></div>
        <div
          className={`rounded-sm shadow-md overflow-clip w-full max-h-full max-w-2xl m-auto flex flex-col transition-transform duration-200 ${modalStyles.modalContent[animatingState]}`}
        >
          <header className="relative flex justify-between items-center drop-shadow-sm border-b-2 border-b-slate-200 bg-card px-8 py-3">
            <h2 className="text-lg font-semibold">{modalTitle}</h2>
            <Button
              ref={closeBtnRef}
              variant="ghost"
              size="icon"
              aria-label="Close modal"
              className="absolute rounded-full right-8 top-1/2 -translate-y-1/2"
              onClick={closeModal}
            >
              <XmarkIcon strokeWidth={2} />
            </Button>
          </header>
          <div className="overflow-hidden overflow-y-auto last:*:mb-0">
            {children}
          </div>
          {footer && (
            <footer className="drop-shadow-sm border-t-2 border-t-slate-200 bg-card px-8 py-3">
              {footer}
            </footer>
          )}
        </div>
      </div>
    ),
    document.body
  );
};

export default Modal;
