import {useState, useEffect} from 'react'

const useAxios = (configObj) =>{
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try{
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.singal
                });
                console.log(res);
                setResponse(res.data);
            } catch(err){
                console.log(err.message);
                setError(err.message);
            } finally{
                setLoading(false);
            }
        };

        fetchData()
        // userEffect cleanup function
        return () => controller.abort()
    },[])
    
    return [response, error, loading]
}

export default useAxios