import { json, redirect } from 'react-router-dom';
import supabase from '../../../supabase';

async function action() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return redirect('/');
  } catch (error) {
    if (error instanceof Error)
      return json({ error: error.message }, { status: 500 });
    return json({ error: 'Unknown error' }, { status: 500 });
  }
}

export default action;
