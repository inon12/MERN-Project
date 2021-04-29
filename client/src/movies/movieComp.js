import {useState,useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import movieUtils from './movieUtils';
import subUtils from '../Comp/subscription/subscriptionsUtils'

const  deleteMovie =async (id,history)=>
{
    await movieUtils.deleteMovie(id)
    history.push('/movies')
}



function Movie(props)
{
    let history = useHistory();
    const [subscriptions,setSubscriptions] = useState([])
    useEffect(()=>
    {
        async function fetchData() {
            setSubscriptions(await subUtils.getSubscriptionsByMovie(props.movie._id))
        }
        fetchData();
    },[])

    return (
    <div style={{border : '2px solid black'}}>
        {props.movie.name} , {props.movie.premiered} <br/>
        geners:
        {
            
            props.movie.genres.map((item,index)=>
            {
                if(props.movie.genres.length!=(index+1))
                {
                    return <span key={index}>{item},</span>
                }
                else
                {
                    return <span key={index}>{item}</span>
                }
            })
        }
        <br/>
        <img src={props.movie.image} style={{width: 100, height: 100}}/>
        <div style={{border : '2px solid black'}}>
                subscriptions watched 
                <ul>
                {
                    subscriptions.map((item,index)=>
                    {
                        return <li key={index}><Link to="/members/all">{item.memberName}</Link>,{item.date} </li>
                    })
                }
                </ul>
        </div>
        <br/>
        <input type="button" value="Edit" onClick={()=> history.push('/movies/editMovie/'+props.movie._id)}/>
        <input type="button" value="Delete" onClick={()=>deleteMovie(props.movie._id,history)}/>

    </div>)

}

export default Movie; 