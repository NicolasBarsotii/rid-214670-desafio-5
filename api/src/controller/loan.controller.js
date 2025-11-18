import loanService from "../service/loan.service.js";

async function createLoanController(req, res){
    const { bookId, dueDate} = req.body
    const userId = req.userId

    try{
        const createLoan = await loanService.createLoanService(
            userId,
            bookId,
            dueDate
        )
    }catch (error){
        res.status(400).send(error.message)
    }
}

async function findAllLoansController(req, res) {
    try{
        const loans = await loanService.findAllLoanService()
        res.send(loans)
    }catch(error){
        res.status(404).send(error.message)
    }
}

async function findLoanByIdController(req, res){
    const loanId = req.params.id

    try{
        const loan = await loanService.findLoanByIdService(loanId)
        return res.send(loan)
    }catch(error){
        return res.status(400).send(error.message)
    }
}

async function deleteLoanController(req, res){
    const loanId = req.params.id
    const userId = req.userId

    try{
        const reponse = await loanService.deleteLoanService(loanId)
        return res.send(reponse)
    }catch(error){
        return res.status(400).send(error.message)
    }
}

export default {
    createLoanController,
    findAllLoansController,
    findLoanByIdController,
    deleteLoanController
}