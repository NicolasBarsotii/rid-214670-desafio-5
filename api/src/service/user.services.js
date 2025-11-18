import usersRepositories from '../repositeries/users.repositories.js';
import userRepository from '../repositeries/users.repositories.js';
import {generateJWT} from './auth.service.js'
import bcrypt from 'bcrypt';

async function createUSerService(newUser){
    const foundUser = await userRepository.findUserByEmailRepository(newUser.email)
    if (foundUser) throw new Error ('User alredy exist!')

    const passHash = await bcrypt.hash(newUser.password, 10)
    const user = await userRepository.createUSerRepositories({...newUser, password: passHash})
    if (!user) throw new Error('Error creating User');

     const userByEmail = await userRepository.findUserByEmailRepository(newUser.email)

    const token = generateJWT(user.id)
    return token;
}

async function findAllUserService() {
    const users = await userRepository.findAllUserRepository();
    return users;
}

async function findUserByIdService(id){
    const user= await userRepository.findUserByIdRepository(id);
    if (!user) throw new Error('User not found')
    return user
}

async function updateUserService(newUser, userId) {
    const user = await usersRepositories.findUserByIdRepository(userId);
    if (!user) throw new Error ('user not found')
        if(newUser.password) {
            newUser.password = await bcrypt.hash(newUser.password, 10)
        }

        const userUpdated = userRepository.updateUserRepository(userId, newUser)
        return userUpdated
}

async function deleteUserService(userId){
   const user = await userRepository.findUserByIdRepository(userId);
   if (!user) throw new Error ('User not found');
   const {message} = await userRepository.deleteUserRepository(userId);
   return message;
}

export default{
    createUSerService,
    findAllUserService,
    findUserByIdService,
    updateUserService,
    deleteUserService
}