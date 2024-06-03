import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import Button from '../ui/button';
import cn from 'classnames';
import { useBasketStore } from '../../store/basket';
import axios from 'axios';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLButtonElement> {}

const SubmitBasketButton: FC<Props> = ({ className, ...props }) => {
  const products = useBasketStore((state) => state.products);

  function handleSubmit() {
    axios.post('/api/submit-basket', products);
  }
  return (
    <Button
      className={cn(css.root, className)}
      onClick={handleSubmit}
      {...props}
    >
      Оформить заказ
    </Button>
  );
};

export default SubmitBasketButton;
