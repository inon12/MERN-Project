import {useState,useEffect} from 'react'
import Member from './Member'
import membersUtils from './membersUtils'



function AllMembers()
{

    const [members,setMembers] =useState([])
    useEffect(()=>
    {
        async function fetchData() {
            let result = await membersUtils.getMembers()
            setMembers(result.data);
        }
        fetchData();
    },[])

    return (
        <div>
            {
                members.map((item,index)=>
                {
                    return <Member key={index} member={item} />
                })
            }
        </div>
    )


}

export default AllMembers;