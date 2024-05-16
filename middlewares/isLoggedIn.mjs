const isLoggedIn = ((req,res,next)=>{
    if(!req.user) return res.status(401).send({Message : "Please login first!"})
    next();
})

export default isLoggedIn;