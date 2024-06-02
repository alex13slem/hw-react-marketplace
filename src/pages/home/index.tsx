import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { useLoaderData } from 'react-router-dom';
import { LoaderData } from './loader';
import ProductCard from '../../components/product-card';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const HomePage: FC<Props> = () => {
  const { products } = useLoaderData() as LoaderData;
  return (
    <div className={css.root}>
      <div className={css['products']}>
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
