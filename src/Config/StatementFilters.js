import { getCategoryNames } from "./CategoryPack"

function getMonthOptions(transactions) {
    transactions.sort((a, b) => a.date.localeCompare(b.date));
    const months = [];
    transactions.forEach(t => {
        const month = t.displayMonth;
        if (months.indexOf(month) === -1) { months.push(month) }
    });
    return months;
}

export function getFilterFields() {
    return [
        {
            title: 'Mode',
            key: 'mode',
            filter: (transactions, value) => { return transactions.filter(t => (value === 'Incoming' && t.amount > 0) || (value === 'Outgoing' && t.amount < 0)) },
            type: 'select',
            options: ['Incoming', 'Outgoing'],
            style: { width: '80px' },
        },
        {
            title: 'Month',
            key: 'month',
            filter: (transactions, value) => { return transactions.filter(t => t.displayDate.endsWith(value)) },
            type: 'select',
            options: getMonthOptions(JSON.parse(localStorage.getItem('transactions'))),
            style: { width: '80px' },
        },
        {
            title: 'Category',
            key: 'category',
            filter: (transactions, value) => { return transactions.filter(t => t.category === value) },
            type: 'select',
            options: getCategoryNames(),
            style: { width: '120px' },
        },
        {
            title: 'Payee',
            key: 'payee',
            filter: (transactions, value) => { return transactions.filter(t => t.payee.toLowerCase().includes(value.toLowerCase())) },
            type: 'text',
            style: { width: '200px' },
        }
    ];
}
