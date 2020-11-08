import React from 'react';
import './ExpenseTally.css';

function ExpenseTally(props) {

    return (
        <label className='TotalExpenseMsg'>Total expense from these transactions: {getTotalExpense(props.records)}</label>
    )

    function getTotalExpense(records) {
        let total = 0.0;
        records.map(record => total += record.amount);
        const currency = localStorage.getItem('currency');
        return (total < 0) ? '-' + currency + total.toFixed(2) * -1 : currency + total.toFixed(2);
    }

}

export default ExpenseTally;
