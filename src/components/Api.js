import axios from "axios";

const getPokemonList = async (url) => {
  const response = await axios.get(url);

  response.data.results = response.data.results.map((pokemon) => {
    return { id: getPokemonIdFromUrl(pokemon.url), ...pokemon };
  });

  return response.data.results;
};

const getPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const getPokemonIdFromUrl = (url) => {
  const urlSegments = url.split("/");
  // Handle trailing backslash
  const pokemonId = urlSegments.pop() || urlSegments.pop();
  return pokemonId;
};

const getJapaneseName = async (id) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return response.data.names[0].name;
};

export { getPokemonList, getPokemonDetails, getJapaneseName };
