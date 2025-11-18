import jwt from 'jsonwebtoken'
import 'dotenv/config'
import usersRepositories from '../repositeries/users.repositories.js';
import bcrypt from 'bcrypt'

function generateJWT(id){
    return jwt.sign({id},process.env.SECRET_JWT, {expiresIn:'24h'});
}

 async function loginService(email, password){
   const user =  usersRepositories.findUserByEmailRepository(email)
   if(!user) throw new Error('Invalid user')

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error("Invald user");
    return token = generateJWT(user.id)
    
}

export {generateJWT, loginService};