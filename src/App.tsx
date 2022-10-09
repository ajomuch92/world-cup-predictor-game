import { ChangeEvent, useState } from 'react'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const setValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const login = () => {
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
        <button type="button" onClick={login}>Submit</button>
        <p>¿No tienes una cuenta? Crea una <a href=''>aquí</a></p>
      </article>
    </main>
  )
}

export default App
