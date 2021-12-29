import axios from 'axios'

import authHeader from '../services/authHeader '

const getMovies = () =>
{
    return axios.get("http://localhost:8000/api/movies/", { headers: authHeader() })
}
const getMovie = (id) =>
{
    return axios.get("http://localhost:8000/api/movies/"+id,{ headers: authHeader() })
}
const postMovie = (data) =>
{
    return axios.post("http://localhost:8000/api/movies/",data,{ headers: authHeader() })
}
const putMovie = (id,data) =>
{
    return axios.put("http://localhost:8000/api/movies/"+id,data,{ headers: authHeader() })
}      
const deleteMovie = (id) =>
{
    return axios.delete("http://localhost:8000/api/movies/"+id,{ headers: authHeader() })
}

export default {getMovie,getMovies,postMovie,putMovie,deleteMovie}