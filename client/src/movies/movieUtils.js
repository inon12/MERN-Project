import axios from 'axios'


const getMovies = () =>
{
    return axios.get("http://localhost:8000/api/movies/")
}
const getMovie = (id) =>
{
    return axios.get("http://localhost:8000/api/movies/"+id)
}
const postMovie = (data) =>
{
    return axios.post("http://localhost:8000/api/movies/",data)
}
const putMovie = (id,data) =>
{
    return axios.put("http://localhost:8000/api/movies/"+id,data)
}      
const deleteMovie = (id) =>
{
    return axios.delete("http://localhost:8000/api/movies/"+id)
}

export default {getMovie,getMovies,postMovie,putMovie,deleteMovie}