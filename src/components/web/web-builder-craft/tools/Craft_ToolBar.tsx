import { useEditor, Element } from "@craftjs/core";
import { Container } from "./container";
import { styled } from "styled-components";
import { Tooltip } from "@mui/material";


const ToolboxDiv = styled.div<{ $enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.$enabled ? `width: 0;` : "")}
  ${(props) => (!props.$enabled ? `opacity: 0;` : "")}
`;

const Item = styled.a<{ $move?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    width: 28px;
    height: 28px;
    fill: #707070;
  }
  ${(props) =>
    props.$move &&
    `
    cursor: move;
  `}
`;

const CraftToolBar = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      $enabled={enabled}
      className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
      <div
        ref={(ref) => {
          if (ref) {
            create(
              ref,
              <Element
                canvas
                is={Container}
                background="rgb(78, 78, 78)"
                padding={12}
                height="300px"
                width="300px"
              >
                {/* Fix: Add empty children to satisfy required prop */}
                <></>
              </Element>
            );
          }
        }}
      >
        <Tooltip title="Container" placement="right">
          <Item $move>
            {/* <SquareSvg /> */}
            {/* <div className="w-6 h-6 border border-black"></div> */}
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
          </Item>
        </Tooltip>
      </div>
    </ToolboxDiv>
  );
};

export default CraftToolBar;
