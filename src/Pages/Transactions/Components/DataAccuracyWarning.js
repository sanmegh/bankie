import React from 'react';

function DataAccuracyWarning(props) {

    const containsUnknown = (transactions) => transactions.find(t => (t.category === 'Unknown'))

    return (
        containsUnknown(props.transactions) ?
            <p className='ErrorMsg'>
                Results may not be accurate as some transactions are missing categories.
            </p>
            :
            <p>Accuracy is based on categories set on transactions.</p>
    )
}

export default DataAccuracyWarning;
