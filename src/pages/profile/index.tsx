import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { useAuthStore } from '../../store/auth';
import { Form } from 'react-router-dom';
import Button from '../../components/ui/button';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const ProfilePage: FC<Props> = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={css.root}>
      {!user ? (
        <h1>Загрузка...</h1>
      ) : (
        <div className={css['info']}>
          {user.user_metadata.avatar_url && (
            <img src={user.user_metadata.avatar_url} alt="avatar" />
          )}
          <h1>{user.user_metadata.full_name || 'Клиент'}</h1>
          {user.email && <p>Email: {user.email}</p>}
        </div>
      )}
      <div className={css['actions']}>
        <Button iconifyId="bi:bucket" to="/basket">
          Корзина
        </Button>
        <Form action="./signout" method="post" navigate={false}>
          <Button iconifyId="uil:signout">Выйти</Button>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;
