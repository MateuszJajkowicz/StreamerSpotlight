import { useEffect, useState } from 'react';

const useFetchData = (fetchFunction, dependencies, setStateFunction) => {
  const [fetchingError, setFetchingError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFunction();
        setStateFunction(data);
        setFetchingError('');
      } catch (error) {
        console.error(error);
        setFetchingError('Failed to fetch the streamer.');
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { fetchingError };
};

export default useFetchData;
