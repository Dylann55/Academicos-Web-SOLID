import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import jwt from 'jsonwebtoken';

//Funciones
import { generateToken, verifyToken } from '../componentes/Token';
import { getMiddlewareStatus } from '../componentes/Send'

//Componentes
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';

const Home = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            //Obtengo el email de la cookie
            const sender = Cookies.get('usuario_id');
            
            //Establesco las variables a enviar al servidor
            const message_user = {
                sender,
                message,
                messageType
            }
            //Encripto los datos a enviar
            const token = generateToken(message_user);
            // Establezco la estructura de la solicitud

            //Establesco la estructura, lo voy a poner en el headers, en lugar del body
            const config = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            //Establesco nueva url
            const url = process.env.NEXT_PUBLIC_VPS_SERVICE_URL + '/send-email'
            const data = await getMiddlewareStatus(url, config)

            if (data) {
                console.log('Correo electrónico enviado correctamente.');
                // Restablecer los campos del formulario después de enviar el correo electrónico
                setMessage('');
                setMessageType('');
            } else {
                console.log('Error al enviar el correo electrónico.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div>
            <Navbar />

            <header className="py-5 bg-light border-bottom mb-4">
                <div className="container">
                    <div className="text-center my-5">
                        <h1 className="fw-bolder">Contacta con un Administrador</h1>
                        <p className="lead mb-0">Envia un correo eléctronico a un administrador si necesitas asistencia.</p>
                    </div>
                </div>
            </header>
            <div className="container">
                <form className="row justify-content-center" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tipo de Mensaje</label>
                        <input type="text" className="form-control" placeholder="Escribe aqui el tipo de mensaje..." value={messageType} onChange={(e) => setMessageType(e.target.value)} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Mensaje</label>
                        <textarea className="form-control" rows="3" placeholder="Escribe aqui tu mensaje..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ margin: '20px' }}>Enviar</button>
                </form>
            </div>

            <Footer />
        </div>

    );
};

export default Home;