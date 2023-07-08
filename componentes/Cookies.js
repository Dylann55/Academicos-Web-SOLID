import Cookies from 'js-cookie'
import Router from 'next/router';

export const setCookies = async (decoded) => {
  Cookies.set('sesion', decoded.result.data.session.access_token, { expires: 7 });
  Cookies.set('usuario_id', decoded.id, { expires: 7 });
  console.log('Ha ingresado correctamente');
};

export const removeCookies = async () => {
  Cookies.remove('sesion');
  Cookies.remove('usuario_id');
  Router.push('/');
}

export const checkSession = async () => {
  if (document.cookie.indexOf('sesion') === -1) {
    console.log('No se estableció conexión');
    Router.push('/');
  } else {
    console.log('Existe conexión');
  }
};