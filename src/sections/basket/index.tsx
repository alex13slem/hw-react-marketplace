import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import cn from 'classnames';
import { useBasketStore } from '../../store/basket';
import BasketItem from '../../components/basket-item';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const SectBasket: FC<Props> = ({ className, ...props }) => {
  const { products, totalProducts } = useBasketStore((state) => state);
  return (
    <section className={cn(css.root, className)} {...props}>
      <h1 className={css.title}>Корзина</h1>
      <p className={css['product-count']}>
        {totalProducts}{' '}
        {totalProducts > 4 ? 'товаров' : totalProducts > 1 ? 'товара' : 'товар'}
      </p>
      <div className={css.products}>
        {products.map((product) => (
          <BasketItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SectBasket;
