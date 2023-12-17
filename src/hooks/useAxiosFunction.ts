import { useEffect, useState } from 'react';
import {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
} from 'axios';
import apiAxiosInstance from '../apis/reviveme';

/* 
  useAxiosFunction takes an axios instance as an optional argument, and returns 4 items in an array: [response, error, loading, axiosFetch].
    response: the response data from the axios request (populated after the request successfully resolves)
    error: the error message from the axios request (populated if the request rejects)
    loading: a boolean indicating whether the request is still pending
    axiosFetch: takes two arguments: 
      - config: an axios request config object (see https://axios-http.com/docs/req_config)
      - setterFunctions: an array of setter functions to be called after the request resolves
      examples: 
      
      axiosFetch({
        method: 'GET',
        url: '/api/v1/threads',
      }, [setResponse, setOtherStateVariable])

      axiosFetch({
        method: 'POST',
        url: '/api/v1/threads',
        data: {
          name: 'John Doe',
          email: 'imjohn@gmail.com'
        }
      }, [setResponse, setOtherStateVariable])
*/
const useAxiosFunction = (axiosInstance: AxiosInstance = apiAxiosInstance) => {
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
