import React from 'react';

export function getError(err) {
    let params = err.split('|');
    switch (params[0]) {
        case 'NO_FILE_UPLOADED':
            return <label>No bank files uploaded.</label>
        case 'INVALID_FILE_FORMAT':
            return <label>Invalid file format: {params[1]}</label>
        case 'FORMAT_NOT_SUPPORTED':
            return <label>.{params[1]} files are not supported for {params[2]}</label>;
        case 'FILE_TOO_LARGE':
            return <label>File too large: {params[1]}</label>
        case 'PDF_UPLOADED':
            return <label>Please use transaction exports (not bank statements) via Netbanking.
                <br /> These are usually CSV/QIF/Excel files.</label>
        case 'FILE_READ_FAILURE':
            return <label>Unable to read file {params[1]}</label>
        case 'DATA_CORRUPTED':
            return <label>The file {params[1]} may have been corrupted!</label>
        case 'NO_TRANSACTIONS':
            return <label>No transactions found in file {params[1]}!</label>
        default:
            console.log('Unexpected error occurred: ' + err);
            return <label>Something went wrong. Please contact Support.</label>
    }
}
