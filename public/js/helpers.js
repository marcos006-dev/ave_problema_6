/**
 * Verifica si un string contiene letras mayusculas
 * @param {String}
 * @returns {boolean}
 */
export const obtenerPokemon = async (nombre) => {
  try {
    if (typeof nombre !== 'string')
      throw Error('El nombre deberia ser un string');

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    const { id } = await response.json();
    return id;
  } catch (error) {
    console.log(error);
  }
};
