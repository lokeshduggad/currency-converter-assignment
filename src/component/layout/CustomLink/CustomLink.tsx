import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './CustomLink.css';

export const CustomLink: React.FC<LinkProps> = ({ children, to, ...props }) => {
  return (
    <Link
      className='customLink'
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}
