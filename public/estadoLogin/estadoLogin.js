//import {Usuario} from "../usuario.js";
let isLoggedIn = false;



export const setLoggedIn = (value) => {
  isLoggedIn = value;

  sessionStorage.setItem('isLoggedIn', value.toString());
};


export const getLoggedIn = () => {

  return isLoggedIn || sessionStorage.getItem('isLoggedIn') === 'true';
};


export const logout = () => {
  isLoggedIn = false;
  sessionStorage.setItem('isLoggedIn', "false");
  sessionStorage.setItem("usuarioLogado", "");
  sessionStorage.setItem('end', "");
};

export const getUsuarioLogado = () =>
{
  return sessionStorage.getItem("usuarioLogado");
}

export const setUsuarioLogado = (email) =>
{
  sessionStorage.setItem("usuarioLogado", email)
}
