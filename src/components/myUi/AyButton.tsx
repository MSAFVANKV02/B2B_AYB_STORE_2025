import { Button, SxProps, Theme } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/assets/css/preloader.css";
import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
  title?: string;
  sx?: SxProps<Theme>;
  variant?: "contained" | "outlined" | "cancel" | "delete" | "gray";
  outLineColor?: string;
  icon?: string;
  iconSize?: number;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export default function AyButton({
  onClick,
  title,
  sx,
  variant = "contained",
  outLineColor,
  icon,
  iconSize,
  type = "button",
  loading,
  disabled = false,
  show = true,
  children,
  className,
}: Props) {
  return (
    <>
      {show && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={className}
        >
          <Button
            onClick={() => {
              if (onClick && !disabled) {
                onClick();
              }
            }}
            type={type}
            disabled={disabled}
            sx={(theme) => {
              const isDark = theme.palette.mode === "dark";
              let styles: SxProps<Theme> = {
                textTransform: "capitalize",
                width: "150px",
              };

              if (variant === "contained") {
                styles = {
                  ...styles,
                  bgcolor: disabled ? "#d3d3d3" : "var(--mainColor)",
                  color: disabled ? "#a0a0a0" : "#fff",
                  "&:hover": {
                    bgcolor: disabled
                      ? "#d3d3d3"
                      : "var(--primaryVariant)",
                  },
                };
              } else if (variant === "outlined") {
                styles = {
                  ...styles,
                  border: `1px solid ${outLineColor ?? "currentColor"}`,
                  color: disabled
                    ? "#a0a0a0"
                    : outLineColor
                    ? outLineColor
                    : isDark
                    ? "#eee"
                    : "var(--mainColor)",
                  bgcolor: "transparent",
                  "&:hover": {
                    bgcolor: isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 123, 255, 0.1)",
                  },
                };
              } else if (variant === "cancel") {
                styles = {
                  ...styles,
                  border: `1px solid ${outLineColor ?? "#000"}`,
                  color: disabled ? "#a0a0a0" : "#fff",
                  bgcolor: disabled ? "#d3d3d3" : "#000",
                  "&:hover": {
                    bgcolor: "rgba(34, 32, 32, 0.9)",
                  },
                };
              } else if (variant === "gray") {
                styles = {
                  ...styles,
                  border: `1px solid ${outLineColor ?? "#ccc"}`,
                  color: disabled ? "#a0a0a0" : isDark ? "#ccc" : "#575757",
                  bgcolor: disabled ? "#d3d3d3" : isDark ? "#444" : "#E5E5E5",
                  "&:hover": {
                    bgcolor: isDark ? "#555" : "#DCDCDC",
                  },
                };
              } else if (variant === "delete") {
                styles = {
                  ...styles,
                  border: `1px solid ${outLineColor ?? "red"}`,
                  color: disabled ? "#a0a0a0" : "#fff",
                  bgcolor: disabled ? "#d3d3d3" : "red",
                  "&:hover": {
                    bgcolor: "rgba(201, 32, 32, 0.9)",
                  },
                };
              }

              return {
                ...styles,
                ...((typeof sx === "function" ? sx(theme) : sx) || {}),
              };
            }}
          >
            {!disabled && loading ? (
              <div className="flex items-center">
                <span className="loader mr-2 text-white font-semibold space-x-1 ">
                  Processing<span className="ms-1">.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            ) : (
              <>
                {icon && (
                  <Icon icon={icon} fontSize={iconSize} className="mr-2" />
                )}
                {title}
              </>
            )}
            {children}
          </Button>
        </motion.div>
      )}
    </>
  );
}
