import { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import { getPokemonList } from "./components/Api.js";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  // Update list of currently displayed pokemon
  useEffect(() => {
    setLoading(true);

    getPokemonList(currentPageUrl).then((data) => {
      setLoading(false);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setPokemonList(data.results);
    });
  }, [currentPageUrl]);

  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const goToPreviousPage = () => {
    setCurrentPageUrl(previousPageUrl);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <PokemonList pokemonList={pokemonList} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
      />
    </>
  );
}

export default App;
