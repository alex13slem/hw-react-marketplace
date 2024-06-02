import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import ButtonWText from '../ui/button-w-text';
import cn from 'classnames';
import { useBasketStore } from '../../store/basket';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLButtonElement> {}

const BusketButton: FC<Props> = ({ className, ...props }) => {
  const totalQuantity = useBasketStore((state) => state.totalQuantity);
  return (
    <ButtonWText
      to="/basket"
      iconifyId="bi:bucket"
      text="Корзина"
      className={cn(css.root, className)}
      data-quantity={totalQuantity}
      {...props}
    />
  );
};

export default BusketButton;
