import { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  // Update list of pokemon
  useEffect(() => {
    setLoading(true);
    let cancel;

    const getPokemonList = async () => {
      const res = await axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      setLoading(false);

      setNextPageUrl(res.data.next);
      setPreviousPageUrl(res.data.previous);
      setPokemonList(
        res.data.results.map((pokemon) => {
          return {
            id: getPokemonIdFromUrl(pokemon.url),
            ...pokemon,
          };
        })
      );
    };

    getPokemonList();

    return () => cancel();
  }, [currentPageUrl]);

  // Get individual pokemon objects for each pokemon in the list
  useEffect(() => {
    const getPokemon = async () => {
      const pokemonDataFromServer = [];

      await Promise.all(
        pokemonList.map((pokemon) => {
          return axios.get(pokemon.url).then((response) => {
            pokemonDataFromServer.push(response.data);
          });
        })
      );

      pokemonDataFromServer.sort((p1, p2) => p1.id - p2.id);
      setPokemonData(pokemonDataFromServer);
    };

    getPokemon();
  }, [pokemonList]);

  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const goToPreviousPage = () => {
    setCurrentPageUrl(previousPageUrl);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <PokemonList pokemonData={pokemonData} pokemonList={pokemonList} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
      />
    </>
  );
}

function getPokemonIdFromUrl(url) {
  const urlSegments = url.split("/");
  // Handle trailing backslash
  const pokemonId = urlSegments.pop() || urlSegments.pop();
  return pokemonId;
}

export default App;
