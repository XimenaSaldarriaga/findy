import axios from 'axios';
const URL_JSON_SERVER = "http://localhost:5000"
export const URL_USERS = `${URL_JSON_SERVER}/users`;
export const URL_POSTS = `${URL_JSON_SERVER}/posts`;
export const URL_COMMENTS = `${URL_JSON_SERVER}/comments`;

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


export const fetchCommentData = async (postId) => {
    try {
        const response = await axios.get(`${URL_COMMENTS}/${postId}`);
        console.log('Commets data:', response.data);
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

export const likePost = async (postId, userId) => {
  try {
    const response = await axios.get(URL_POSTS);
    const postData = response.data;

    const postIndex = postData.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
      if (postData[postIndex].likedUsers.includes(userId)) {
        postData[postIndex].likes--;
        postData[postIndex].likedUsers = postData[postIndex].likedUsers.filter(likedUserId => likedUserId !== userId);
      } else {
        postData[postIndex].likes++;
        postData[postIndex].likedUsers.push(userId);
      }

      await axios.put(`${URL_POSTS}/${postId}`, postData[postIndex]);
      return postData[postIndex];
    }
  } catch (error) {
    console.error('Error updating post likes:', error);
    throw error;
  }
};


