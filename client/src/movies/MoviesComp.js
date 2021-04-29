import {useState,useEffect} from 'react'
import Movie from './movieComp'
import movieUtils from './movieUtils'
import {useParams} from 'react-router-dom'
import Button from '@material-ui/core/Button';



function AllMovies(){
    const {id} =useParams()
    const [movies,setMovies] = useState([])
    const [getfilter,setGetFilter] = useState("")
    const [filter,setFilter] = useState("")

    useEffect(()=>
    {
        async function fetchData()
       {
            let result =[]
        
            if(id !== undefined)
            {
                result.push((await movieUtils.getMovie(id)).data)
            }
            else
            {
                result =(await movieUtils.getMovies()).data
                if(filter !== "")
                {
                    result =result.filter((item)=>
                    {
                        if(item.name.toLowerCase().includes(filter.toLowerCase()))
                        {
                            return item;
                            
                        }
                    })
                }
            }
            setMovies(result)
        }
        fetchData();
    },[filter])
    return (
        <div>
            Find Movie : <input type="text" onChange={(e)=>{setGetFilter(e.target.value)}}/>
            <Button variant="outlined" color="primary" onClick={()=>setFilter(getfilter)}>
                 Find
            </Button>  
            {
                movies.map((item,index)=>
                {
                    return <Movie key={index} movie={item}></Movie>
                })
            }
          
        </div>
    )
}
export default AllMovies