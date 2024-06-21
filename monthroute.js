const express=require('express')
const { searchMonth,selectedMonth } = require('../controller/monthcontroller')
const router=express.Router()
router.get('/month',searchMonth)
router.get('/slectedmonth',selectedMonth)
module.exports=router