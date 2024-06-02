import { BasketProduct } from '../store/basket';
import { Product } from '../types';

export function createBasketProductFromProduct(
  product: Product,
  quantity: number
): BasketProduct {
  const total = product.price * quantity;
  const discountedTotal = total - (total * product.discountPercentage) / 100;
  const discount = total - discountedTotal;

  return {
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: quantity,
    total,
    discount,
    discountPercentage: product.discountPercentage,
    discountedTotal,
    thumbnail: product.thumbnail,
  };
}

export const getDiscountedPrice = (total: number, discountPercentage: number) =>
  total - (total * discountPercentage) / 100;

export const formatPrice = new Intl.NumberFormat('by-BY', {
  style: 'currency',
  currency: 'BYN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
