import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './DataTable.css';

function DataTable(props) {

    return (
        <table>
            <thead className="sortableHeaderBar">
                <tr>
                    {
                        props.fields.map(field =>
                            <th
                                key={'th-' + field.key}
                                style={field.headerStyle}
                                onClick={() => props.sort(field)}>
                                {field.title}

                                {
                                    props.sortField === field.key && props.isSortOrderAscending &&
                                    <FontAwesomeIcon size={'1x'} className='SortIcon' icon={faCaretUp} />
                                }
                                {
                                    props.sortField === field.key && !props.isSortOrderAscending &&
                                    <FontAwesomeIcon size={'1x'} className='SortIcon' icon={faCaretDown} />
                                }
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.records.map(record => (
                        <tr className='Clickable DataRecord' key={record.id} onClick={() => props.onRecordClick(record)}>
                            {
                                props.fields.map(field =>
                                    <td key={record.id + '-' + field.key} style={field.recordStyle}>{record[field.attributeName]}</td>
                                )
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )

}

export default DataTable;
