import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Router from 'next/router'

//Funciones
import { generateToken } from '../componentes/Token';
import { getMiddlewareStatus } from '../componentes/Send'

//Componentes
import NavbarIndex from '../componentes/Navbar_Index'
import FooterIndex from '../componentes/Footer';
import LoginForm from '../componentes/LoginForm';

function Signup() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const url = process.env.NEXT_PUBLIC_MIDDLE_URL + "/registro";

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      const user = {
        email: email,
        pass: password
      }

      const token = generateToken(user);

      let config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const data = await getMiddlewareStatus(url, config)

      if (data) {
        Router.push('/')
      }

    } catch (error) {
      console.error('Error al intentar registrarse:', error.message);
    }
  }

  return (
    <>
      <NavbarIndex />

      <header className="py-2 bg-light border-bottom mb-4">
        <div className="container">
          <div className="text-center my-5">
            <h1 className="fw-bolder">Registro</h1>
            <p className="lead mb-0">¡Ingresa tus datos para crear tu cuenta!</p>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">

            <div className="card cascading-right luminicente">
              <div className="card-body px-5 py-5 px-md-5 shadow-5 text-center" >

                <LoginForm
                  email={email}
                  password={password}
                  setUsername={setUsername} // Pasar setUsername como prop
                  setPassword={setPassword} // Pasar setPassword como prop
                  handleLogin={handleSignup}
                  submitButtonLabel="Registrarse"
                />

              </div>
            </div>

          </div>
        </div>
        <div >

        </div>
      </div>

      <FooterIndex />

    </>
  )
}

export default Signup;