
import {Switch,Route,Link,Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import AllMovies from './MoviesComp'
import EditMovie from './EditMovie';
import AddMovie from './addMovie';


function MoviesMain(){

  
    return (
        <div>
      
            <Link to='/movies/all'>
            <Button variant="outlined" color="primary">
                 All Movies
            </Button>
            </Link>
            <Link to='/movies/addmovie/'>
            <Button variant="outlined" color="primary">
                 Add Movie
            </Button> 
            </Link>
 
            <Switch>
               <Route path='/movies/all/:id' component={AllMovies}  />
                <Route path='/movies/all/' component={AllMovies}  />
                <Route path='/movies/editMovie/:id' component={EditMovie}  />
                <Route path='/movies/addmovie/' component={AddMovie}  />
                <Redirect exact to='/movies/all/'/>
            </Switch>
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
            {/* <Switch>
                <Route exact  path='/movies/all/'  to={AllMovies} />
                <Route   path='/movies/all/'  to={AllMovies} />
                <Route  path='/movies/all' to={AllMovies} />
             </Switch>   
             <Redirect  to='/movies/all/'  />
            
              <Switch>
                    <Route  path={props.match.path} component={AllMovies}/>
                   <Route path='/movies/add' component={AddMovie}/>
                    <Route path='/movies/edit/:id' component={EditMovie}/>
                    <Route path='/movies/all/' component={AllMovies}/>
                    <Redirect to='/movies/all/'/>
                </Switch> */}
                

        </div>
    )
}
export default MoviesMain;