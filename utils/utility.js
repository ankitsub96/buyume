let sendError=({res, code, message, data})=>{
  return res.status(code).send({
    success:false,
    message,
    data
  })
}
let sendSuccess=({res, code, message, data})=>{
  return res.status(code).send({
    success:true,
    message,
    data
  })
}
module.exports={
  sendError, 
  sendSuccess
}