import { ChangeEvent, useEffect, useState } from "react";
import supabase from '../data/supbase';
import Toastify from 'toastify-js';

interface SignUpModalProps {
  open: boolean | undefined;
  onClose: () => void | undefined,
}

const SignUpModal = (props: SignUpModalProps) => {
  const { open, onClose } = props;

  useEffect(() => {
    setInvalidName(false);
    setInvalidUsername(false);
    setInvalidPassword(false);
    setInvalidEmail(false);
  }, [open])

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [loading, setLoading] = useState(false);

  const setValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;
    if (name === 'name') {
      setName(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const signUp = async () => {
    let valid = true;
    if (!name) {
      setInvalidName(true);
      valid = false;
    }
    if (!username) {
      setInvalidUsername(true);
      valid = false;
    }
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
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Toastify({
        text: 'Hubo un error al crear tu usuario',
        duration: 3000,
        gravity: 'top',
        position: 'right',
      }).showToast();
    } else {
      const userToCreate = {
        name,
        uid: user?.id,
        username,
      }
      await supabase.from('users').insert([userToCreate]);
      Toastify({
        text: 'Ya creaste tu cuenta, prep??rate para jugar.',
        duration: 3000,
        gravity: 'top',
        position: 'right',
      }).showToast();
      onClose();
    }
    setLoading(false);
  }

  return (
    <dialog open={open}>
      <article style={{width: '500px'}}>
        <header>
          <a aria-label="Close" className="close clickable" onClick={onClose}></a>
          Crea tu cuenta
        </header>
        <label htmlFor="name">Nombre *</label>
        <input type="text" id="name" name="name" placeholder="John Doe" aria-invalid={invalidEmail||undefined} onChange={setValue} />
        { invalidName && <small>El nombre es requerido.</small>}
        <label htmlFor="username">Nombre de usuario *</label>
        <input type="text" id="username" name="username" placeholder="@johndoe" aria-invalid={invalidEmail||undefined} onChange={setValue} />
        { invalidUsername && <small>El nombre de usuario es requerido.</small>}
        <label htmlFor="email">Correo *</label>
        <input type="email" id="email-signup" name="email" placeholder="johndoe@email.com" aria-invalid={invalidEmail||undefined} onChange={setValue} />
        { invalidEmail && <small>El correo es requerido.</small>}
        <label htmlFor="password">Contrase??a *</label>
        <input type="password" id="password-signup" name="password" placeholder="********" aria-invalid={invalidPassword||undefined} onChange={setValue}/>
        { invalidPassword && <small>La contrase??a es requerida.</small>}
        <button type="button" className="outline" onClick={signUp} aria-busy={loading}>Crear cuenta</button>
      </article>
    </dialog>
  );
}

export default SignUpModal;