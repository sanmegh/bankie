import { getCategoryPack } from "../Config/CategoryPack";

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function enrichTransactionData(transactions, currency) {
    transactions.forEach(transaction => {
        const year = transaction.date.substring(0, 4);
        const month = transaction.date.substring(5, 7);
        const dateOfMonth = transaction.date.substring(8);

        transaction['displayDate'] = dateOfMonth + ' ' + monthNames[month - 1] + ' ' + year;
        transaction['displayMonth'] = monthNames[month - 1] + ' ' + year;
        transaction['displayAmount'] = (transaction.amount < 0) ? '- ' + currency + transaction.amount * -1 : currency + transaction.amount;

        transaction['payee'] = transaction['payee'].replace(/-/g, ' ').replace(/\*/g, '').replace(/  +/g, ' ').trim();
        transaction['displayPayee'] = transaction['payee'] ? transaction['payee'] : '---No Payee Specified---';

        transaction['category'] = 'Unknown';
        const payee = transaction.payee.toUpperCase();
        getCategoryPack().forEach(category => {
            category.payeeList.forEach(categoryPayee => {
                if (payee.includes(categoryPayee)) {
                    transaction['category'] = category.name;
                    return;
                }
            });
        });
    });
}

export default enrichTransactionData;
