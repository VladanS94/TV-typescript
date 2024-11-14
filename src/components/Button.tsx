import React, {
  CSSProperties,
  PropsWithChildren,
  useState,
  useRef,
  forwardRef,
} from "react";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant: "primary" | "secondary" | "error";
  size: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}>;

const variantStyles: Record<ButtonProps["variant"], CSSProperties> = {
  primary: {
    backgroundColor: "blue",
  },
  secondary: {
    backgroundColor: "gray",
  },
  error: {
    backgroundColor: "red",
  },
};

const sizeStyles: Record<ButtonProps["size"], CSSProperties> = {
  sm: {
    padding: "0.5rem",
  },
  md: {
    padding: "0.75rem",
  },
  lg: {
    padding: "1rem",
    width: "100%",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, variant = "primary", size = "md" }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <button
        ref={ref || buttonRef}
        style={{
          outline: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontFamily: "sans-serif",
          borderRadius: 7,
          ...variantStyles[variant],
          ...sizeStyles[size],
          backgroundColor: isFocused
            ? "#020259"
            : variantStyles[variant].backgroundColor,
        }}
        onClick={onClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
