import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
  icon?: IconDefinition;
  activeRoutes?: string[];
}

export const NavigationLink = ({ to, text, icon, activeRoutes }: Props) => {
  const { pathname } = useLocation();

  return (
    <>
      <Link className={`navigation-link ${activeRoutes?.some(r => r === pathname) ? 'navigation-link-active' : ''}`} to={to}>
        {icon && <span className='navigation-link-icon'><FontAwesomeIcon icon={icon} /></span>}
        {text}
      </Link>
    </>
  );
};
