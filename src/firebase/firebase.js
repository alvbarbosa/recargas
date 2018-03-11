
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCw2GgyF4SBOGxJdaJt0VNv-icxMEqaczA",
  authDomain: "recargas-b89c9.firebaseapp.com",
  databaseURL: "https://recargas-b89c9.firebaseio.com",
  projectId: "recargas-b89c9",
  storageBucket: "recargas-b89c9.appspot.com",
  messagingSenderId: "735267004756"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database()

const errFirebase = code => {
  let mess = ""
  switch (code) {
    case "auth/invalid-email":
      mess = "Correo Electronico invalido"
      break;
    case "auth/user-not-found":
      mess = "No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado."
      break;
    case "auth/email-already-in-use":
      mess = "El correo electronico ya esta en uso."
      break;
    case "auth/weak-password":
      mess = "La contraseña no es lo suficientemente fuerte"
      break;
    case "auth/user-disabled":
      mess = "El usuario esta deshabilitado"
      break;
    case "auth/wrong-password":
      mess = "La contraseña no es válida para el correo electrónico dado."
      break;
    default:
      console.log(code);
      mess = "Error en el servidor"
      break;
  }
  return mess
}

export {
  auth,
  errFirebase,
  database
};