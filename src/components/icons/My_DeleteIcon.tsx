import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip, TooltipProps } from "@mui/material";

type Props = {
  onClick: () => void;
  icon?: string;
  title?: string;
  color?: string;
  fontSize?: number;
  tooltipTitle?: string;
  placement?: TooltipProps["placement"];
  loading?: boolean;
  loadingIcon?: string; 
};

export default function MyDeleteIcon({
  onClick,
  color,
  fontSize = 20,
  placement = "top",
  icon = "material-symbols:delete",
  title = "Delete",
  loading = false,
  loadingIcon = "eos-icons:loading"

}: Props) {
  return (
    <Toolbar disableGutters>
      <Tooltip title={title} placement={placement}>
        <div className="">
          <IconButton onClick={onClick}>
            {
              loading ? (
                <Icon icon={loadingIcon} fontSize={fontSize} color={color} />
              ):(
                <Icon icon={icon} fontSize={fontSize} color={color} />
              )
            }
            
          </IconButton>
        </div>
      </Tooltip>
    </Toolbar>
  );
}
