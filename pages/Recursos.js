import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';

export default function Recursos() {


    return (

        <>
            <Navbar />

            <header className="py-2 bg-light border-bottom mb-4">
                <div className="container">
                    <div className="text-center my-4 col-lg-4">
                        <div className="card-body">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Buscar asignatura..." aria-label="Enter search term..." aria-describedby="button-search" />
                                <button className="btn btn-primary" id="button-search" type="button">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row">

                    <div className="col-lg-12">


                        <div className="row">
                            <div className="col-lg-4">


                                <div className="card mb-4">
                                    <a href="#!"></a>
                                    <div className="card-body">

                                        <h2 className="card-title h4">Intro al Calculo</h2>
                                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                                        <a className="btn btn-primary" href="#!">Acceder →</a>
                                    </div>
                                </div>

                                <div className="card mb-4">
                                    <a href="#!"></a>
                                    <div className="card-body">

                                        <h2 className="card-title h4">Intro al Algebra</h2>
                                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                                        <a className="btn btn-primary" href="#!">Acceder →</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">

                                <div className="card mb-4">
                                    <a href="#!"></a>
                                    <div className="card-body">

                                        <h2 className="card-title h4">Calculo 1</h2>
                                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                                        <a className="btn btn-primary" href="#!">Acceder →</a>
                                    </div>
                                </div>

                                <div className="card mb-4">
                                    <a href="#!"></a>
                                    <div className="card-body">

                                        <h2 className="card-title h4">Calculo 2</h2>
                                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                                        <a className="btn btn-primary" href="#!">Acceder →</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">

                                <div className="card mb-4">
                                    <a href="#!"></a>
                                    <div className="card-body">

                                        <h2 className="card-title h4">Calculo 1</h2>
                                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                                        <a className="btn btn-primary" href="#!">Acceder →</a>
                                    </div>
                                </div>

                                <div className="card mb-4">
                                    <a href="#!"></a>
                                    <div className="card-body">

                                        <h2 className="card-title h4">Calculo 2</h2>
                                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.</p>
                                        <a className="btn btn-primary" href="#!">Acceder →</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <nav aria-label="Pagination">
                            <hr className="my-0" />
                            <ul className="pagination justify-content-center my-4">
                                <li className="page-item disabled"><a className="page-link" href="#" tabindex="-1" aria-disabled="true"></a></li>
                                <li className="page-item active" aria-current="page"><a className="page-link" href="#!">1</a></li>
                                <li className="page-item"><a className="page-link" href="#!">2</a></li>
                                <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                <li className="page-item disabled"><a className="page-link" href="#!">...</a></li>
                                <li className="page-item"><a className="page-link" href="#!">15</a></li>
                                <li className="page-item"><a className="page-link" href="#!"></a></li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>

            <Footer />

        </>
    )
}
