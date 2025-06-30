import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

type Props = {
  onClick: () => void;
  isTooltip?: boolean;
};

export default function MyCloseIcon({ onClick, isTooltip }: Props) {
  return (
    <>
      {isTooltip ? (
        <Toolbar disableGutters>
          <Tooltip title="Close" placement="top" disableInteractive>
            <div className="">
              <IconButton onClick={onClick}>
                {/* <Close /> */}
                <Icon icon={"iconamoon:close-light"} />
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      ) : (
        <IconButton onClick={onClick}>
          <Icon icon={"iconamoon:close-light"} />
        </IconButton>
      )}
    </>
  );
}
