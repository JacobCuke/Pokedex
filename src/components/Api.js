import axios from "axios";

const getPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export { getPokemonDetails };
