import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import cn from 'classnames';
import Button from '../../components/ui/button';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const SectBasketEmpty: FC<Props> = ({ className, ...props }) => {
  return (
    <section className={cn(css.root, className)} {...props}>
      <h1 className={css.title}>В корзине пока пусто</h1>
      <p className="description">
        Загляните на главную, чтобы выбрать товары или найдите нужное в поиске
      </p>
      <Button className={css['btn']} to={'/'}>
        Перейти в каталог
      </Button>
    </section>
  );
};

export default SectBasketEmpty;
