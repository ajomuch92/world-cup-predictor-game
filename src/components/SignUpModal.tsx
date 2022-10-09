import { ChangeEvent, useEffect, useState } from "react";

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

  const signUp = () => {
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
        <label htmlFor="password">Contraseña *</label>
        <input type="password" id="password-signup" name="password" placeholder="********" aria-invalid={invalidPassword||undefined} onChange={setValue}/>
        { invalidPassword && <small>La contraseña es requerida.</small>}
        <button type="button" className="outline" onClick={signUp}>Crear cuenta</button>
      </article>
    </dialog>
  );
}

export default SignUpModal;