import React from 'react';
import { CustomLink } from '../CustomLink/CustomLink';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <div className='header'>
      <nav>
        <CustomLink to='/'>Currency Converter</CustomLink>
        <CustomLink to='history'>History</CustomLink>
      </nav>
    </div>
  );
}