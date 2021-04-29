import {Switch,Route,Link,Redirect} from 'react-router-dom'
import MoviesMain from '../movies/movieMain'
import { Button } from '@material-ui/core'

import MembersMain from './members/membersMain'
import { useEffect, useState } from 'react'

function StartPage(props)
{
     const [fullname ,setFullName]=useState()
     useEffect (()=>
     {
          setFullName(window.sessionStorage.getItem("fullname"))
     },[])
    return <div>
            <h1> Hi {fullname} welcome to</h1>
            <h1>Movies -Subscriptions Web Site</h1>
            <Link to='/movies/all'>
            <Button variant="outlined" color="primary">
                 Movies
            </Button>
            </Link>
            <Link to='/members/all'>
            <Button variant="outlined" color="primary">
                 Subscriptions
            </Button> 
            </Link>
            <Link to=''>
            <Button variant="outlined" color="primary" onClick={()=>props.setToken(false)}>
                 Log Out
            </Button>
            </Link>
            <br/>
            <br/>



            <Switch>
                <Route path='/movies' component={MoviesMain}/>
                <Route path='/members' component={MembersMain}/>
                <Redirect exact to='/movies'/>
            </Switch>
            

    </div>
}

export default StartPage;