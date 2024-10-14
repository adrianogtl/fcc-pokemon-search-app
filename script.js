const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-button");
const pokemonNameEl = document.querySelector("#pokemon-name");
const pokemonIdEl = document.querySelector("#pokemon-id");
const weightEl = document.querySelector("#weight");
const heightEl = document.querySelector("#height");
const spriteEl = document.querySelector("#sprite");
const typesEl = document.querySelector("#types");
const hpEl = document.querySelector("#hp");
const attackEl = document.querySelector("#attack");
const defenseEl = document.querySelector("#defense");
const specialAttackEl = document.querySelector("#special-attack");
const specialDefenseEl = document.querySelector("#special-defense");
const speedEl = document.querySelector("#speed");
const pokemonApiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchData = async (nameOrId) => {
  try {
    const res = await fetch(`${pokemonApiUrl}/${nameOrId}`);
    const data = await res.json();
    showPokemonInfo(data);
  } catch {
    alert("Pokémon not found.");
  }
};

// The execution starts here
searchBtn.addEventListener("click", () => {
  searchPokemon();
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchPokemon();
  }
});

const validateInput = () => {
  const alphaRegex = /[A-Z]/gi;
  return alphaRegex.test(searchInput.value)
    ? searchInput.value.toLowerCase()
    : parseInt(searchInput.value);
};

const showPokemonInfo = (data) => {
  const {
    height,
    id,
    name,
    weight,
    types,
    stats,
    sprites: { front_default },
  } = data;

  // Name and ID
  pokemonNameEl.textContent = name.toUpperCase();
  pokemonIdEl.textContent = `#${id}`;

  // Size
  heightEl.textContent = `Height: ${height}`;
  weightEl.textContent = `Weight: ${weight}`;

  // Sprite
  spriteEl.src = front_default;
  spriteEl.alt = name;

  // Clear previous type elements
  typesEl.innerHTML = "";

  // Types
  types.forEach((element) => {
    const type = element.type;
    typesEl.innerHTML += `<span class="${
      type.name
    }">${type.name.toUpperCase()}</span>`;
  });

  // Stats
  const statsArr = [];
  const baseArr = [
    hpEl,
    attackEl,
    defenseEl,
    specialAttackEl,
    specialDefenseEl,
    speedEl,
  ];

  stats.forEach((element) => {
    statsArr.push(element.base_stat);
  });

  baseArr.forEach((base, i) => {
    base.textContent = statsArr[i];
  });
};

const searchPokemon = () => {
  const nameOrId = validateInput();
  fetchData(nameOrId);
};
