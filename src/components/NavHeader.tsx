import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../data/supbase';

const NavHeader = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    navigate('/');
  }

  return (
    <nav>
      <ul>
        <li><strong>World Cup Predictor Game</strong></li>
      </ul>
      <ul>
        <li>
          <Link to="/home">Inicio</Link>
        </li>
        <li>
          <Link to="/leagues">Ligas</Link>
        </li>
        <li>
          <button className="outline" onClick={logout} aria-busy={loading}>Cerrar Sesión</button>
        </li>
      </ul>
    </nav>
  )
}

export default NavHeader;