import { ComponentProps, FC, HTMLAttributes } from 'react';
import css from './style.module.css';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '../../supabase';

interface Props extends ComponentProps<FC>, HTMLAttributes<HTMLDivElement> {}

const SignInPage: FC<Props> = () => {
  return (
    <div className={css.root}>
      <div className={css['auth-container']}>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={['google']}
          redirectTo={location.origin + '/profile'}
          onlyThirdPartyProviders
        />
      </div>
    </div>
  );
};

export default SignInPage;
