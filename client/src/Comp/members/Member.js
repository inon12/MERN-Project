
import {useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import subUtils from '../subscription/subscriptionsUtils'
import movieUtils from '../../movies/movieUtils'
import memberUtils from './membersUtils'
import {useHistory,Link} from 'react-router-dom'
import * as yup from 'yup';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import { format} from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css';


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
        <div>
            <h1>{props.member.fullname}</h1>

            Email:{props.member.email} <br/>
            City:{props.member.city}  <br/>

            <div>
                Movies Watched<br/>
                <Button color="primary" variant="contained"  type="button" onClick={()=> setSubFlag(!subFlag)}>
                Subscribe to new movie
                </Button> <br/>
                <div style={{display : subFlag? 'none' : 'block'}}>
                    Add new movie<br/>
                    <form onSubmit={formik.handleSubmit}>
                    <select  name="movieId"
                    value={formik.values.movieId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ display: 'block' }}>
                         <option value=''>select movie</option>
                        {
                            moviesNotWatched.map((item,index)=>
                            {
                                return <option key={index} value={item.movieId}>{item.movieName}</option>
                            })
                        }
                    </select>
                    <DatePicker
                    name="date"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    />
                    <Button color="primary" variant="contained"  type="submit"  >
                    Subscribe
                    </Button>
                    </form>
                </div>
                <ul>
                    {
                        moviesWatch.map((item,index)=>
                        {
                            return <li key={index}><Link to={'/movies/all/'+item.movieId}>{item.movieName}</Link> ,{item.date} </li>
                        })
                    }
                </ul>
            </div>
            <Link to={'/members/editMember/'+props.member._id}>
            <input type="button" value="Edit" />
            </Link>
             <input type="button" value="Delete" onClick={()=>deleteMember(history,props.member._id)}/>
        </div>
    )
}

export default Member;