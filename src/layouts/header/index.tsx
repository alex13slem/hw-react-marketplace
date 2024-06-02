import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import ButtonWText from '../../components/ui/button-w-text';
import BusketButton from '../../components/busket-button';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const Header: FC<Props> = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className={css.root}>
      <div className="container">
        <div className={css['inner']}>
          <div className={css['site-logo']}>
            <Link to="/" />
            <img src="/site-logo.svg" alt="site-logo" width={240} height={58} />
          </div>
          <div className={css['btns']}>
            {!user ? (
              <ButtonWText
                iconifyId="healthicons:ui-user-profile"
                to="/signin"
                text="Войти"
              />
            ) : (
              <ButtonWText to="/profile" text="Профиль">
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name}
                />
              </ButtonWText>
            )}
            <BusketButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
