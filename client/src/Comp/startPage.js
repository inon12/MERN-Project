import {Switch,Route,Link,Redirect} from 'react-router-dom'
import MoviesMain from '../movies/movieMain'
import { Button, Container, Grid } from '@material-ui/core'
import MembersMain from './members/membersMain'
import { useEffect, useState } from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Using Inline Styling
const useStyles = makeStyles((theme) => ({
     root: {
       flexGrow: 1,
     },
     space: {
       marginRight: theme.spacing(2),
     },
     
   }));
   
function StartPage(props)
{
     const classes = useStyles();

     const [fullname ,setFullName]=useState()
     useEffect (()=>
     {
          setFullName(localStorage.getItem("fullname"))
     },[])
    return <div className={classes.root}>
          <AppBar position="sticky">
          <Toolbar variant="dense">
               <Typography className={classes.space} variant="h6" color="inherit">
               Movie Subscription
               </Typography>
               <Container style={{width: 'auto'}}>
                    <Link to='/movies/all'>
                    <Button variant="text" style={{color: 'white'}}>
                         Movies
                    </Button>
                    </Link>
               
                    <Link to='/members/all' >
                    <Button variant="text" style={{color: 'white'}}>
                         Subscriptions
                    </Button> 
                    </Link>
               </Container>
               Hey {fullname},
               <Link to=''>
               <Button  variant="text" style={{color: 'white'}} onClick={()=>props.setToken(false)}>
                    Log Out
               </Button>
               </Link>
          </Toolbar>
          </AppBar>
                              <Switch>
                                   <Route path='/movies' component={MoviesMain}/>
                                   <Route path='/members' component={MembersMain}/>
                                   <Redirect exact to='/movies'/>
                              </Switch>
            

           </div>
}

export default StartPage;