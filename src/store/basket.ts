import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getDiscountedPrice } from '../utils';

export interface BasketProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discount: number;
  discountedTotal: number;
  thumbnail: string;
}

interface Store {
  products: BasketProduct[];
  total: number;
  discount: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

interface Actions {
  /**
   * Очищает корзину
   */
  clearBasket: () => void;

  /**
   * Добавляет продукт в корзину
   */
  addProduct: (product: BasketProduct) => void;

  /**
   * Удаляет один лот продукта из корзины
   */
  removeOneProductById: (productId: number) => void;

  /**
   * Удаляет продукт из корзины
   */
  removeProductById: (productId: number) => void;
}

const initState: Store = {
  products: [],
  total: 0,
  discount: 0,
  discountedTotal: 0,
  totalProducts: 0,
  totalQuantity: 0,
};

const useBasketStore = create<Store & Actions>()(
  persist(
    immer((set) => ({
      ...initState,

      clearBasket() {
        set(initState);
      },

      addProduct(newProduct) {
        set((state) => {
          const product = state.products.find((p) => p.id === newProduct.id);

          if (product) {
            product.quantity++;
            updateProductTotals(product);
          } else {
            state.products.push(newProduct);
          }
          updateBasketTotals(state);
        });
      },

      removeOneProductById(productId) {
        set((state) => {
          const product = state.products.find((p) => p.id === productId);
          if (product) {
            product.quantity--;
            updateProductTotals(product);
            if (product.quantity <= 0) {
              state.products = state.products.filter((p) => p.id !== productId);
            }
          }
          updateBasketTotals(state);
        });
      },

      removeProductById(productId) {
        set((state) => {
          state.products = state.products.filter((p) => p.id !== productId);
          updateBasketTotals(state);
        });
      },
    })),
    {
      name: 'basket-storage',
    }
  )
);

const updateProductTotals = (product: BasketProduct) => {
  product.total = product.quantity * product.price;
  product.discountedTotal = getDiscountedPrice(
    product.total,
    product.discountPercentage
  );
  product.discount = product.total - product.discountedTotal;
};

const updateBasketTotals = (state: Store & Actions) => {
  state.total = state.products.reduce((sum, p) => sum + p.total, 0);
  state.discountedTotal = state.products.reduce(
    (sum, p) => sum + p.discountedTotal,
    0
  );
  state.totalProducts = state.products.length;
  state.totalQuantity = state.products.reduce((sum, p) => sum + p.quantity, 0);
  state.discount = state.total - state.discountedTotal;
};

export { useBasketStore };
