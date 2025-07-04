import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import  { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Trash2, Move3D, ArrowUp } from 'lucide-react';

// import ArrowUp from '@/../public/icons/arrow-up.svg';
// import Delete from '@/../public/icons/delete.svg';
// import Move from '@/../public/icons/move.svg';

const IndicatorDiv = styled.div`
  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;

  svg {
    fill: #fff;
    width: 15px;
    height: 15px;
  }
`;

const Btn = styled.a`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  > svg {
    position: relative;
    top: 0;
    left: 0;
  }
`;

export const RenderNode = ({ render }:any) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom?.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
  }));

  const currentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) {
        dom.classList.add('component-selected');
      } else {
        dom.classList.remove('component-selected');
      }
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom?.getBoundingClientRect() ?? {
      top: 0,
      left: 0,
      bottom: 0,
    };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);



  const scroll = useCallback(() => {
      if(!dom) return
    const currentDOM = currentRef.current;
    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    const renderer = document.querySelector('.craftjs-renderer');
    if (!renderer) return;

    renderer.addEventListener('scroll', scroll);
    return () => renderer.removeEventListener('scroll', scroll);
  }, [scroll]);

  const portalTarget = document.querySelector('.page-container');

  return (
    <>
      {dom &&(isHover || isActive) && portalTarget
        ? ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef}
              className="px-2 py-2 text-white dark:text-neutral-300 dark:bg-black bg-primary fixed flex items-center"
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable && (
                <Btn className="mr-2 cursor-move" ref={(el) => el && drag(el)}>
                  <Move3D size={18} color="#fff" />
                </Btn>
              )}
              {id !== ROOT_NODE && (
                <Btn
                  className="mr-2 cursor-pointer"
                  onClick={() => actions.selectNode(parent??"")}
                >
                  <ArrowUp />
                </Btn>
              )}
              {deletable && (
                <Btn
                  className="cursor-pointer"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                 <Trash2 size={18} color="#fff" />
                </Btn>
              )}
            </IndicatorDiv>,
            portalTarget
          )
        : null}
      {render}
    </>
  );
};
