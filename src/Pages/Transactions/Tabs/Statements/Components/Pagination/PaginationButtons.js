import React from 'react';
import './PaginationButtons.css';

function PaginationButtons(props) {

    return (
        <div>
            <span className='PaginationButtonsSet'>
                {getButtons()}
            </span>

            {(props.recordsCount > props.recordsPerPageOptions[0]) &&
                <label>
                    Showing
                        <select
                        className='PaginationRecordsPerPage'
                        value={props.recordsPerPage}
                        onChange={(e) => props.updateRecordsPerPage(Number.parseInt(e.target.value))} >
                        {props.recordsPerPageOptions.map(o => { return <option key={'opt-' + o}>{o}</option> })}
                    </select>
                    records per page
                </label>
            }
        </div>
    )

    function getButtons() {
        const numberOfPages = Math.ceil(props.recordsCount / props.recordsPerPage);
        if (numberOfPages === 1) {
            return [];
        } else {
            if (numberOfPages <= props.maxNumberOfButtons) {
                return updateForMultiplePagesWithinLimit(numberOfPages);
            } else {
                return updateForMultiplePagesCrossingLimit(numberOfPages);
            }
        }
    }

    function updateForMultiplePagesWithinLimit(numberOfPages) {
        const buttons = [];
        for (let i = 1; i <= numberOfPages; i++) {
            let button = getPageButton('btn-page-' + i, i, i, () => props.paginate(i));
            buttons.push(button);
        }
        return buttons;
    }

    function updateForMultiplePagesCrossingLimit(numberOfPages) {
        let startIndex = props.selectedPage;
        let stopIndex = props.selectedPage;
        let buttonCount = 1;
        for (let i = 1; buttonCount < props.maxNumberOfButtons; i++) {
            if (props.selectedPage - i > 0) {
                startIndex = props.selectedPage - i;
                buttonCount++;
            }
            if (props.selectedPage + i <= numberOfPages) {
                stopIndex = props.selectedPage + i;
                buttonCount++;
            }
        }

        const buttons = [];
        if (startIndex > 1) {
            buttons.push(getPageButton('btn-page-first', 1, '<<', () => props.paginate(1)));
        }
        if (props.selectedPage > 1) {
            buttons.push(getPageButton('btn-page-prev', props.selectedPage - 1, '<', () => props.paginate(props.selectedPage - 1)));
        }
        for (let i = startIndex; i <= stopIndex; i++) {
            buttons.push(getPageButton('btn-page-' + i, i, i, () => props.paginate(i)));
        }
        if (props.selectedPage < numberOfPages) {
            buttons.push(getPageButton('btn-page-next', props.selectedPage + 1, '>', () => props.paginate(props.selectedPage + 1)));
        }
        if (stopIndex < numberOfPages) {
            buttons.push(getPageButton('btn-page-last', numberOfPages, '>>', () => props.paginate(numberOfPages)));
        }
        return buttons;
    }

    function getPageButton(key, value, text, onClickListener) {
        return <button
            key={key}
            value={value}
            className={'ButtonPage ' + ((value === props.selectedPage) ? 'ButtonCurrentPage' : '')}
            onClick={onClickListener}>
            {text}
        </button>
    }

}

export default PaginationButtons;
