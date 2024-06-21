const products=require('../model/monthmodel')
async function searchMonth(req,res){
    try{
    
    if(req.headers.month==0){
        console.log(await products.find().skip(req.headers.page*10).limit(10))
        console.log(req.headers.month)
    res.json(await products.find().skip(req.headers.page*10).limit(10))
    }
    else{
        res.json(await products.aggregate([
            {
                $addFields:{
                            convertedDate:{$toDate:"$dateOfSale"}
                            }
            },
            {
                $addFields:{
                    month:{$month:"$convertedDate"}

                }
            },
            {
                $match:{"month":+req.headers.month}
            }
            

        ]))
    }



}    
    catch(err){
        console.log(err)
        res.json(err)
    }

}
async function selectedMonth(req,res){
    console.log(req.headers.month)
   const selectedMonth= await products.aggregate([
        {
            $addFields:{
                        convertedDate:{$toDate:"$dateOfSale"}
                        }
        },
        {
            $addFields:{
                month:{$month:"$convertedDate"}

            }
        },
        {
            $match:{"month":+req.headers.month}
        }
        

    ])
let totalSale=0
   const soldItems= selectedMonth.reduce((x,product)=>{
            if(product.sold===true){
                totalSale=totalSale+product.price
                return x+1

            }
            return x
    },0)
  
    console.log(totalSale)
    res.json({"sold":soldItems,"notSold":selectedMonth.length-soldItems,"sale":totalSale})

}
// async function selected
module.exports={searchMonth,selectedMonth}
