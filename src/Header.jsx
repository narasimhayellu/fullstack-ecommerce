import { Link } from 'react-router-dom';
import "../src/header.css"
import { useContext } from 'react';
import { AuthContext } from './auth/auth-context';

const Header = () => {
    const {isLogin, logout} = useContext(AuthContext);
    return(
    <div className='container'>
        <header className='top'>
            <Link to="/"><img  className='fc' src="https://static.vecteezy.com/system/resources/previews/004/206/405/non_2x/fc-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg" alt="" /></Link>
            <Link to="/" className='crave'><h3 >Food Crave</h3></Link>
            <Link to="/" className='home'>Home</Link>
            {!isLogin && <Link to="/signup" className='signup'>Signup</Link>}
            {isLogin && <Link to="/cart" className='cart'>Cart</Link>}
            {isLogin && <Link onClick={logout} className='logout'>Logout</Link>}
        </header>
    </div>
    )
}
export default Header;