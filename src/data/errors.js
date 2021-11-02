const msg500 = 'Error 500, intente más tarde ';
const msg404 = 'Error 404, intente más tarde ';
const msgUn = 'Error no identificado, intente más tarde ';
const msgServer = 'Error de lógica, intente más tarde ';
const msgDB = 'Error CBDH'; //CREAR BASE DE DATOS HIJA

export const post = {
  postC500: msg500 + '(Creación de post)',
  postC404: msg404 + '(Creación de post)',
  postCUn: msgUn + '(Creación de post)',

  postR500: msg500 + '(Ver posts)',
  postR404: msg404 + '(Ver posts)',
  postRUn: msgUn + '(Ver posts)',
};

export const errorUser = {
  login500: msg500 + '(Iniciar sesión)',
  login404: msg404 + '(Iniciar sesión)',
  loginUn: msgUn + '(Iniciar sesión)',

  reset500: msg500 + '(Recuperar contraseña)',
  reset404: msg404 + '(Recuperar contraseña)',
  resetUn: msgUn + '(Recuperar contraseña)',

  reg500: msg500 + '(Registarse)',
  reg404: msg404 + '(Registarse)',
  regUn: msgUn + '(Registarse)',
  regServ: msgServer + '(Registarse)',

  upd500: msg500 + '(Actualizar usuario)',
  upd404: msg404 + '(Actualizar usuario)',
  updUn: msgUn + '(Actualizar usuario)',
  updServ: msgServer + '(Actualizar usuario)',

  setUpUser500: msg500 + '(Datos usuario)',
  setUpUser404: msg404 + '(Datos usuario)',
  setUpUserUn: msgUn + '(Datos usuario)',
};

export const errorEmployee = {
  create500: msg500 + '(Crear empleado)',
  create404: msg404 + '(Crear empleado)',
  createUn: msgUn + '(Crear empleado)',
  createServer: msgServer + '(Crear empleado)',
};

export const errorTask = {
  read500: msg500 + '(Mostrar tareas)',
  read404: msg404 + '(Mostrar tareas)',
  readUn: msgUn + '(Mostrar tareas)',

  create500: msg500 + '(Crear tarea)',
  create404: msg404 + '(Crear tarea)',
  createUn: msgUn + '(Crear tarea)',
  createDB: msgDB + '(Crear tarea)',

  upd500: msg500 + '(Actualizar tarea)',
  upd404: msg404 + '(Actualizar tarea)',
  updUn: msgUn + '(Actualizar tarea)',
  updDB: msgDB + '(Actualizar tarea)',

  del500: msg500 + '(Eliminar tarea)',
  del404: msg404 + '(Eliminar tarea)',
  delUn: msgUn + '(Eliminar tarea)',
  delDB: msgDB + '(Eliminar tarea)',

  updSta500: msg500 + '(Actualizar estado de tarea)',
  updSta404: msg404 + '(Actualizar estado de tarea)',
  updStaUn: msgUn + '(Actualizar estado de tarea)',
  updStaDB: msgDB + '(Actualizar estado de tarea)',
};
