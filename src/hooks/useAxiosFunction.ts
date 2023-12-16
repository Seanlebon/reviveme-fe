import { useEffect, useState } from 'react';
import {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
} from 'axios';
import defaultAxiosInstance from '../apis/reviveme';

const useAxiosFunction = (
  axiosInstance: AxiosInstance = defaultAxiosInstance,
) => {
  const [response, setResponse] = useState<any[] | any>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [controller, setController] = useState<AbortController>();

  const axiosFetch = async (
    config: AxiosRequestConfig,
    setterFunctions: Array<(data: any) => void> = [],
  ) => {
    setLoading(true);
    const ctrl = new AbortController();
    setController(ctrl);

    await axiosInstance
      .request(config)
      .then((res: AxiosResponse) => {
        console.log('useAxiosFunction Response:', res);
        setResponse(res.data);
        setterFunctions?.forEach((func) => func(res.data));
      })
      .catch((err: AxiosError) => {
        console.log('useAxiosFunction Error:', err.message, err.response?.data);
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
