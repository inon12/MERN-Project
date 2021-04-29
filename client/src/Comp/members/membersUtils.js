import axios from 'axios'


const getMembers = () =>
{
    return axios.get("http://localhost:8000/api/members/")
}
const getMember = (id) =>
{
    return axios.get("http://localhost:8000/api/members/"+id)
}
const postMembers = (data) =>
{
    return axios.post("http://localhost:8000/api/members/",data)
}
const putMembers = (id,data) =>
{
    return axios.put("http://localhost:8000/api/members/"+id,data)
}      
const deleteMembers = (id) =>
{
    return axios.delete("http://localhost:8000/api/members/"+id)
}

export default {getMembers,getMember,postMembers,putMembers,deleteMembers}