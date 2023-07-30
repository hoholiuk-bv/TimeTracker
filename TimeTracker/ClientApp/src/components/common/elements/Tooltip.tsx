import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Tooltip as BootstrapTooltip } from 'react-bootstrap';

type Props = {
  text: string | null,
  children: string | JSX.Element | JSX.Element[];
}

export const Tooltip = ({ text, children }: Props) => {
  return (
    <OverlayTrigger placement="right" overlay={<BootstrapTooltip>{text}</BootstrapTooltip>}>
      <span>{children}</span>
    </OverlayTrigger>
  );
};