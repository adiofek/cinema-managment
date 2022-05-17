const axios = require("axios");

const get = (url) => {
  return axios.get(url);
};

const getById = (url, id) => {
  return axios.get(url + id);
};

const addItem = (url, obj) => {
  return axios.post(url, obj);
};

const updateItem = (url, id, obj) => {
  return axios.put(url + id, obj);
};

const deleteItem = (url, id) => {
  return axios.delete(url + id);
};

module.exports = { get, getById, addItem, updateItem, deleteItem };
