import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
type setterFunctionArray = Dispatch<SetStateAction<any>>[];

interface Config {
  axiosInstance: any;
  method: string;
  url: string;
  requestConfig?: Record<string, any>;
  setterFunctions?: setterFunctionArray;
}

const useAxiosFunction = () => {
  const [response, setResponse] = useState<any[] | any>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [controller, setController] = useState<AbortController>();

  const axiosFetch = async (config: Config) => {
    const {
      axiosInstance,
      method,
      url,
      requestConfig = {},
      setterFunctions = [],
    } = config;
    setLoading(true);
    const ctrl = new AbortController();
    setController(ctrl);

    await axiosInstance[method.toLowerCase()](url, {
      ...requestConfig,
      signal: ctrl.signal,
    })
      .then((res: AxiosResponse) => {
        console.log('useAxiosFunction Response:', res);
        setResponse(res.data);
        setterFunctions?.forEach((func) => func(res.data));
      })
      .catch((err: AxiosError) => {
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

  return [response, error, loading, axiosFetch] as const;
};

export default useAxiosFunction;
