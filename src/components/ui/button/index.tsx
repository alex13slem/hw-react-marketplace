import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLButtonElement> {
  iconifyId?: string;
  to?: string;
}

const Button: FC<Props> = ({
  className,
  to,
  children,
  iconifyId,
  ...props
}) => (
  <button {...props} className={cn(css.root, className)}>
    {to && <Link to={to} />}
    {iconifyId && <Icon icon={iconifyId} />}
    {children}
  </button>
);

export default Button;
