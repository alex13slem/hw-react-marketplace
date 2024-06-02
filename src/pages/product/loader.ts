import { LoaderFunctionArgs, json } from 'react-router-dom';
import { Product } from '../../types';

export type LoaderData = {
  product: Product;
};

async function loader({ params }: LoaderFunctionArgs) {
  const productId = params.id;

  try {
    const data = await fetch(
      `https://dummyjson.com/products/${productId}`
    ).then((res) => res.json());

    return json<LoaderData>({ product: data }, { status: 200 });
  } catch (error) {
    return json({ error }, { status: 500 });
  }
}

export default loader;
