import '../scss/styles.scss'
import 'regenerator-runtime/runtime'

const cardContainer = document.querySelector('.__card-container');

const pokemons_number = 890;
const colors = {
  fire: '#fddfdf',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();

  createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('__card');

  const poke_types = pokemon.types.map(type => type.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  const experience = pokemon.base_experience
  const attack = pokemon.stats[1].base_stat
  const defense = pokemon.stats[2].base_stat
  const specialAttack = pokemon.stats[3].base_stat

  pokemonCard.style.backgroundColor = color;

  const pokeInnerHTML = `
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />

        <div class="__card-name">
            <p>${name} <span>${experience}xp</span> </p>
        </div>

        <div class="__card-stats">
          <div class="__attack"> <p>${attack}</p> <span> Ataque </span> </div>
          <div class="__special-attack"> <p>${specialAttack}</p> <span> Ataque Especial </span> </div>
          <div class="defense"> <p>${defense}</p> <span> Defensa </span> </div>
        </div>
    `;

  pokemonCard.innerHTML = pokeInnerHTML;

  cardContainer.appendChild(pokemonCard);
}

fetchPokemons();