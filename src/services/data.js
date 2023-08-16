import axios from 'axios';
const URL_JSON_SERVER = "http://localhost:5000"
export const URL_USERS = `${URL_JSON_SERVER}/users`;
const URL_POSTS = `${URL_JSON_SERVER}/posts`;
const URL_COMMENTS = `${URL_JSON_SERVER}/comments`;

export const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`${URL_USERS}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos de usuario', error);

  }
};

export const fetchPostData = async (userId) => {
    try {
        const response = await axios.get(`${URL_POSTS}/${userId}`);
        console.log("Post data:", response.data);
        return response.data; 
    } catch (error) {
        console.log('Error obteniendo los datos del post', error);
    }
    
}; 

export const fetchCommentData = async (commentId) => {
    try {
        const response = await axios.get(`${URL_COMMENTS}/${commentId}`);
        return response.data;
    } catch (error) {
        console.log('Error obteniendo los comentarios del post', error);
    }
};
