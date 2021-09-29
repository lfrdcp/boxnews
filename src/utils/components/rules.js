export const rules = {
  empty: (v) => !!v || `El campo no puede estar vacio`,
  minimumEight: (v) => v.length > 7 || `Como minimo son 8 dígitos`,
  email: (v) => /.+@.+\..+/.test(v) || `El correo debe ser valido`,
  onlyFourCharacters: (v) => v.length === 4 || `Deben ser 4 dígitos`,
};
