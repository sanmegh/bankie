import React, { useState } from 'react';
import DataAccuracyWarning from '../../Components/DataAccuracyWarning';
import SummaryChartComponent from './Components/SummaryChartComponent';

function ExpenseSummaryTab(props) {

    const [mergeMode, setMergeMode] = useState(false);

    return (
        <div>
            <table>
                <tbody>

                    <tr>
                        <td colSpan={2}>
                            <input type='checkbox' className='Clickable' onChange={() => setMergeMode(!mergeMode)} />
                            <label>Merge incoming &amp; outgoing expenses</label>
                        </td>
                    </tr>

                    <tr>
                        <td><h4>OUT</h4></td>
                        <td><h4>IN</h4></td>
                    </tr>
                    <tr>
                        <td>
                            <SummaryChartComponent
                                categoryExpenseMap={getCategoryExpenseMap((amount) => { return (amount < 0) })}
                                noTransactionsMessage='No resultant outgoing transactions'
                            /></td>
                        <td>
                            <SummaryChartComponent
                                categoryExpenseMap={getCategoryExpenseMap((amount) => { return (amount > 0) })}
                                noTransactionsMessage='No resultant outgoing transactions'
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <DataAccuracyWarning transactions={props.transactions} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    function getCategoryExpenseMap(isTransationEligible) {
        return mergeMode ? mapMerged(isTransationEligible) : mapSeparated(isTransationEligible)
    }

    function mapMerged(isTransationEligible) {
        const fullMap = {};
        Object.values(props.transactions).forEach(t => {
            const category = t.category;
            const amount = parseFloat(t.amount);
            if (!fullMap.hasOwnProperty(category)) { fullMap[category] = 0.0 }
            fullMap[category] += amount;
        });
        const categoryExpenseMap = {};
        Object.keys(fullMap).forEach(category => {
            if (isTransationEligible(fullMap[category])) {
                categoryExpenseMap[category] = fullMap[category];
            }
        });
        return categoryExpenseMap;
    }

    function mapSeparated(isTransationEligible) {
        const categoryExpenseMap = {};
        Object.values(props.transactions).forEach(t => {
            const category = t.category;
            const amount = parseFloat(t.amount);
            if (isTransationEligible(t.amount)) {
                if (!categoryExpenseMap.hasOwnProperty(category)) { categoryExpenseMap[category] = 0.0 }
                categoryExpenseMap[category] += amount;
            }
        });
        return categoryExpenseMap;
    }

}

export default ExpenseSummaryTab;
