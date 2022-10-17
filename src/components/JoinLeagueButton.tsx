import { useEffect, useState } from 'react';
import supabase from '../data/supbase';
import Toastify from 'toastify-js';
import useUser from '../hooks/userHook';

const CreateLeagueButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidUid, setInvalidUid] = useState(false);
  const [uid, setUid] = useState('');
  const user = supabase.auth.user();
  const userId = useUser();

  useEffect(() => {
    setUid('');
    setInvalidUid(false);
  }, [showModal]);

  const joinLeague = async () => {
    if (!uid) {
      setInvalidUid(true);
      return;
    }
    debugger;
    setInvalidUid(false);
    setLoading(true);
    const { error, data } = await supabase.from('leagues').select().eq('user_id', user?.id).eq('uid', uid);
    const leagueResult = await supabase.from('leagues').select().eq('uid', uid);
    if (error) {
      Toastify({
        text: `Hubo un error al traer la información de la liga(${error.message})`,
        gravity: 'top',
        position: 'right',
        style: {
          background: '#e74c3c',
        }
      }).showToast();
    } else if (data.length > 0) {
      Toastify({
        text: 'No te puedes unir a tu propia liga',
        gravity: 'top',
        position: 'right',
        style: {
          background: '#e74c3c',
        }
      }).showToast();
    } else if (leagueResult.error) {
      Toastify({
        text: `Hubo un error al traer la información de la liga(${leagueResult.error.message})`,
        gravity: 'top',
        position: 'right',
        style: {
          background: '#e74c3c',
        }
      }).showToast();
    } else if (leagueResult.data.length === 0) {
      Toastify({
        text: 'Código de liga inválido',
        gravity: 'top',
        position: 'right',
        style: {
          background: '#e74c3c',
        }
      }).showToast();
    } else {
      const { data: dataPerLeague } = await supabase.from('users_per_league').select().eq('user_id', userId).eq('league_id', leagueResult.data[0].id);
      if (dataPerLeague && dataPerLeague.length > 0) {
        Toastify({
          text: 'Ya te has unido a esta liga',
          gravity: 'top',
          position: 'right',
          style: {
            background: '#e74c3c',
          }
        }).showToast();
      } else {
        await supabase.from('users_per_league').insert([{ user_id: userId, league_id: leagueResult.data[0].id }]);
        Toastify({
          text: 'Te has unido con éxito a la liga',
          gravity: 'top',
          position: 'right',
          style: {
            background: '#27ae60',
          }
        }).showToast();
      }
    }
    setLoading(false);
  }

  return (
    <>
      <a href="#" role="button" onClick={() => setShowModal(true)}>Unirte a una liga</a>
      <dialog open={showModal}>
        <article style={{width: '500px'}}>
          <header>
            <a aria-label="Close" className="close clickable" onClick={() => setShowModal(false)}></a>
            Únete y juega
          </header>
          <label htmlFor="name">Código de la liga</label>
          <input type="text" id="name" name="name" aria-invalid={invalidUid||undefined} value={uid} onChange={(e) => setUid(e.target.value)} />
          { invalidUid && <small>El código es requerido.</small>}
          <button type="button" className="outline" onClick={joinLeague} aria-busy={loading}>Unirte</button>
        </article>
      </dialog>
    </>
  );
}

export default CreateLeagueButton;