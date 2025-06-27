import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip, TooltipProps } from "@mui/material";
import { memo } from "react";

type Props = {
  onClick: (e: any) => void;
  icon?: string;
  color?: string;
  fontSize?: number;
  tooltipTitle?: string;
  placement?: TooltipProps["placement"];
  className?: string;
};

function MyIcon({
  onClick,
  icon = "wpf:approval",
  color,
  fontSize = 20,
  tooltipTitle = "status",
  placement = "top",
  className,
}: Props) {
  return (
    <Toolbar disableGutters>
      <Tooltip
        title={tooltipTitle}
        placement={`${placement}`}
        disableInteractive
      >
        <div className={cn("", className)}>
          <IconButton onClick={onClick}>
            <Icon icon={icon} fontSize={fontSize} color={color} />
          </IconButton>
        </div>
      </Tooltip>
    </Toolbar>
  );
}

export default memo(MyIcon);
