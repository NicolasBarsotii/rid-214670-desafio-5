import 'dotenv/config'
import jwt from 'jsonwebtoken';
import userService from '../service/user.services.js'

export function authMiddlewares(req, res, next) {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).send({message: "The token was not informed!"})
    }

    const partsToken = tokenHeader.split(' ')
    if (partsToken.length !== 2) {
        return res.status(401).send({message: "Invalid token"})
    }

    const [schema, tokenJWT] = partsToken

    if(!/^Bearer$/i.test(schema)){
        return res.status(401).send({message: "Malformatted token"})
    }

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded)=>{
        if(err) {
            return res.status(401).send({message: "Invalid token"})
        }

        const user = await userService.findUserByIdService(decoded.id)
        if(!user || !user.id){
            return res.status(401).send({message: "invalid token"})
        }

        req.userId = user.id

        return next()
    } )

}