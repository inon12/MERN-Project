
import {useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import subUtils from '../subscription/subscriptionsUtils'
import movieUtils from '../../movies/movieUtils'
import memberUtils from './membersUtils'
import {useHistory,Link} from 'react-router-dom'
import * as yup from 'yup';
import { Field,useFormik,FormikProvider } from 'formik';

import DatePicker from "react-datepicker";
import { format} from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css';
import {Card} from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const deleteMember =  async (history,id)=>
{
    await memberUtils.deleteMembers(id)
    history.push('/members')
}
const validationSchema = yup.object(
    {
      movieId : yup.string('choose movie ')
        .required("movie is required!"),
        
        

    }
)


function Member(props)
{
    let history = useHistory();
    const [moviesWatch,setMoviesWatch] = useState([])
    const [moviesNotWatched,setMoviesNotWatched] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [subFlag,setSubFlag]= useState(true)
    const [sub,setSub]= useState(false)


    useEffect(()=>
    {
        async function fetchData() {
            let movies = await subUtils.getSubscriptionsByMember(props.member._id)
            setMoviesWatch(movies)
            
            let flag =false;
            let arr =[]
            let AllMovies = await movieUtils.getMovies()
            AllMovies.data.forEach(item => { 
                movies.forEach(element =>
                    {
                        if(item._id === element.movieId)
                        {
                            flag=true;
                        }
                    })
                    if(!flag)
                    {
    
                        arr.push({movieId : item._id, movieName : item.name})
                   
                    }
                    flag=false;
            });
            setMoviesNotWatched(arr)
        }
        fetchData();
    },[sub])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            movieId: '',
            date: '',
          
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
        console.log({movieId : values.movieId ,date : format(startDate, 'yyyy-MM-dd') ,memberId : props.member._id})
         await subUtils.postSubscription({movieId : values.movieId ,date :  format(startDate, 'yyyy-MM-dd')  ,memberId : props.member._id})

         setSub(!sub)
         
        },
      });
    return (
        <Card elevation={3} style={{width: '98%', margin: '2%'}}>
            
            <Grid container spacing={2}>
               <Grid item xs={4}>
                    <Item><h2>{props.member.fullname}</h2>
                            <img src={props.member.image} style={{height: '220px', maxWidth: '100%',margin: 'auto',display: 'block'}} alt={props.member.name}/>
                            Email:{props.member.email} <br/>
                            City:{props.member.city}  <br/>
                            <Link to={'/members/editMember/'+props.member._id}><Button className={'Button'} variant='contained' color='primary'>Edit</Button></Link>
                            <Link to='/movies/'><Button className={'Button'} variant='contained' color='secondary'onClick={()=>deleteMember(history,props.member._id)}>Delete</Button></Link>
                            </Item>
                </Grid>
                <Grid  item xs={8} >
                    <Item style={{boxShadow : "none"}}>
                        <h2>Movies Watched</h2>
                        <ul>
                            {
                                moviesWatch.map((item,index)=>
                                {
                                    return <li key={index}><Link to={'/movies/all/'+item.movieId}>{item.movieName}</Link> ,{item.date} </li>
                                })
                            }
                        </ul>
                        <Button color="primary" variant="contained"  type="button" onClick={()=> setSubFlag(!subFlag)}>
                                Subscribe to new movie
                        </Button> <br/><br/>
                        <div style={{display : subFlag? 'none' : 'block'}}>
                            <h3>Add new movie</h3>
                            <FormikProvider value={formik}>
                            <form onSubmit={formik.handleSubmit}>
                            <Field as="select" name="movieId">
                                <option disabled value=''>select movie</option>
                                {
                                    moviesNotWatched.map((item,index)=>
                                    {
                                       return <option key={index} value={item.movieId}>{item.movieName}</option>
                                    })
                                }
                            </Field>
                            <br/><br/>
                            <span>Select Date </span> 
                            <DatePicker
                            name="date"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            /><br/><br/>
                            <Button color="primary" variant="contained"  type="submit"  >
                            Subscribe
                            </Button>
                            </form>
                            </FormikProvider>

                        </div>
                    </Item>
                </Grid>
                
            </Grid>
        </Card>
     
    )

}

export default Member;