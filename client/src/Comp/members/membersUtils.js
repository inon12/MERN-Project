import axios from 'axios'
import authHeader from '../services/authHeader '

const getMembers = () =>
{
    return axios.get("http://localhost:8000/api/members/",{headers : authHeader() })
}
const getMember = (id) =>
{
    return axios.get("http://localhost:8000/api/members/"+id,{headers : authHeader() })
}
const postMembers = (data) =>
{
    return axios.post("http://localhost:8000/api/members/",data,{headers : authHeader() })
}
const putMembers = (id,data) =>
{
    return axios.put("http://localhost:8000/api/members/"+id,data,{headers : authHeader() })
}      
const deleteMembers = (id) =>
{
    return axios.delete("http://localhost:8000/api/members/"+id,{headers : authHeader() })
}

export default {getMembers,getMember,postMembers,putMembers,deleteMembers}