import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export default {
  recepies: {
    getAll: () => instance.get('/recepies'),
    create: (payload) => instance.post('/', payload),
    update: (payload) => instance.put('/recepies/', payload),
    delete: (id) => instance.delete(`/recepies/${id}`),
    fakeExample: () => axios.get('https://jsonplaceholder.typicode.com/todos/1'),
  },
};
