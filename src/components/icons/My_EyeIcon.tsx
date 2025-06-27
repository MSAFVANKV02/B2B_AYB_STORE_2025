import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

type Props = {
  onClick: () => void;
  icon?: string;
  className?: string;
  color?: string;
  fontSize?: number;
};

function MyEyeIcon({
  onClick,
  icon = "mdi:eye",
  className,
  color,
  fontSize = 20,
}: Props) {
  return (
    <Toolbar disableGutters>
      <Tooltip
        title="View"
        placement="top"
        disableInteractive
        // enterDelay={300}
        // leaveDelay={100}
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

export default MyEyeIcon;
