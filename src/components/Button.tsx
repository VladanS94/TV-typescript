import { CSSProperties, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant: "primary" | "secondary" | "error";
  size: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}>;

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
}: ButtonProps) => {
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

  return (
    <button
      style={{
        outline: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        fontFamily: "sans-serif",
        borderRadius: 7,
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
