import { useEffect, useState, useRef } from "react";
import cx from "classnames";

type RenderProps = {
  isOpen: boolean;
  closeDropdown: () => void;
};

interface DropdownProps {
  toggle: ({ isOpen, closeDropdown }: RenderProps) => React.ReactNode;
  render: ({ isOpen, closeDropdown }: RenderProps) => React.ReactNode;
  position?: "left" | "right" | "center";
}
const Dropdown: React.FC<DropdownProps> = ({
  toggle,
  render,
  position = "left",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [animatingState, setAnimatingState] = useState<"animating" | "active">(
    "animating"
  );
  const ref = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setAnimatingState("animating");
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        setAnimatingState("active");
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const positionStyles = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 transform -translate-x-1/2",
  };

  const animatingStyles = {
    animating: "opacity-0 top-0 pointer-events-none",
    active: "opacity-100 top-full",
  };

  return (
    <div className="relative" ref={ref}>
      <div
        aria-haspopup="menu"
        className="flex"
        onClick={() => (isOpen ? closeDropdown() : setIsOpen(true))}
      >
        {toggle({ isOpen: animatingState === "active", closeDropdown })}
      </div>
      {isOpen && (
        <div
          className={cx(
            "absolute mt-1 transition-all duration-200",
            positionStyles[position],
            animatingStyles[animatingState]
          )}
        >
          {render({ isOpen, closeDropdown })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
