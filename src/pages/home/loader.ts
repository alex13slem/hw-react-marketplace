import { json } from 'react-router-dom';
import { Product } from '../../types';

export type LoaderData = { products: Product[] };

async function loader() {
  try {
    const data = await fetch('https://dummyjson.com/products').then((res) =>
      res.json()
    );

    return json<LoaderData>({ products: data.products }, { status: 200 });
  } catch (error) {
    return json({ error }, { status: 500 });
  }
}

export default loader;
