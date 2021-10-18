import {useState,useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import movieUtils from './movieUtils';
import subUtils from '../Comp/subscription/subscriptionsUtils'
import {Grid, Paper } from "@material-ui/core";
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';







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
    <Paper style={{width: '100%', margin: '2%'}}>
      <div id={props.movie._id} className={'anchorShift'}></div>
        <p style={{fontSize: 9, color: "GrayText"}}>{props.movie._id}</p>
        <Grid item container direction='column' spacing={2}>
            <Grid item style={{padding: '1%'}}>
                <Typography variant='h5'>
                    {props.movie.name}, <span >({props.movie.premiered})</span>
                </Typography>
                <Typography variant='subtitle2'>
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
                </Typography>
            </Grid>
            <Grid container spacing={2} >
                <Grid item xs={2} style={{padding: '1%', justifyContent: 'center'}}>
                    <img src={props.movie.image}  alt={props.movie.name}/>
                    <div style={{marginLeft : '26px'}}>
                    <Link to={'/movies/editMovie/'+props.movie._id}><Button  variant='contained' color='primary'>Edit</Button></Link>
                    <Link to='/movies/'><Button  variant='contained' color='secondary'onClick={()=>deleteMovie(props.movie._id,history)} style={{marginLeft : '10px'}}>Delete</Button></Link>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='body2'>
                        <span dangerouslySetInnerHTML={{__html: props.movie.summary}}/>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={'Paper'}>
                    <Typography variant='h6'>
                        users watched:
                    </Typography>
                    <ul>
                    {
                        subscriptions.map((item,index)=>
                        {
                            return <li key={index}><Link to="/members/all">{item.memberName}</Link> , {item.date} </li>
                        })
                    }
                    </ul>    
                  </Paper>
                    </Grid>
                  </Grid>
              </Grid>
        </Paper>
    )

}

export default Movie; 