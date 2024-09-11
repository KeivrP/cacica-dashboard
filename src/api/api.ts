import axios from 'axios';

console.log(import.meta.env.VITE_REACT_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => 
    // Puedes agregar headers o modificar la configuración aquí si es necesario
     config
  ,
  (error) => {
    console.error(`Error en la solicitud: ${error.message}`);
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => 
    // Aquí puedes realizar modificaciones en la respuesta si es necesario
     response
  ,
  (error) => {
    console.error(
      `Error en la respuesta: ${error.response ? error.response.status : error.message}`
    );
    return Promise.reject(error);
  }
);

export default api;
