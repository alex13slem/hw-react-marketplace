import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import cn from 'classnames';
import { BasketProduct } from '../../store/basket';
import { useBasketStore } from '../../store/basket';
import Button from '../ui/button';
import { formatPrice } from '../../utils';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {
  product: BasketProduct;
}

const BasketItem: FC<Props> = ({ product, className, ...props }) => {
  const { addProduct, removeOneProductById, removeProductById } =
    useBasketStore((state) => state);

  const formattedTotal = formatPrice.format(product.total);
  const formattedDiscount = formatPrice.format(product.discount);

  return (
    <article className={cn(css.root, className)} {...props}>
      <div className={css['image']}>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className={css['quantity']}>
        <button
          className={css['btn']}
          disabled={product.quantity === 1}
          onClick={() => removeOneProductById(product.id)}
        >
          -
        </button>
        <span className={css['value']}>{product.quantity}</span>
        <button className={css['btn']} onClick={() => addProduct(product)}>
          +
        </button>
      </div>
      <div className={css['info']}>
        <h3 className={css['title']}>{product.title}</h3>
        <p className={css['price']}>
          <s>{formattedTotal}</s>
          <span>{formattedDiscount}</span>
        </p>
        <Button
          className={css['btn']}
          onClick={() => removeProductById(product.id)}
        >
          Удалить
        </Button>
      </div>
    </article>
  );
};

export default BasketItem;
