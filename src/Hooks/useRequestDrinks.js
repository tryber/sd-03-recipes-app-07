import { useState, useEffect } from 'react';
import axios from 'axios';
import { drinksRequests } from '../Services/requestsAPI';

const useRequestDrinks = () => {
  const [beverages, setBeverages] = useState([]);
  const [requesting, setRequesting] = useState(true);
  useEffect(() => {
    drinksRequests().then(
      axios.spread((...index) => {
        const data = index[0].data.drinks; setBeverages(data);
        setRequesting(false);
      }),
    );
  }, []);

  return {
    beverages,
    requesting,
  };
};

export default useRequestDrinks;
