import axios from 'axios';
const URL_JSON_SERVER = "http://localhost:5000"
export const URL_USERS = `${URL_JSON_SERVER}/users`;
export const URL_POSTS = `${URL_JSON_SERVER}/posts`;
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
      const response = await axios.get(`${URL_POSTS}?userId=${userId}`);
      console.log("Post data:", response.data);
      return response.data; 
  } catch (error) {
      console.log('Error obteniendo los datos del post', error);
      return []; 
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

export const followUser = async (followerId, userIdToFollow) => {
  try {
      const response = await axios.post(`${URL_USERS}/${userIdToFollow}/followers`, { followerId });
      return response.data;
  } catch (error) {
      console.error('Error al seguir al usuario', error);
      throw error;
  }
};
