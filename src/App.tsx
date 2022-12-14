import { ChangeEvent, useState } from 'react';
import supabase from './data/supbase';
import SignUpModal from './components/SignUpModal';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const setValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const login = async () => {
    let valid = true;
    if (!password) {
      setInvalidPassword(true);
      valid = false;
    }
    if (!email) {
      setInvalidEmail(true);
      valid = false;
    }
    if (!valid) return;
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email, password });
    setLoading(false);
    if (error) {
      Toastify({
        text: `Hubo un error al iniciar sesión (${error.message})`,
        gravity: 'top',
        position: 'right',
        style: {
          background: '#e74c3c',
        }
      }).showToast();
    } else {
      navigate('/home');
    }
  }

  return (
    <main className='container full-height a-flex a-center a-align-items-center'>
      <article>
        <h1>Iniciar sesión</h1>
        <label htmlFor="email">Correo</label>
        <input type="email" id="email" name="email" placeholder="johndoe@email.com" aria-invalid={invalidEmail||undefined} onChange={setValue} />
        { invalidEmail && <small>El correo es requerido.</small>}
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="********" aria-invalid={invalidPassword||undefined} onChange={setValue}/>
        { invalidPassword && <small>La contraseña es requerida.</small>}
        <button type="button" onClick={login} aria-busy={loading}>Ingresar</button>
        <p>¿No tienes una cuenta? Crea una <a className='clickable' onClick={() => setOpenDialog(true)}>aquí</a></p>
      </article>
      <SignUpModal open={openDialog} onClose={() => setOpenDialog(false)}/>
    </main>
  )
}

export default App
