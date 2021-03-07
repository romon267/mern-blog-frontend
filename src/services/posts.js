import axios from 'axios';

const baseUrl = '/api/posts';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBestPosts = async () => {
  const response = await axios.get(`${baseUrl}/all/best`);
  return response.data;
};

const getByUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/user/${username}`);
  return response.data;
};

const getByUrl = async (url) => {
  const response = await axios.get(`${baseUrl}/url/${url}`);
  return response.data;
};

const create = async (newPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newPost, config);
  console.log('what we get from server:', response.data);
  console.log('Author', response.data.author);
  return response.data;
};

const updateOne = async (id, newPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newPost, config);
  return response.data;
};

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  console.log(`Sending req to delete post ${id}`);
  return response.data;
};

export default {
  getAll,
  getByUsername,
  getByUrl,
  getBestPosts,
  create,
  setToken,
  deleteOne,
  updateOne,
};
