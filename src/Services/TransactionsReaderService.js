import XLSX from 'xlsx';
import { getBankCurrency } from '../Config/Banks';
import { getStatementFields } from '../Config/StatementFields';
import { aibIrelandCsv, extractHsbcUkCsv, hdfcIndiaCsv, hdfcIndiaQif, hdfcIndiaXls, iciciIndiaXls, lloydsUkQif, paypalCsv, sbiIndiaXls } from './BankTransactionsParser';
import enrichTransactionData from './TransactionEnricher';

const fileSizeLimit = 999000;

function extractTransactions(bank, files, successCallback, errorCallback) {
    try {
        validate(bank, files);
    } catch (err) {
        errorCallback(err.message);
        return;
    }

    const transactions = [];
    let index = 0;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filename = file.name;
        const filetype = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();

        const reader = new FileReader();
        reader.onload = event => {
            let currency;
            const fileContent = event.target.result;
            const lines = [];
            try {
                if (bank.code === 'BANKIE') {
                    const bankieData = JSON.parse(fileContent);
                    currency = bankieData.currency;
                    transactions.push.apply(transactions, JSON.parse(bankieData.transactions));
                } else {
                    currency = getBankCurrency(bank);
                    parseDataBasedOnFileType(filetype, fileContent, lines);
                    parseDataBasedOnBank(bank.code, filetype, lines, transactions, index);
                    enrichTransactionData(transactions, currency);
                }

                if (transactions.length > 0) {
                    const defaultField = getStatementFields()[0];
                    defaultField.sort(transactions, defaultField.defaultSortOrderAscending);
                    successCallback(transactions, currency);
                } else {
                    errorCallback(`NO_TRANSACTIONS|${filename}`);
                }
            } catch (err) {
                console.log(`Error: ${err.message}`);
                errorCallback(`DATA_CORRUPTED|${filename}`);
            }
        };
        reader.onerror = function (err) { console.log(`Failed to read file: ${err}`); errorCallback(`FILE_READ_FAILURE|${filename}`); };
        if (filetype.includes('xls')) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsText(file);
        }
    }
}

function validate(bank, files) {
    if (!files || files.length === 0) {
        throw new Error(`NO_FILE_UPLOADED`);
    }
    for (let i = 0; i < files.length; i++) {
        const filename = files[i].name;
        if (!filename.includes('.')) {
            throw new Error(`INVALID_FILE_FORMAT|${filename}`);
        }
        const fileExtension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        if (fileExtension === 'pdf') {
            throw new Error(`PDF_UPLOADED`);
        }
        if (files[i].size > fileSizeLimit) {
            throw new Error(`FILE_TOO_LARGE|${filename}`);
        }
        if (!bank.supportedFileExtensions.includes(fileExtension)) {
            throw new Error(`FORMAT_NOT_SUPPORTED|${fileExtension}|${bank.name}`);
        }
    }
}

function parseDataBasedOnFileType(filetype, fileContent, lines) {
    switch (filetype) {
        case 'csv':
        case 'qif':
            fileContent.split('\n').forEach(line => {
                line = line.trim();
                if (line && line.length !== 0) { lines.push(line) }
            });
            break;

        case 'xls':
        case 'xlsx':
            const workbook = XLSX.read(fileContent, { type: 'binary' });
            workbook.SheetNames.forEach(function (sheetName) {
                const sheet = workbook.Sheets[sheetName];
                const matrix = {};
                Object.keys(sheet).forEach(cell => {
                    const column = cell.substring(0, 1);
                    const row = Number.parseInt(cell.substring(1));
                    if (!matrix[row]) { matrix[row] = {} }
                    matrix[row][column] = sheet[cell].v;
                });
                Object.keys(matrix).forEach(row => { lines.push(matrix[row]) });
            })
            break;
        default:
            throw new Error('Unknown file extension encountered: ' + filetype);
    }
}

function parseDataBasedOnBank(bankCode, filetype, lines, transactions, index) {
    switch (bankCode) {

        case 'GBR_HSBC':
            switch (filetype) {
                case 'csv': extractHsbcUkCsv(lines, transactions, index); break;
                default: throw new Error('Unknown file extension encountered for GBR_HSBC: ' + filetype);
            }
            break;

        case 'IND_HDFC':
            switch (filetype) {
                case 'qif': hdfcIndiaQif(lines, transactions, index); break;
                case 'csv': hdfcIndiaCsv(lines, transactions, index); break;
                case 'xls': hdfcIndiaXls(lines, transactions, index); break;
                default: throw new Error('Unknown file extension encountered for IND_HDFC: ' + filetype);
            }
            break;

        case 'IND_ICICI': iciciIndiaXls(lines, transactions, index); break;

        case 'GBR_LLOYDS': lloydsUkQif(lines, transactions, index); break;

        case 'IRL_AIB': aibIrelandCsv(lines, transactions, index); break;

        case 'IND_SBI': sbiIndiaXls(lines, transactions, index); break;

        case 'PAYPAL': paypalCsv(lines, transactions, index); break;

        default: throw new Error('Unknown bank code encountered: ' + bankCode);
    }
}

export default extractTransactions;
