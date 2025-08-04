import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/technology" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Technology
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/resources" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Resources
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
