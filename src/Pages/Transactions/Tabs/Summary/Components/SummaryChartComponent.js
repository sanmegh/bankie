import React from 'react';
import Bar from 'react-chartjs-2';
import { findCategory } from '../../../../../Config/CategoryPack';

function SummaryChartComponent(props) {

    const data = getData(props.categoryExpenseMap);

    return (
        data.datasets[0].data.length ?
            <Bar
                data={data}
                height={300}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { position: 'bottom', onClick: (e) => e.stopPropagation() }
                }} />
            : <p>{props.noTransactionsMessage}</p>
    )

    function getData(categoryExpenseMap) {
        const categories = [];
        const values = [];
        const colors = [];
        Object.keys(categoryExpenseMap).forEach(cat => {
            categories.push(cat);
            values.push(categoryExpenseMap[cat].toFixed(2));
            colors.push(findCategory(cat).color);
        });
        return { labels: categories, datasets: [{ fill: true, data: values, backgroundColor: colors }] };
    }

}

export default SummaryChartComponent;
