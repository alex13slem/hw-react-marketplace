import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLButtonElement> {
  text: string;
  iconifyId?: string;
  to?: string;
}

const ButtonWText: FC<Props> = ({
  text,
  iconifyId,
  to,
  className,
  children,
  ...props
}) => {
  return (
    <button className={cn(css.root, className)} {...props}>
      {to && <Link to={to} />}
      {!iconifyId ? children : <Icon icon={iconifyId} />}
      <span>{text}</span>
    </button>
  );
};

export default ButtonWText;
