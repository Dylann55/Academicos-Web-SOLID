import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Router from 'next/router'

//Funciones
import { generateToken, verifyToken } from '../componentes/Token';
import { setCookies, checkSession } from '../componentes/Cookies';
import { getMiddlewareData } from '../componentes/Send'

//Clases
import { AuthenticationService } from '../componentes/authUtils';

//Componentes
import NavbarIndex from '../componentes/Navbar_Index'
import FooterIndex from '../componentes/Footer';
import LoginForm from '../componentes/LoginForm';

function Iniciar() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const url = process.env.NEXT_PUBLIC_MIDDLE_URL

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const authenticationService = new AuthenticationService();

      const user = {
        email: email,
        pass: password
      }

      const token = generateToken(user);

      let config = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await getMiddlewareData(url, config)
      const decoded = verifyToken(data);

      if (decoded && authenticationService.isAuthenticated(decoded)) {
        setCookies(decoded);
        Router.push('/Lobby');
      } else {
        Router.push('/');
      }

    } catch (error) {
      console.error('Error al intentar ingresar:', error.message);
    }

  };

  useEffect(() => {
    checkSession();
  }, []);

  return (

    <>

      <NavbarIndex />

      <section className="background-radial-gradient">
        <div className=" container  px-4 py-0 px-md-5 text-center text-lg-start my-5 ">
          <div className="row gx-lg-5  align-items-center mb-5 mt-5 ">
            <div className="col-lg-6 mb-5 mb-lg-0 " >
              <h1 className="my-5 display-5 fw-bold ls-tight" >
                <a href="">
                  <img src="/OSS3.PNG" alt="logo AcademicOS" className="logo" id="logoAcademicOS"></img>                    </a>
              </h1>
              <p className="mb-4 opacity-70 color_texto">
                En este sitio podrás encontrar distintos tipos de archivos que pueden ser de utilidad en tu carrera universitaria. Podrás encontrar pruebas de años anteriores, informes de años previos y guías de ejercicios.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <div className="card cascading-right luminicente">
                <div className="card-body px-5 py-5 px-md-5 shadow-5 text-center" >
                  <div className="text-center my-5">
                    <h1 className="fw-bolder">Iniciar Sesión</h1>
                  </div>

                  <LoginForm
                    email={email}
                    password={password}
                    setUsername={setUsername} // Pasar setUsername como prop
                    setPassword={setPassword} // Pasar setPassword como prop
                    handleLogin={handleLogin}
                    submitButtonLabel="Ingresar"
                  />

                  <p className="lead mb-0">¿No tienes una cuenta?</p>
                  <br />
                  <a className="btn btn-primary btn-block mb-4 " role="button" href="Signup">
                    Registrarse
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterIndex />

    </>
  )
}

export default Iniciar;

