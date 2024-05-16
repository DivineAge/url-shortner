
const logOut = (req, res) => {
   
        req.logout((err) => {
            if (err) return res.status(500).send({ Message: "An error occrured on DivDiv's end!" })
            res.status(200).send({ Message: "User logged out successfully!" })
        })
    
}
export default logOut;