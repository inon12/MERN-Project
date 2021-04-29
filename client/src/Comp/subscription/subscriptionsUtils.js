import axios from 'axios'
import subUtils from './subscriptionsUtils'
import membersUtils from '../members/membersUtils'
import movieUtils from '../../movies/movieUtils'

const getSubscriptions = () =>
{
    return axios.get("http://localhost:8000/api/subscriptions/")
}
const getSubscription = (id) =>
{
    return axios.get("http://localhost:8000/api/subscriptions/"+id)
}
const postSubscription = (data) =>
{
    return axios.post("http://localhost:8000/api/subscriptions/",data)
}
const putMSubscription = (id,data) =>
{
    return axios.put("http://localhost:8000/api/subscriptions/"+id,data)
}      
const deleteSubscription = (id) =>
{
    return axios.delete("http://localhost:8000/api/subscriptions/"+id)
}
const getSubscriptionsByMovie= async (movieId) =>
{
  
   let result= await subUtils.getSubscriptions()
   let newArr=  result.data.filter(x=> x.movieId=== movieId)
   .map(async (item) =>
    {
         let result= await membersUtils.getMember(item.memberId)
          return {memberId : item.memberId, memberName : result.data.fullname ,date : item.date}
   })
   let result2 = await axios.all(newArr)
   return result2
}
const getSubscriptionsByMember= async (memberId) =>
{
  
   let result= await subUtils.getSubscriptions()
   let newArr=  result.data.filter(x=> x.memberId=== memberId)
   .map(async (item) =>
    {
         let result2= await movieUtils.getMovie(item.movieId)
          return {movieId : item.movieId, movieName : result2.data.name ,date : item.date}
   })
   let result3 = await axios.all(newArr)
    return result3
}
export default {getSubscriptionsByMember,getSubscriptionsByMovie,getSubscriptions,getSubscription,postSubscription,putMSubscription,deleteSubscription}