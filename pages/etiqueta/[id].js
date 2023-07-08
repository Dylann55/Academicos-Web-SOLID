import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link';

//Funciones
import { generateToken, verifyToken } from '../../componentes/Token';
import { getMiddlewareData, showMiddlewareData, getMiddlewareStatus } from '../../componentes/Send'

//Componentes
import Modal from '../../componentes/Modal';
import Navbar from '../../componentes/Navbar';
import Footer from '../../componentes/Footer';

export default function MyTable() {
    const [data, setData] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');

    const router = useRouter();
    const { id } = router.query; // Obtiene el valor de la ID desde la ruta


    //Para la ventana Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        setShowForm(!showForm)
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        //Si presiono el boton cancelar, se limpian los campos
        setUpdateId(null);
        setSelectedFile(null);
        setNombreArchivo('');
        closeModal();
    };

    //Para filtrado de Datos
    //Voy a filtrar por base a la id de la etiqueta, despues por nombre_archivo y el formato del mismo
    const [nombre, setNombre] = useState('');
    const [formato, setFormato] = useState('');
    const [formatos, setFormatos] = useState([]);

    const handleFilter = async () => {
        try {
            //Mando por el url las variables, ya que por defecto son GET, no se puede construir con GET
            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + `/filtrar_archivo?nombre=${nombre}&formato=${formato}&id=${id}`;
            const data = await showMiddlewareData(url);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    async function fetchFormatos() {
        try {
            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + "/formato" + `?id=${id}`
            const data = await showMiddlewareData(url);
            //Mando las categorias para poder selecionarlo
            // Obtener las categorías únicas
            setFormatos(data);

        } catch (error) {
            console.error('Error fetching categorias:', error.message);
        }
    }

    //Valores que utilizo para las funciones de Administrador, Profesor y Alumno
    //El administrador y el Profesor pueden hacer lo que quiera

    //Alumno puede crear, editar y eliminar etiquetas que contienen archivos, que el haya creado
    //Esto se verifica por medio del email del creado del archivo

    //Rol del usuario
    const [userRole, setUserRole] = useState(null);
    //Email del la cookie
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        if (id) {
            fetchArchivos();
            fetchUserRole();
        }
    }, [id]);

    //-------------------------------Rutas para las Funciones de roles-------------------------------
    async function fetchUserRole() {
        try {
            // Obtengo el email de la cookie
            const usuario_id = Cookies.get('usuario_id');
            const token = generateToken(usuario_id);

            // Establezco la estructura de la solicitud
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            // Establezco la nueva URL para la solicitud
            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + '/buscar'

            const data = await getMiddlewareData(url, config)

            const decoded = verifyToken(data);

            setUserID(usuario_id)
            setUserRole(decoded)


        } catch (error) {
            console.error('Error fetching etiqueta:', error.message);
        }
    }

    async function fetchArchivos() {
        try {    //Modificacion para cuando filtre por nombre o por formato se mantenga eso
            if (nombre || formato) {
                handleFilter();
            } else {
                const url = process.env.NEXT_PUBLIC_MIDDLE_URL + `/archivo?id=${id}`
                const data = await showMiddlewareData(url);
                setData(data);
            }
            fetchFormatos();
        } catch (error) {
            console.error('Error fetching archivos:', error.message);
        }
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        setNombreArchivo(file.name);
    }

    async function createArchivo(event) {
        event.preventDefault();
        try {
            const usuario_id = Cookies.get('usuario_id');
            //El FormData() ya lo convierte a formato json

            const formData = new FormData();

            formData.append('usuario_id', usuario_id)
            formData.append('file', selectedFile);
            formData.append('etiqueta_id', id)
            formData.append('nombre_archivo', nombreArchivo);

            const config = {
                method: 'POST',
                body: formData,
            }
            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + "/archivo"

            const data = await getMiddlewareStatus(url, config)

            if (data) {
                console.log('Archivo creado exitosamente');
                setFormato('');
                fetchArchivos();
            } else {
                console.error('Error creating archivo:', response.status);
            }
            // Aquí puedes realizar las acciones correspondientes al enviar el formulario
            handleCancel();
        } catch (error) {
            console.error('Error creating archivo:', error.message);
        }
    }

    async function updateArchivo(event) {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('nombre_archivo', nombreArchivo);

            const config = {
                method: 'PUT',
                body: formData,
            }

            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + `/archivo/${updateId}`
            const data = await getMiddlewareStatus(url, config)

            if (data) {
                console.log('Archivo actualizado exitosamente');
                setFormato('');
                fetchArchivos();
            } else {
                console.error('Error creating archivo:', response.status);
            }
            // Aquí puedes realizar las acciones correspondientes al enviar el formulario
            handleCancel();

        } catch (error) {
            console.error('Error updating archivo:', error.message);
        }
    }

    function setUpdateFormValues(archivo) {
        //Al presionar el boton de editar aparece el formulario
        openModal()

        setUpdateId(archivo.id);
        setNombreArchivo(archivo.nombre_archivo);
    }

    async function deleteArchivo(id) {
        try {
            const config = {
                method: 'DELETE',
            }

            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + `/archivo/${id}`

            const data = await getMiddlewareStatus(url, config);

            if (data) {
                console.log('Archivo eliminado exitosamente');
                setFormato('');
                fetchArchivos();
                setUpdateId(null);
            } else {
                console.error('Error deleting archivo:', response.status);
            }
        } catch (error) {
            console.error('Error deleting archivo:', error.message);
        }
    }

    return (
        <>
            <Navbar />

            <header className="py-5 bg-light border-bottom mb-4">
                <div className="container">
                    <div className="text-center my-5">
                        <h1 className="fw-bolder">Bienvenido</h1>
                        <p className="lead mb-0">Accede a los archivos disponibles o sube el tuyo!</p>
                    </div>
                </div>
            </header>

            <div className="row justify-content-center pt-1 mb-1">

                {/* input y boton para filtrar los datos a traves de la nombre */}
                <div className="row justify-content-center" style={{ margin: '20px' }}>
                    <input
                        type="text"
                        value={nombre}
                        placeholder="Ingresar Nombre del Archivo"
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    {/* Pongo los valores unicos */}
                    <select value={formato} onChange={(e) => setFormato(e.target.value)}>
                        <option value="">Todas los Formatos</option>
                        {formatos.map((opcion, index) => (
                            <option key={index} value={opcion}>{opcion}</option>
                        ))}
                    </select>
                    <button className="btn btn-secondary" onClick={handleFilter}>Filtrar</button>
                </div>

                <button type="submit" className="btn btn-secondary" onClick={openModal}>
                    Subir Archivo
                </button>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="row justify-content-center">
                        <form onSubmit={updateId ? updateArchivo : createArchivo}>
                            <input
                                type="text"
                                value={nombreArchivo}
                                onChange={(e) => setNombreArchivo(e.target.value)}
                                placeholder="Ingrese el Nombre del Archivo"
                            />
                            <input type="file" onChange={handleFileChange} />
                            <button type="submit" className="btn btn-primary">{updateId ? 'Actualizar Archivo' : 'Crear Archivo'}</button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                        </form>
                    </div>
                </Modal>
                
                {data.map((archivo) => (
                    <div className="container" key={archivo.id}>
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="card-deck">
                                    <div className="card">
                                        
                                        <div className="card-body">
                                            <h4>{archivo.nombre_archivo}</h4>
                                            {archivo.formato === 'application/pdf' ? (
                                                <img src="/pdf-icon.png" alt="PDF Icon" width="150" height="150" />
                                            ) : archivo.formato === 'image/png' ? (
                                                <img src="/image-icon.png" alt="Image Icon" width="150" height="150" />
                                            ) : archivo.formato === 'application/msword' || archivo.formato === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
                                                <img src="/word-icon.png" alt="Word Icon" width="150" height="150" />
                                            ) : archivo.formato === 'application/vnd.ms-excel' || archivo.formato === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
                                                <img src="/excel-icon.png" alt="Excel Icon" width="150" height="150" />
                                            ) : archivo.formato === 'application/vnd.ms-powerpoint' || archivo.formato === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ? (
                                                <img src="/powerpoint-icon.png" alt="PowerPoint Icon" width="150" height="150" />
                                            ) : archivo.formato === 'video/mp4' ? (
                                                <img src="/mp4-icon.png" alt="MP4 Icon" width="150" height="150" />
                                            ) : archivo.formato === 'text/plain' ? (
                                                <img src="/txt-icon.png" alt="TXT Icon" width="150" height="150" />
                                            ) : (
                                                <img src="/default-icon.png" alt="Archivo desconocido" width="150" height="150" />
                                            )}

                                        </div>
                                        
                                        <div className="row">
                                            <button type="button" className="btn btn-info">
                                                <Link href={archivo.url_azura} download={archivo.nombre_archivo}>
                                                    Visualizar Archivo
                                                </Link>
                                            </button>
                                            {((userRole === 'Alumno' && userID == archivo.usuario_id) || userRole === 'Administrador' || userRole === 'Profesor') && (
                                                <>
                                                    <button type="button" className="btn btn-success" onClick={() =>
                                                        setUpdateFormValues(archivo)}>Editar</button>
                                                    <button type="button" className="btn btn-danger" onClick={() => deleteArchivo(archivo.id)}>Eliminar</button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <Footer />
        </>
    );
}
