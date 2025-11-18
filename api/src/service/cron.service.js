import cron from 'node-cron'
import loanRepositories from '../repositeries/loan.repositories.js'
import moment from 'moment';
import sendEmail from '../service/email.service.js'

cron.schedule('11 * * * *', async () =>{
console.log('Running daily job to check for due dates...');
const loans = await loanRepositories.findAllLoansRepository();
const today = moment().startOf('day')

loans.forEach(async(loan) =>{
    const dueDate = moment(loan.dueDate).startOf('day')
    const remainderDueDate = moment(dueDate).subtract(1,'days')
    if (today.isSame(remainderDueDate)){
        sendEmail(userLoan.email, bookLoan.title, loan.dueDate)
    }
    })
})