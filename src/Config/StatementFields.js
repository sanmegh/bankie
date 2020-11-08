const statementFields = [
    {
        key: 'date',
        title: 'Date',
        attributeName: 'displayDate',
        headerStyle: { width: '150px', cursor: 'pointer' },
        recordStyle: {},
        sort: (transactions, isAscending) =>
            isAscending ? transactions.sort((a, b) => a.id - b.id) : transactions.sort((a, b) => b.id - a.id),
        defaultSortOrderAscending: false,
    },
    {
        key: 'category',
        title: 'Category',
        attributeName: 'category',
        headerStyle: { width: '150px', cursor: 'pointer' },
        recordStyle: {},
        sort: (transactions, isAscending) =>
            isAscending ? transactions.sort((a, b) => a.category.localeCompare(b.category)) : transactions.sort((a, b) => b.category.localeCompare(a.category)),
        defaultSortOrderAscending: true,
    },
    {
        key: 'payee',
        title: 'Payee',
        headerStyle: { cursor: 'pointer' },
        recordStyle: { textAlign: 'left' },
        attributeName: 'displayPayee',
        sort: (transactions, isAscending) =>
            isAscending ? transactions.sort((a, b) => a.payee.localeCompare(b.payee)) : transactions.sort((a, b) => b.payee.localeCompare(a.payee)),
        defaultSortOrderAscending: true,
    },
    {
        key: 'amount',
        title: 'Amount',
        attributeName: 'displayAmount',
        headerStyle: { width: '150px', cursor: 'pointer' },
        recordStyle: {},
        sort: (transactions, isAscending) =>
            isAscending ? transactions.sort((a, b) => a.amount - b.amount) : transactions.sort((a, b) => b.amount - a.amount),
        defaultSortOrderAscending: true,
    }
]

export function getStatementFields() {
    return statementFields;
}
