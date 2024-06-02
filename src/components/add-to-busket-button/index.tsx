import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import Button from '../ui/button';
import cn from 'classnames';
import { useBasketStore } from '../../store/basket';
import { Product } from '../../types';
import { createBasketProductFromProduct } from '../../utils';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLButtonElement> {
  product: Product;
}

const AddToBusketButton: FC<Props> = ({ product, className, ...props }) => {
  const addProduct = useBasketStore((state) => state.addProduct);
  const products = useBasketStore((state) => state.products);
  const isProductInBasket = products.some(({ id }) => id === product.id);
  function handleClick() {
    const newProduct = createBasketProductFromProduct(product, 1);
    addProduct(newProduct);
  }
  return (
    <Button
      className={cn(css.root, className)}
      onClick={handleClick}
      {...props}
    >
      {isProductInBasket ? 'Добавить еще' : 'В корзину'}
    </Button>
  );
};

export default AddToBusketButton;
