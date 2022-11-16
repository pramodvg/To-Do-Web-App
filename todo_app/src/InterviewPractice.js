import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function InterviewPractice() {
const [people,setPeople] = useState([])
    //https://randomuser.me/api/?results-20
   const  getData = ()=>{
      return axios.get("https://randomuser.me/api/?results=20")
       .then((result)=>{
        const {results} = result.data
        return results
       })
       .catch((err)=>{
        console.log(err)
       })
    }

    useEffect(()=>{
        getData().then(result=>{
          console.log(result)

          setPeople(result)
        })
    },[])

  return (
    <div>
     
      {
       
          people.map((data,index)=>{
            return(
              <p>{data.name.first}</p>
            )
          })
      }
    </div>
  )
}
