// import axios from 'axios';
import { useEffect, useState } from 'react';

const useRequestId = (path, id) => {
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState({});
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    if (path.includes('comidas')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecipe(json);
            });
        });
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecomendations(json);
              setRequesting(false);
            });
        });
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecipe(json);
            });
        });
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((res) => {
          res
            .json()
            .then((json) => {
              setRecomendations(json);
              setRequesting(false);
            });
        });
    }
  }, [path, id]);

  return { recipe, recomendations, requesting };
};

export default useRequestId;
