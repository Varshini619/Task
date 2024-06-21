import React from 'react'
import { useEffect, useState } from "react"
import TableRow from "./TableRow"
import axios from 'axios'
import TranscictionStats from "./TranscictionStats"
const allMonths=['selectMonth','Jan','Feb',"Mar","Apr","May","Jun",'July',"Aug","Sept","Oct","Nov","Dec"]
function App() {
  const [products,setProducts]=useState([])
  const [month,setMonth]=useState(3)
  const [searchKeyWord,setSearchKeyWord]=useState("")
  const [pages,setPages]=useState(0)

  useEffect(()=>{
    
    (async ()=>{
      const responce=await axios.get('http://localhost:5000/month',{"headers":{"page":pages,"search":searchKeyWord,"month":month}})
     
      setProducts(responce.data)
      console.log("ok")

    })()
 
  },[pages,searchKeyWord,month])
  
  function handleSearchKeyWord(event){
    setPages(0)
    setSearchKeyWord(event.target.value)
  }
  function handlePages(Index){
    setPages((prev)=>{
      if((Index===-1 && prev===0)|| (Index===1 &&products.length<10)){
        return prev
      }
      return prev+Index
    });

  }
  function handleMonth(event){
    setMonth(event.target.value)
    console.log(event.target.value)

  }
  return (
    <>
    <input placeholder="Search" onChange={handleSearchKeyWord} value={searchKeyWord}></input>
    <select onChange={handleMonth} defaultValue={3}>
      {
        allMonths.map((month,index)=>{
          return <option value={index} key={month}>{month}</option>
        })
      }
      
    </select>
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Title</td>
          <td>Description</td>
          <td>price</td>
          <td>Category</td>
          <td>Sold</td>
          <td>Image</td>
        </tr>
      </thead>
      <tbody>
        {products.map((product)=>{
          return <TableRow product={product} key={product._id}></TableRow>
        })}
      </tbody>
    </table>
    {pages!==0 && <button onClick={()=>handlePages(-1)}>prev</button>}
    {products.length===10&&<button onClick={()=>handlePages(1)}>next</button>}
    { <TranscictionStats key={month} month={month===0?3:month} ></TranscictionStats> }
    
    </>
  )
}
export default App
