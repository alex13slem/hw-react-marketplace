import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { useLoaderData } from 'react-router-dom';
import { LoaderData } from './loader';
import AddToBusketButton from '../../components/add-to-busket-button';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const ProductPage: FC<Props> = () => {
  const { product } = useLoaderData() as LoaderData;

  return (
    <div className={css.root}>
      <h1 className={css.title}>{product.title}</h1>
      <img className={css.image} src={product.thumbnail} alt={product.title} />
      <p className={css.description}>{product.description}</p>
      <AddToBusketButton className={css.btn} product={product}>
        В корзину
      </AddToBusketButton>
    </div>
  );
};

export default ProductPage;
