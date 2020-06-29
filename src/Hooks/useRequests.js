import { useEffect, useState } from 'react';

const useRequests = (request) => {
  const [recipes, setRecipes] = useState([]);
  const [err, setErr] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    // Make request to endpoint and handles isRequesting
    const requestData = () => {
      setIsRequesting(true);
      request().then(
        // success
        (res) => {
          setRecipes(res);
          setIsRequesting(false);
        },
        // Failure
        (res) => {
          setErr(res);
          setIsRequesting(false);
        },
      );
    };
    requestData();
    // component will unmount
    return () => {
      setIsRequesting(false);
      setRecipes([]);
    };
  }, [request]);

  return {
    recipes,
    err,
    isRequesting,
  };
};

export default useRequests;
