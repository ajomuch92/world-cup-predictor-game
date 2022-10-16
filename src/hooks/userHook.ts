import { useEffect, useState } from 'react';
import supabase from '../data/supbase';

const useUser = () => {
  const user = supabase.auth.user();
  const [userId, setUserId] = useState(0);

  const getUserId = async () => {
    const { error , data } = await supabase.from('users').select('id').eq('uid', user?.id);
    if (!error && data.length) {
      setUserId(data[0].id);
    }
  }

  useEffect(() => {
    getUserId();
  });

  return userId;
}

export default useUser;