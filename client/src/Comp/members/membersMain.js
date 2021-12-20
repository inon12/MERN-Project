
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Switch,Link,Route,Redirect} from 'react-router-dom'
import AddMember from './addMember';
import AllMembers from './AllMembers';
import EditMember from './editMember';



function MembersMain ()
{
    return (
        <div>
          
          <Grid  class="menu" >
                  <Link to='/members/all'>
                    <Button variant="outlined" color="primary" style={{marginRight : "5px"}}>
                       All Members 
                     </Button>
                  </Link>
                  <Link to='/members/addMember'>
                     <Button variant="outlined" color="primary">
                     Add Member
                    </Button> 
                </Link>
            </Grid>
       
   

      <Switch>
        <Route path="/members/all" component={AllMembers}/>
        <Route path="/members/editMember/:id" component={EditMember}/>
        <Route path="/members/addMember" component={AddMember}/>
        <Redirect exact to='/members/all'/>

      </Switch>
      </div>
    )
    }
export default MembersMain;