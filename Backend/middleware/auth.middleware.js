const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');
const Role = require('../utils/userRoles');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtUtils = require('../utils/jwt.utils');

const authUser = (...roles) => {
    return async function (req, res, next) {
        try {
            
           console.log("decoded "+JSON.stringify(req.headers.authorization));
            const decoded = jwtUtils.verifyToken(req.headers.authorization);
            
            const user = decoded.idUser ? 
                await UserModel.findOne({ idUser: decoded.idUser }) :
                null ;

            if (!user) {
                console.log("failed user ");
                
                throw new HttpException(401, 'Authentication failed!');
            }
            
            if(decoded.role != Role.Admin ){

                console.log("user.idUser "+user.idUser+" id : "+req.params.id + " " + " roles : "+JSON.stringify(roles));
                if ( !roles || !roles.includes(user.role)) {
                    throw new HttpException(401, 'Unauthorized');
                }
            }

            console.log(" passe ! ")
            // if the user has permissions
            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }

}

// Est la perssonne qui a la chose (exemple possède catalog)
// const authOwner = (...roles) => {
//     return async function (req, res, next) {
//         try {

//             const user = req.currentUser;

//             if(user.role != "Admin" ){

//                 if (user.idUser != req.params.idUser) {
//                     throw new HttpException(401, 'Unauthorized');
//                 }
//             }

//             if(roles){
                
//             }

//             next();

//         } catch (e) {
//             e.status = 401;
//             next(e);
//         }
//     }

// }



module.exports =  { authUser };