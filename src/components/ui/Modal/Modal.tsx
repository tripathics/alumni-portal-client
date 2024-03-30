import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";
import { Xmark as XmarkIcon } from "iconoir-react";
import { createPortal } from "react-dom";

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
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    if (!modalRef.current) return;
    modalRef.current.classList.remove(styles.active);
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

    modalRef.current?.addEventListener("keydown", keyListener);

    () => {
      modalRef.current?.removeEventListener("keydown", keyListener);
    };
  }, [isOpen]);

  useEffect(() => {
    const modal = modalRef.current;

    if (isOpen && modal) {
      setTimeout(() => {
        modal.classList.add(styles.active);
        modal.focus();
      }, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return createPortal(
    isOpen && (
      <div
        aria-modal="true"
        role="dialog"
        ref={modalRef}
        tabIndex={0}
        className={styles.darkBG}
      >
        <div className={styles.darkBGOverlay} onClick={closeModal}></div>
        <div className={styles.centered}>
          <header className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{modalTitle}</h2>
            <button autoFocus className={styles.closeBtn} onClick={closeModal}>
              <XmarkIcon strokeWidth={2} />
            </button>
          </header>
          <div className={styles.modalContent}>{children}</div>
          {footer && <footer className={styles.modalFooter}>{footer}</footer>}
        </div>
      </div>
    ),
    document.body
  );
};

export default Modal;
