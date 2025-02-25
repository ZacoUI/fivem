import React from 'react';

import { clsx } from 'cfx/utils/clsx';

import { FlexRestricter } from './FlexRestricter';

import s from './Flex.module.scss';

export interface FlexProps {
  fullWidth?: boolean;
  fullHeight?: boolean;

  centered?: boolean | 'axis' | 'cross-axis' | 'baseline-axis' | 'baseline-cross-axis';
  vertical?: boolean;
  reverseOrder?: boolean;
  repell?: boolean;
  stretch?: boolean;
  wrap?: boolean;
  spaceBetween?: boolean;
  alignToEnd?: boolean;
  alignToEndAxis?: boolean;

  gap?: 'none' | 'thin' | 'small' | 'normal' | 'large' | 'xlarge';

  children?: React.ReactNode;
  className?: string;
}

function FlexComponent(props: FlexProps, ref: React.Ref<HTMLDivElement>) {
  const {
    fullWidth = false,
    fullHeight = false,
    vertical = false,
    centered = false,
    repell = false,
    stretch = false,
    wrap = false,
    alignToEnd = false,
    alignToEndAxis = false,
    spaceBetween = false,
    reverseOrder = false,
    gap = 'normal',
    children,
    className,
  } = props;

  const rootClassName = clsx(s.root, className, s[`gap-${gap}`], {
    [s['full-width']]: fullWidth,
    [s['full-height']]: fullHeight,
    [s.centered]: centered === true,
    [s['centered-axis']]: centered === 'axis',
    [s['centered-cross-axis']]: centered === 'cross-axis',
    [s['baseline-axis']]: centered === 'baseline-axis',
    [s['baseline-cross-axis']]: centered === 'baseline-cross-axis',
    [s.vertical]: vertical,
    [s.horizontal]: !vertical,
    [s.repell]: repell,
    [s.stretch]: stretch,
    [s.wrap]: wrap,
    [s['align-to-end']]: alignToEnd,
    [s['align-to-end-axis']]: alignToEndAxis,
    [s['space-between']]: spaceBetween,
    [s['reverse-order']]: reverseOrder,
  });

  return (
    <div ref={ref} className={rootClassName}>
      {children}
    </div>
  );
}

const FlexComponentReffed = React.forwardRef(FlexComponent);

type FlexType = typeof FlexComponentReffed & { Restricted: React.FC<{ children?: React.ReactNode }> };

export const Flex: FlexType = FlexComponentReffed as any;

Flex.Restricted = function FlexRestricted({
  children,
}: Pick<FlexProps, 'children' | 'fullWidth' | 'fullHeight'>) {
  return (
    <Flex>
      <FlexRestricter>{children}</FlexRestricter>
    </Flex>
  );
};
