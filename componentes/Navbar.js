import Link from 'next/link';
import { useEffect } from 'react';

import { removeCookies, checkSession } from './Cookies';

const Navbar = () => {
    useEffect(() => {
        checkSession();
    }, []);

    const handleLogout = () => {
        removeCookies();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" href="/Administracion">
                    <img src="/Logouta.png" alt="logo UTA" id="logoUTA" height={40} width={30} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="/Lobby">
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/acerca">
                                Acerca de mi
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="https://chatp2p.vercel.app">
                                Chat
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contacto">
                                Contacto
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={handleLogout}>
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;