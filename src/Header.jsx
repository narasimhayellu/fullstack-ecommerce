import { Link } from 'react-router-dom';
import "./header.css"
import { useContext } from 'react';
import { AuthContext } from './auth/auth-context';

const Header = () => {
    const {isLogin, logout} = useContext(AuthContext);
    return(
    <div className='container'>
        <header className="top">
  <div className="logo-area">
    <Link to="/">
      <img className="fc" src="https://static.vecteezy.com/system/resources/previews/004/206/405/non_2x/fc-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg" alt="" />
    </Link>
    <Link to="/" className="crave">Food Crave</Link>
  </div>

  <div className="header-links">
    <Link to="/">Home</Link>
    {!isLogin && <Link to="/signup">Signup</Link>}
    {isLogin && <Link to="/cart">Cart</Link>}
    {isLogin && <Link onClick={logout}>Logout</Link>}
  </div>
</header>
    </div>
    )
}
export default Header;