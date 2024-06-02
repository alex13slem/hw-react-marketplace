import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import Button from '../../components/ui/button';
import { useBasketStore } from '../../store/basket';
import { formatPrice } from '../../utils';
import cn from 'classnames';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const BasketSidebar: FC<Props> = ({ className, ...props }) => {
  const { discountedTotal, total, totalQuantity, discount, clearBasket } =
    useBasketStore((state) => state);

  const formattedDiscountedTotal = formatPrice.format(discountedTotal);
  const formattedTotal = formatPrice.format(total);
  const formattedDiscount = formatPrice.format(discount);

  return (
    <aside className={cn(css.root, className)} {...props}>
      <div className={css['total-wrap']}>
        <p className={css['total']}>
          <span>Товары, {totalQuantity} шт.</span>
          <span>{formattedTotal}</span>
        </p>
        <p className={css['discount']}>
          <span>Скидка:</span>
          <span>{formattedDiscount}</span>
        </p>
        <p className={css['discounted-price']}>
          <span>Цена со скидкой:</span>
          <span>{formattedDiscountedTotal}</span>
        </p>
      </div>
      <div className={css['btns']}>
        <button className={css['clear']} onClick={() => clearBasket()}>
          Очистить корзину
        </button>
        <Button className={css['checkout']}>Оформить заказ</Button>
      </div>
    </aside>
  );
};

export default BasketSidebar;
