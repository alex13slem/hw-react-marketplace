import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { useBasketStore } from '../../store/basket';
import BasketSidebar from '../../sections/basket-sidebar';
import SectBasket from '../../sections/basket';
import SectBasketEmpty from '../../sections/basket-empty';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const BasketPage: FC<Props> = () => {
  const { totalProducts } = useBasketStore((state) => state);

  return (
    <div className={css.root}>
      <div className={css['main']}>
        {!totalProducts ? <SectBasketEmpty /> : <SectBasket />}
      </div>
      {!!totalProducts && <BasketSidebar className={css.sidebar} />}
    </div>
  );
};

export default BasketPage;
