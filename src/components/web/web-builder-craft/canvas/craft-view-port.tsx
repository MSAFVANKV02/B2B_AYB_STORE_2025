import { useEditor } from '@craftjs/core';
import cx from 'classnames';
import React, { useEffect } from 'react';

import CraftBuilderHeader from '../tools/CraftHeader';
import SettingsPanelCraft from '../tools/settings-Panel-Craft';
import { cn } from '@/lib/utils';
import CraftSidebar from '../tools/craft-sidebar';



export const CraftViewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const {
    enabled,
    connectors,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        '*'
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className=" ">
      <div
        className={cx(['flex h-full overflow-hidden flex-row w-full '])}
      >
        {/* <CraftToolBar /> */}
        <CraftSidebar />
        <div className="page-container flex flex-1 h-full flex-col ">
        <CraftBuilderHeader />
          <div
            className={cn([
              'craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto',
              {
                'bg-renderer-gray': enabled,
              },
            ])}
            ref={(ref) => {
            // if(ref)  connectors.select(connectors.hover(ref, null), null);
            if (ref) connectors.select(connectors.hover(ref, ''), '');

            }}
          >
            <div className="relative flex-col w-full flex h-full items-center p-5 overflow-auto">
              {children}
            </div>
          </div>
        </div>
        <SettingsPanelCraft />
      </div>
    </div>
  );
};
