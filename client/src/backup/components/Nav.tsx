
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const location = useLocation();
    return (
        <nav>
            <ul>
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/">Home</Link>
                </li>
                <li className={location.pathname === '/Profile' ? 'active' : ''}>
                    <Link to="/Profile">Profile</Link>
                </li>
                <li className={location.pathname === '/Lists' ? 'active' : ''}>
                    <Link to="/List">My List</Link>
                </li>
            </ul>
        </nav>
    )
}
