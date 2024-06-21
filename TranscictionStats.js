import React, { useEffect, useState } from 'react'
import axios from 'axios'

const allMonths=['selectMonth','Jan','Feb',"Mar","Apr","May","Jun",'July',"Aug","Sept","Oct","Nov","Dec"]

function TranscictionStats({month}) {
    const [selectedMonthStats,setSelectedMonthStats]=useState({
        "Total sale":0,
        "Ttal sold item":0,
        "Total not Sold item":0
    })
    console.log(month)
    useEffect(()=>{
        async function f(){
            const res=await axios.get('http://localhost:5000/month',{'headers':{'month':month}})
            setSelectedMonthStats(res.data)
            console.log(res.data)
        }
        f()
    },[month])
  return (<>
  <h1>{allMonths[month]}</h1>
  <h1>Total Sale{selectedMonthStats.sale}</h1>
  <h1>Total Sold item:{selectedMonthStats.sold}</h1>
  <h1>Total Not Sold item:{selectedMonthStats.notSold}</h1>

  </>
  )
}

export default TranscictionStats
