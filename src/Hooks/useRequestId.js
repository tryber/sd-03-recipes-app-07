import axios from 'axios';
import { useEffect, useState } from 'react';

const useRequestId = (path, id) => {
  const [recipe, setRecipe] = useState({});
  const [requesting, setRequesting] = useState(true);
  const [recomendations, setRecomendations] = useState({});

  useEffect(() => {
    if (path.includes('comidas')) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((data) => {
          setRecipe(data.data);
          axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
            .then((recomData) => { setRecomendations(recomData.data); setRequesting(false); });
        });
    } else {
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((data) => {
          setRecipe(data.data);
          axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            .then((recomData) => { setRecomendations(recomData.data); setRequesting(false); });
        });
    }
  }, [path, id]);

  return { recipe, recomendations, requesting };
};

export default useRequestId;
