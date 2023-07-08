import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';

const inter = Inter({ subsets: ['latin'] })


export default function Acerca() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-5 bg-info">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 text-center ">
                <img ></img>
              </div>
              <div className="col-12 col-md-6 text-center text-md-left align-self-md-center ">
                <h1 className="display-4 font-weight-bold text-light">¿Con que objetivo?</h1>
                <p className="text-light text-center">El objetivo de su proyecto biblioteca es
                  proporcionar a los estudiantes recursos y documentos que les
                  permitan repasar y practicar lo aprendido en años anteriores.
                  Esto se debe a que, a menudo, los estudiantes necesitan revisar
                  el material que han aprendido previamente para consolidar su conocimiento
                  y prepararse para futuros desafíos académicos. </p>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-dark">.</div>
        <section className="py-4 bg-secondary text-center text-white">

          <div className="container">
            <div className="row">
              <div className="col-12">
                <img ></img>
                <p className="h2">Sobre nosotros</p>
                <p className="h4 font-italic">Un equipo conformado de estudiantes
                  para innovar ideas que puedan ser de gran ayuda para los demas estudiantes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
