import axios from 'axios';

//starting url for requests to the movie db
const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

export default instance;
