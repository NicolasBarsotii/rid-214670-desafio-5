import userServices from '../service/user.services.js'
import {loginService} from '../service/auth.service.js'

async function createUSerController (req, res) {
    const newUser = req.body

    try{
        const user = userServices.createUSerService(newUser);
        res.status(201).send({token})
    } catch (err) {
        console.log('Cheguei aqui')
        return res.status(400).send(err.message)
    }
}

async function loginUSerController (req, res) {
    const {email, password} = req.body

    try{
        const token = await loginService(email, password);
        res.send({token})
    } catch (e) {
      res.status(400).send(e.message)
    }
}

async function findAllUserController(res, req){
    try{
        const users = await userServices.findAllUserService();
        res.send({ users })
    } catch(e) {
        return res.status(404).send(e.message)
    }
}

async function findUserByIdController(res, req){
    const {id} = req.parasm;

    try{
        const user = await userServices.findUserByIdService(id);
        res.send({ user })
    } catch (e){
        return res.status(404).send(e.message)
    }
}

async function updateUserController(req, res) {
    const {id} = req.parasm;
    const newUser = req.body

    try{
        const user = await userServices.updateUserService(newUser, id)
        res.send({user})
    } catch (e){
        res.status(400).send(e.message)
    }
}

async function deleteUserController(req, res) {
    const {id} = req.parasm;
    
    try{
        const message = await userServices.deleteUserService(id)
        res.send({user})
    } catch (e){
        res.status(400).send(e.message)
    }
}

export default {
    createUSerController,
    findAllUserController,
    findUserByIdController,
    updateUserController,
    deleteUserController,
    loginUSerController
}