import { useEffect, useState } from 'react';

const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const {
      axiosInstance,
      method,
      url,
      requestConfig = {},
      setterFunctions = [],
    } = configObj;
    setLoading(true);
    const ctrl = new AbortController();
    setController(ctrl);

    await axiosInstance[method.toLowerCase()](url, {
      ...requestConfig,
      signal: ctrl.signal,
    })
      .then((res) => {
        console.log('useAxiosFunction Response:', res);
        setResponse(res.data);
        setterFunctions?.forEach((func) => func(res.data));
      })
      .catch((err) => {
        console.log('useAxiosFunction Error:', err.message);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(controller);
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
