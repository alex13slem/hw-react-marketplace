import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Icon } from '@iconify/react';
import AddToBusketButton from '../add-to-busket-button';
import { formatPrice, getDiscountedPrice } from '../../utils';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {
  data: Product;
}

const ProductCard: FC<Props> = ({ data }) => {
  const price = formatPrice.format(data.price);
  const discountPrice = formatPrice.format(
    getDiscountedPrice(data.price, data.discountPercentage)
  );

  return (
    <article className={css.root}>
      <Link to={'/product/' + data.id} />
      <div className={css['top-wrap']}>
        <img src={data.thumbnail} alt={data.title} />
      </div>
      <div className={css['middle-wrap']}>
        <p className={css['price']}>
          <s>{price}</s>
          <span>{discountPrice}</span>
        </p>
        <h3 className={css['title']}>
          {data.title}{' '}
          <span className={css['category']}>/ {data.category}</span>
        </h3>
      </div>
      <div className={css['bottom-wrap']}>
        <div className={css['rating']}>
          <Icon icon="material-symbols:star" />
          <span>{data.rating}</span>
        </div>
        <AddToBusketButton className={css['btn']} product={data}>
          В корзину
        </AddToBusketButton>
      </div>
    </article>
  );
};

export default ProductCard;
