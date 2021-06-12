import * as React from 'react';
import { Header } from '../components/organisms/Header';
import './usertemplate.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserTemplateProps {}

export const UserTemplate: React.FC<React.PropsWithChildren<UserTemplateProps>> = ({ children }) => {
  return (
    <main className='user-template'>
      <Header />
      {children}
    </main>
  );
};
