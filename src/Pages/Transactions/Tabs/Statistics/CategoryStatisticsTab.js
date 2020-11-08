import React, { useState } from 'react';
import { getCategoryDetails } from '../../../../Config/CategoryPack';
import DataAccuracyWarning from '../../Components/DataAccuracyWarning';
import './CategoryStatisticsTab.css';
import CategoryBarComponent from './Components/CategoryBarComponent';
import StatisticsGraphComponent from './Components/StatisticsGraphComponent';

function CategoryStatisticsTab(props) {

    const [category, setCategory] = useState(null);

    return (
        <div>
            <CategoryBarComponent selectedCategory={category} categories={getPresentCategories(props.transactions)} callback={(category) => setCategory(category)} />

            {
                category &&
                <div className='BarGraphBlock'>
                    <StatisticsGraphComponent category={category} transactions={props.transactions} />
                    <DataAccuracyWarning transactions={props.transactions} />
                </div>
            }

            {!category &&
                <p>Choose a category to see the related statistics.</p>
            }
        </div>
    )

    function getPresentCategories(transactions) {
        const categories = [];
        transactions.forEach(t => { if (!categories.find(c => c.name === t.category)) categories.push(getCategoryDetails(t.category)) });
        categories.sort((a, b) => a.name.localeCompare(b.name));
        return categories;
    }

}

export default CategoryStatisticsTab;
