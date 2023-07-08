import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link';
import Cookies from 'js-cookie'

//Funciones
import { generateToken, verifyToken } from '../componentes/Token';
import { getMiddlewareData, showMiddlewareData, getMiddlewareStatus } from '../componentes/Send'

//Componentes
import Modal from '../componentes/Modal';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';

export default function Lobby() {

    //Almacena los datos de la tabla
    const [data, setData] = useState([]);
    //Almacena los valores del formulario para crear o actualizar registros
    const [formValues, setFormValues] = useState({
        etiqueta: '',
        description: '',
        categoria: ''
    });
    //Almacena el ID del registro que se va a actualizar
    const [updateId, setUpdateId] = useState(null);
    //Controla la visibilidad del formulario
    const [showForm, setShowForm] = useState(false);

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
        setUpdateId(null);
        setFormValues({
            etiqueta: '',
            description: '',
        });
        closeModal();
    };

    //Para filtrado de Datos
    const [etiqueta, setEtiqueta] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);

    const handleFilter = async () => {
        try {
            //Mando por el url las variables, ya que por defecto son GET, no se puede construir con GET
            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + `/filtrar?etiqueta=${etiqueta}&categoria=${categoria}`;
            const data = await showMiddlewareData(url);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    async function fetchCategorias() {
        try {
            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + "/categoria"
            const data = await showMiddlewareData(url);
            //Mando las categorias para poder selecionarlo
            // Obtener las categorías únicas
            setCategorias(data);

        } catch (error) {
            console.error('Error fetching categorias:', error.message);
        }
    }

    // Valores que utilizo para las funciones de Administrador, Profesor y Alumno
    // El administrador puede hacer lo que quiera
    // El profesor puede crear, editar y eliminar etiquetas que contienen archivos, que él haya creado
    // Esto se verifica por medio del id del usuario del creado de la etiqueta
    // Alumno no puede hacer nada, solo puede ingresar a la etiqueta

    //Rol del usuario
    const [userRole, setUserRole] = useState(null);
    //id del usuario del la cookie
    const [userID, setUserID] = useState(null);

    // Se ejecuta al iniciar, solo lo hace una vez ([])
    useEffect(() => {
        fetchEtiquetas();
        fetchUserRole();
    }, []);

    //-------------------------------Rutas para las Funciones de roles-------------------------------
    async function fetchUserRole() {
        try {
            // Obtengo el id del usuario de la cookie
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
            console.error('Error fetching role:', error.message);
        }
    }

    //-------------------------------Rutas para el CRUD con la tabla "etiqueta"-------------------------------
    // Leer registros
    async function fetchEtiquetas() {
        try {
            //Modificacion para cuando filtre por etiqueta o por categoria se mantenga eso
            if (etiqueta || categoria) {
                handleFilter();
            } else {
                const url = process.env.NEXT_PUBLIC_MIDDLE_URL + '/etiquetas'
                const data = await showMiddlewareData(url);
                setData(data);
            }
            fetchCategorias();
        } catch (error) {
            console.error('Error fetching etiqueta:', error.message);
        }
    }

    // Actualizar el valor del formulario, maneja el cambio de valores en los campos del formulario.
    function handleFormChange(event) {
        /* Obtiene el nombre y el valor del campo que se ha modificado y actualiza 
           el estado formValues agregando o sobrescribiendo la propiedad correspondiente
         */
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    //Se ejecuta cuando se envía el formulario(formValues) para crear un nuevo registro
    // Crear un registro
    async function createEtiqueta(event) {
        event.preventDefault();

        try {

            const usuario_id = Cookies.get('usuario_id'); // Obtener el valor de la cookie que contiene el id del usuario

            // Agregar el id del usuario al objeto formValues
            //Aqui estoy enviando los datos del formulario y el id del usuario del que crea la etiqueta
            //la logica cuando llega al server es const { etiqueta, description , id del usuario} = req.body;
            const formValuesWithEmail = {
                ...formValues,
                usuario_id: usuario_id
            };

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValuesWithEmail),
            }
            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + '/etiquetas'

            const data = await getMiddlewareStatus(url, config)

            if (data) {
                console.log('Archivo creado exitosamente');
                fetchEtiquetas();
            } else {
                console.error('Error creating archivo:', response.status);
                // Manejar el error adecuadamente según tus necesidades
            }
            // Aquí puedes realizar las acciones correspondientes al enviar el formulario
            handleCancel();
        } catch (error) {
            console.error('Error creating etiqueta:', error.message);
        }
    }

    // Actualizar un registro, se ejecuta cuando se envía el formulario para actualizar un registro existente
    async function updateEtiqueta(event) {
        event.preventDefault();

        try {
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            }

            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + `/etiquetas/${updateId}`
            const data = await getMiddlewareStatus(url, config)

            if (data) {
                console.log('Registro actualizado exitosamente');
                setCategoria('');
                fetchEtiquetas();
            } else {
                console.error('Error creating archivo:', response.status);
            }
            // Aquí puedes realizar las acciones correspondientes al enviar el formulario
            handleCancel();

        } catch (error) {
            console.error('Error updating etiqueta:', error.message);
        }
    }
    // Establecer los valores del formulario y updateId para la actualización
    /* Se utiliza cuando se hace clic en el botón "Editar" de un registro para 
       mostrar los valores actuales en el formulario
    */
    function setUpdateFormValues(etiqueta) {
        //Al presionar el boton de editar aparece el formulario
        openModal()

        setFormValues({
            etiqueta: etiqueta.etiqueta || '',
            description: etiqueta.description || '',
            categoria: etiqueta.categoria || '',
        });
        setUpdateId(etiqueta.id);
    }

    // Eliminar un registro
    async function deleteEtiqueta(id) {
        try {

            const config = {
                method: 'DELETE',
            }
            const url = process.env.NEXT_PUBLIC_MIDDLE_URL + `/etiquetas/${id}`;
            const data = await getMiddlewareStatus(url, config);

            if (data) {
                console.log('Registro eliminado exitosamente');
                setCategoria('');
                fetchEtiquetas();
            } else {
                console.error('Error creating archivo:', response.status);
                // Manejar el error adecuadamente según tus necesidades
            }
            // Aquí puedes realizar las acciones correspondientes al enviar el formulario
            handleCancel();

        } catch (error) {
            console.error('Error deleting etiqueta:', error.message);
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

            <div className="container " >
                {/* input y boton para filtrar los datos a traves de la etiqueta */}
                <div className="row justify-content-center" style={{ margin: '20px' }}>
                    <input
                        type="text"
                        value={etiqueta}
                        placeholder="Ingresar Nombre del Contenedor"
                        onChange={(e) => setEtiqueta(e.target.value)}
                    />
                    {/* Pongo los valores unicos */}
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Todas las categorías</option>
                        {categorias.map((opcion, index) => (
                            <option key={index} value={opcion}>{opcion}</option>
                        ))}
                    </select>
                    <button className="btn btn-secondary" onClick={handleFilter}>Filtrar</button>
                </div>

                {(userRole === 'Administrador' || userRole === 'Profesor') && (
                    <div >
                        {/* Botón que permite alternar la visibilidad del formulario */}
                        <button type="submit" className="btn btn-secondary" onClick={openModal}>
                            Crear Contenedor
                        </button>

                        {/* Si showForm es true, muestra el formulario con los campos de entrada 
                        y los botones correspondientes para crear o actualizar un registro */}
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            {/*//Si updateID(un registro exitente) esta disponible ejecutara la updateEtiqueta, sino ejecutara createEtiqueta*/}
                            <form onSubmit={updateId ? updateEtiqueta : createEtiqueta}>
                                <input className="input-group-prepend"
                                    type="text"
                                    name="etiqueta"
                                    placeholder="Ingresar Nombre"
                                    value={formValues.etiqueta}
                                    onChange={handleFormChange}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Ingresar Descripcion"
                                    value={formValues.description}
                                    onChange={handleFormChange}
                                />
                                <input
                                    type="text"
                                    name="categoria"
                                    placeholder="Ingresar Categoria"
                                    value={formValues.categoria}
                                    onChange={handleFormChange}
                                />
                                {/* Si updateID(un registro exitente) esta disponible mostrar 'Actualizar Registro sino mostrara 'Crear Registro' */}
                                <button type="submit" className="btn btn-secondary">{updateId ? 'Actualizar Registro' : 'Crear Registro'}</button>
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                            </form>
                        </Modal>
                    </div>
                )}

                <div className="col-12 d-flex justify-content-center align-items-center">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="square-cell">Nombre</th>
                                <th className="square-cell">Description</th>
                                <th className="square-cell">Categoria</th>
                                <th className="square-cell">Link</th>
                                {(userRole === 'Administrador' || userRole === 'Profesor') && (
                                    <th className="square-cell">Acciones</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((etiqueta) => (
                                <tr key={etiqueta.id}>
                                    <td className="square-cell">{etiqueta.etiqueta}</td>
                                    <td className="square-cell">{etiqueta.description}</td>
                                    <td className="square-cell">{etiqueta.categoria}</td>
                                    <td>
                                        <Link className="btn btn-primary" role="button" href={`/etiqueta/${etiqueta.id}`}>
                                            {etiqueta.etiqueta}
                                        </Link>
                                    </td>
                                    {/* === es para comparar todo incluso el tipo de dato es mas especifico, pero en el ID utilizo == para comparar solo el valor */}
                                    {(userRole === 'Administrador' || (userRole === 'Profesor' && userID == etiqueta.usuario_id)) && (
                                        <td className="square-cell">
                                            <button type="button" className="btn btn-success" onClick={() => setUpdateFormValues(etiqueta)}>Editar</button>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteEtiqueta(etiqueta.id)}>Eliminar</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>

            <Footer />
        </>
    )
}
