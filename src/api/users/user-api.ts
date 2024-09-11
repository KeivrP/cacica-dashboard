import axios from 'axios';

export async function getUsers() {
    try {
        const response = await axios.get("https://cacica-backend.onrender.com/api/v1/usuarios");

            return response.data; // Retorna los datos directamente
        
    } catch (error) {
        console.error(`Error en la llamada a la API: ${error.message}`);
        throw error; // Vuelve a lanzar el error para que lo maneje el llamador
    }
}
