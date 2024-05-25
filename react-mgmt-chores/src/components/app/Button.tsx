type ButtonProps = {
  type?: "submit" | "button" | "reset";
  text?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
  handleClick?: () => void;
  variant?: "text" | "error";
};

export const Button = ({
  text,
  type = "button",
  icon,
  ariaLabel,
  disabled,
  variant = "text",
  handleClick,
}: ButtonProps) => {
  let bgStyle = "";

  switch (variant) {
    case "error":
      bgStyle = "text-white bg-red-400 hover:bg-red-500";
      break;
    case "text":
      bgStyle = "text-dark hover:bg-gray-100";
      break;
    default:
      bgStyle = "text-dark hover:bg-gray-100";
      break;
  }
  return (
    <button
      type={type}
      aria-label={`${ariaLabel}`}
      className={`h-7 w-7 flex justify-center items-center ${bgStyle} font-bold rounded ${
        disabled ? "opacity-50" : ""
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon ? icon : text}
    </button>
  );
};
