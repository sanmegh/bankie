import React from 'react';
import './DataFilter.css';

function DataFilter(props) {

    return (
        <table className='MenuBar'>
            <tbody>
                <tr>
                    {
                        props.filterFields.map(field => {
                            return (
                                <td key={'filter-' + field.key}>
                                    <label>{field.title}</label>
                                    <br />
                                    {getCriteria(field, props.filterData[field.key])}
                                </td>
                            )
                        })
                    }
                    <td className='EdgeMenuItem'>
                        <button
                            onClick={() => props.clear()}
                            className='ButtonClearFilter'>
                            Clear
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )

    function getCriteria(field, value) {
        switch (field.type) {
            case 'text':
                return <input style={field.style} value={value} onChange={(e) => { props.filter(field, e.target.value) }} />
            case 'select':
                return (
                    < select style={field.style} value={value} onChange={(e) => props.filter(field, e.target.value)}>
                        <option key={'opt-' + field.key + '-none'} value=''>-</option>
                        {field.options.map(opt => <option key={'opt-' + field.key + '-' + opt}>{opt}</option>)}
                    </select >
                )
            default: return null
        }
    }

}

export default DataFilter;
