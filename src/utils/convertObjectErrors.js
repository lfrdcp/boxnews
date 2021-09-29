export const convertObjectErrors = (errorsJson) => {
  let errors = '';
  for (var key of Object.keys(errorsJson)) {
    // SE RECORRE EL JSON DE ERRORES
    errors = errors + errorsJson[key] + ', ';
  }
  return errors;
};
