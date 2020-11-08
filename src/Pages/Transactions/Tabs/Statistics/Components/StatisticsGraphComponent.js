import React from 'react';
import Bar from 'react-chartjs-2';
import './../CategoryStatisticsTab.css';

function StatisticsGraphComponent(props) {

    return (
        <Bar
            type='bar'
            height={200}
            legend={{ display: false }}
            data={getGraphData()}
            options={{ maintainAspectRatio: false }}
        />
    )

    function getGraphData() {
        const selectedCategory = props.category ? props.category.name : null;
        if (selectedCategory) {
            const filteredTransactions = props.transactions.filter(t => t.category === selectedCategory);
            const monthlyExpensesMap = mapExpensesByMonth(filteredTransactions);

            const xvalues = [];
            const yvalues = [];
            monthlyExpensesMap.forEach(elem => { xvalues.push(elem.month); yvalues.push(elem.amount); });

            return {
                labels: xvalues,
                datasets: [
                    {
                        label: `Expenses towards ${selectedCategory}`,
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                        data: yvalues,
                        fill: true,
                    },
                ],
            };
        }
    }

    function mapExpensesByMonth(filteredTransactions) {
        const records = [];
        props.transactions.forEach(transaction => {
            const month = transaction.displayMonth;
            if (!records.find(record => record.month === month)) {
                records.push({ 'month': month, 'amount': 0.0 })
            }
        });
        filteredTransactions.forEach(transaction => {
            records.find(record => record.month === transaction.displayMonth)['amount'] += parseFloat(transaction.amount);
        });
        records.forEach(record => record.amount = parseFloat(record.amount.toFixed(2)));
        return records;
    }

}

export default StatisticsGraphComponent;
