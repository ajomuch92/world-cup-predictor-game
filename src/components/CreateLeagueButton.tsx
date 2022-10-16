import { useEffect, useState } from 'react';
import supabase from '../data/supbase';
import Toastify from 'toastify-js';
import useUser from '../hooks/userHook';

const CreateLeagueButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [name, setName] = useState('');
  const userId = useUser();

  useEffect(() => {
    setName('');
    setInvalidName(false);
  }, [showModal]);

  const createLeague = async () => {
    if (!name) {
      setInvalidName(true);
      return;
    }
    setInvalidName(false);
    setLoading(true);
    const { error, data } = await supabase.from('leagues').insert([
      { name, user_id: supabase.auth.user()?.id }
    ]);
    setLoading(false);
    if (error) {
      Toastify({
        text: `Hubo un error al crear tu liga(${error.message})`,
        gravity: 'top',
        position: 'right',
        style: {
          background: '#e74c3c',
        }
      }).showToast();
    } else {
      await supabase.from('users_per_league').insert([{league_id: data[0].id, user_id: userId}]);
      Toastify({
        text: 'Liga creada con éxito',
        gravity: 'top',
        position: 'right',
        style: {
          background: '#27ae60',
        }
      }).showToast();
    }
  }

  return (
    <>
      <a href="#" role="button" onClick={() => setShowModal(true)}>Crear Liga</a>
      <dialog open={showModal}>
        <article style={{width: '500px'}}>
          <header>
            <a aria-label="Close" className="close clickable" onClick={() => setShowModal(false)}></a>
            Crea tu liga
          </header>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" aria-invalid={invalidName||undefined} onChange={(e) => setName(e.target.value)} />
          { invalidName && <small>El nombre es requerido.</small>}
          <button type="button" className="outline" onClick={createLeague} aria-busy={loading}>Crear Liga</button>
        </article>
      </dialog>
    </>
  );
}

export default CreateLeagueButton;