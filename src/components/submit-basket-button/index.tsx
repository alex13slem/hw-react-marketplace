import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import Button from '../ui/button';
import cn from 'classnames';
import { useBasketStore } from '../../store/basket';
import { useFetcher } from 'react-router-dom';
import axios from 'axios';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLButtonElement> {}

const SubmitBasketButton: FC<Props> = ({ className, ...props }) => {
  const fetcher = useFetcher();

  const products = useBasketStore((state) => state.products);

  function handleSubmit() {
    axios.post('/api/submit-basket', products);
  }
  return (
    // <fetcher.Form action="/api/submit-basket" method="post">
    // <input type="hidden" name="products" value={JSON.stringify(products)} />
    <Button
      className={cn(css.root, className)}
      onClick={handleSubmit}
      {...props}
    >
      Оформить заказ
    </Button>
    // </fetcher.Form>
  );
};

export default SubmitBasketButton;
