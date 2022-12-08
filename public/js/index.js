'use strict';
import { obtenerPokemon } from './helpers.js';

const inputBuscarPokemon = document.getElementById('inputBuscarPokemon');
const btnBuscar = document.getElementById('btnBuscar');
const loading = document.getElementById('loading');
const resultTarjetaPokemon = document.getElementById('resultTarjetaPokemon');

document.addEventListener('DOMContentLoaded', function () {
  btnBuscar.addEventListener('click', async (e) => {
    const buscarPokemon = inputBuscarPokemon.value;

    resultTarjetaPokemon.style.display = 'none';
    if (buscarPokemon.split('').length === 0) {
      alert('Debe ingresar un nombre o un numero para buscar el pokemon');
      return;
    }

    loading.style.display = 'block';
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${buscarPokemon}`
      );

      if (!response.ok) {
        loading.style.display = 'none';
        alert('No se encontro el pokemon ingresado, por favor verifique');
        return;
      }
      const pokemon = await response.json();

      loading.style.display = 'none';
      armarTarjetaPokemon(pokemon);
    } catch (error) {
      console.log(error);
      loading.style.display = 'none';
      alert('Se produjo un error al buscar el pokemon');
    }
  });

  const armarTarjetaPokemon = (pokemon) => {
    const { id, name, types, weight, height, sprites } = pokemon;

    let tipos = '';

    types.forEach(({ type }) => {
      tipos += `<li>${type.name}</li>`;
    });

    const tarjeta = `
              <div class="alert alert-warning password-alert" role="alert">
                  <h4><b id="estado">Pokemon: ${name}</b></h4>
                  <ul class="list-unstyled">
                    <li>
                      <i class="fas fa-check text-success"></i>
                      Número: ${id}.
                    </li>
                    <li>
                      <i class="fas fa-check text-success"></i>
                      Tipos:
                      <ul>
                        ${tipos}
                      </ul>
                    </li>
                    <li>
                      <i class="fas fa-check text-success"></i>
                      Peso: ${weight}.
                    </li>
                    <li>
                      <i class="fas fa-check text-success"></i>
                      Altura: ${height}.
                    </li>
                    <li>
                      <i class="fas fa-check text-success"></i>
                      Imagen:
                      <br />
                      <img src="${sprites.back_default}" alt="${name}" width="200"  height="200"/>
                    </li>
                  </ul>
                </div>`;

    resultTarjetaPokemon.style.display = 'block';
    resultTarjetaPokemon.innerHTML = tarjeta;
  };
});
