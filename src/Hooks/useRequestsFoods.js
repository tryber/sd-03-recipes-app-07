import { useEffect, useState } from 'react';
import axios from 'axios';
import { foodsRequests } from '../Services/requestsAPI';

const useRequestsFoods = () => {
  const [foods, setFoods] = useState([]);
  const [requesting, setRequesting] = useState(true);
  // const [isFood, setIsFood] = useState(true);

  useEffect(() => {
    foodsRequests().then(
      axios.spread((...index) => {
        const { data: { meals } } = index[0]; setFoods(meals);
        const { data } = index[1]; setFoods(data);
        setRequesting(false);
      }),
    );
  }, []);

  return {
    foods,
    requesting,
  };
};

export default useRequestsFoods;
// console.log('nova requisicao', index);

// const useRequests = (request) => {
//   const [recipes, setRecipes] = useState([]);
//   const [err, setErr] = useState('');
//   const [isRequesting, setIsRequesting] = useState(false);

//   useEffect(() => {
//     // Make request to endpoint and handles isRequesting
//     const requestData = () => {
//       setIsRequesting(true);
//       request().then(
//         // success
//         (res) => {
//           setRecipes(res);
//           setIsRequesting(false);
//         },
//         // Failure
//         (res) => {
//           setErr(res);
//           setIsRequesting(false);
//         },
//       );
//     };
//     requestData();
//     // component will unmount
//     return () => {
//       setIsRequesting(false);
//       setRecipes([]);
//     };
//   }, [request]);

//   return {
//     recipes,
//     err,
//     isRequesting,
//   };
// };
