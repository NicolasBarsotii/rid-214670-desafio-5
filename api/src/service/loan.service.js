import loanRepositories from "../repositeries/loan.repositories.js";

async function createLoanService(userId, bookId, dueDate){
    const createLoan = await loanRepositories.createLoanRepository(
        userId,
        bookId,
        dueDate
    )
    if (!createLoan) throw new Error('Error creating Loan')
        return createLoan
}

async function findAllLoanService(){
    const loans = await loanRepositories.findAllLoansRepository();
    return loans
}

async function findLoanByIdService(loanId){
    const loan = await loanRepositories.findLoanByIdRepository(loanId)
    if (!loan) throw new Error("Loan not found")
    return loan
}

async function deleteLoanService(loanId, userId) {
    const loan = await loanRepositories.findLoanByIdRepository(loanId)
    if (!loan) throw new Error("Loan not found")
    if (!loan.userId !== userId) throw new Error('Unauthorized')
    const response = await loanRepositories.deleteLoanRepository(loanId)
    return response
}

export default {
    createLoanService,
    findAllLoanService,
    findLoanByIdService,
    deleteLoanService
}