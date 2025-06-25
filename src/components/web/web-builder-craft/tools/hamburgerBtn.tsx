import { cn } from "@/lib/utils";
import { UIAction } from "@/providers/reducers/builderReducer";
import { Icon } from "@iconify/react";

type HamburgerBtnProps = {
  className?: string;
  dispatch: React.Dispatch<UIAction>;
  type:
    | "TOGGLE_SETTINGS"
    | "OPEN_SETTINGS"
    | "CLOSE_SETTINGS"
    | "TOGGLE_SIDEBAR"
    | "OPEN_SIDEBAR"
    | "CLOSE_SIDEBAR"
    | "TOGGLE_HEADER"
    | "CLOSE_ALL";
};

const HamburgerBtn: React.FC<HamburgerBtnProps> = ({
  className,
  dispatch,
  type,
}) => {
  return (
    <div
      className={cn(
        "w-7 h-7 flex justify-center items-center z-50 bg-white border cursor-pointer",
        className
      )}
      onClick={() => {
        dispatch({ type: type });
      }}
    >
      <Icon icon="quill:hamburger" />
    </div>
  );
};

export default HamburgerBtn;
