
const logOut = (req, res) => {
   
        req.logout((err) => {
            if (err) return res.status(500).send({ message: "An error occrured on DivDiv's end!" })
            res.status(200).send({ message: "User logged out successfully!" })
        })
    
}
export default logOut;