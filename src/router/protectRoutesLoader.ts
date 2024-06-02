import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import supabase from '../supabase';

async function loader({ request }: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url);
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && pathname === '/signin') return redirect('/profile');
    if (!session && pathname.includes('/profile')) return redirect('/signin');
  } catch (error) {
    console.error(error);
    return redirect('/signin');
  }

  return null;
}

export default loader;
