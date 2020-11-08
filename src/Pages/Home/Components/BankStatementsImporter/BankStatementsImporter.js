import React from 'react';

function BankStatementsImporter(props) {

    return (
        props.selectedBank
        &&
        <div>
            <p>Add export files ({props.selectedBank.supportedFileExtensions.toString()})</p>

            <input
                id='inpFileUpload'
                type='file'
                onChange={event => props.callback(event.target.files)} />
        </div>
    )

}

export default BankStatementsImporter;
