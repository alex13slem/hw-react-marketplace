import { ComponentProps, FC, HTMLAttributes } from 'react';
import Header from '../header';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import css from './style.module.css';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const BaseLayout: FC<Props> = () => {
  useAuth();
  return (
    <div className={css.root}>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
