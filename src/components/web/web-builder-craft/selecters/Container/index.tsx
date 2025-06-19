import React from 'react';

import { ContainerSettings } from './ContainerSettings';
import { Resizer } from '../Resizer';

export type ContainerProps = {
  background: Record<'r' | 'g' | 'b' | 'a', number>;
  color: Record<'r' | 'g' | 'b' | 'a', number>;
  flexDirection: string;
  alignItems: string;
  justifyContent: string;
  fillSpace: string;
  width: string;
  height: string;
  padding: string[];
  margin: string[];
  marginTop: number;
  marginLeft: number;
  marginBottom: number;
  marginRight: number;
  shadow: number;
  children: React.ReactNode;
  radius: number;
};

const defaultProps: ContainerProps = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  fillSpace: 'no',
  padding: ['0', '0', '0', '0'],
  margin: ['0', '0', '0', '0'],
  background: { r: 255, g: 255, b: 255, a: 1 },
  color: { r: 0, g: 0, b: 0, a: 1 },
  shadow: 0,
  radius: 0,
  width: '100%',
  height: 'auto',
  marginTop: 0,
  marginLeft: 0,
  marginBottom: 0,
  marginRight: 0,
  children: null,
};

export const Container: React.FC<Partial<ContainerProps>> & {
  craft?: any;
} = (incomingProps) => {
  const props = {
    ...defaultProps,
    ...incomingProps,
  };

  const {
    flexDirection,
    alignItems,
    justifyContent,
    fillSpace,
    background,
    color,
    padding,
    margin,
    shadow,
    radius,
    width,
    height,
    children,
  } = props;

  return (
    <Resizer
      propKey={{ width: 'width', height: 'height' }}
      style={{
        display: 'flex',
        justifyContent,
        flexDirection,
        alignItems,
        background: `rgba(${background.r}, ${background.g}, ${background.b}, ${background.a})`,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        boxShadow:
          shadow === 0
            ? 'none'
            : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
        borderRadius: `${radius}px`,
        flex: fillSpace === 'yes' ? 1 : undefined,
        width,
        height,
      }}
    >
      {children}
    </Resizer>
  );
};

Container.craft = {
  displayName: 'Container',
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ContainerSettings,
  },
};
