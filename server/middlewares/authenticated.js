require ("dotenv").config();
const jwt = require("jsonwebtoken");
const  User = require('../models/user')


module.exports =  
    function(req, res, next){ 
        
        // console.log(req.headers,'====')
        const { acces_token }= req.headers;
        if(acces_token) {
            const authenticated = jwt.verify(acces_token, process.env.SECRET);
            if(authenticated) {
                req.currentUserid = authenticated;
                // console.log(req.body.currentUserid)
                //FIND
                next();
            } else {
            res.status(400).json({
                msg: `Access token invalid`
            })
            }
        } else {
            res.status(400).json({
                msg: `Access token not found`
            })
        }
    }
