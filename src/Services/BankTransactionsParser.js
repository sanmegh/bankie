export function extractHsbcUkCsv(fileContent, transactions, index) {
    fileContent.shift();
    fileContent.pop();

    fileContent.forEach(line => {
        const transaction = { 'id': ++index };
        const values = line.split(',');
        const dateStr = values[0];
        transaction['date'] = dateStr.substring(6) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2);
        transaction['payee'] = values[2];
        transaction['amount'] = parseFloat(values[3].replace('-£', '-').replace('+£', '').replace(',', ''));
        if (transaction.date && transaction.amount) transactions.push(transaction);
    });
}

export function hdfcIndiaCsv(fileContent, transactions, index) {
    fileContent.shift();

    fileContent.forEach(line => {
        line = line.trim();
        if (line && line.length !== 0) {
            const values = line.split(',');
            const transaction = { 'id': ++index };
            const dateStr = values[0].trim();
            transaction['date'] = '20' + dateStr.substring(6) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2);
            transaction['payee'] = values[1];
            transaction['amount'] = Number.parseFloat(values[3]) !== 0 ? Number.parseFloat(values[3]) * -1 : Number.parseFloat(values[4]);
            if (transaction.date && transaction.amount) transactions.push(transaction);
        }
    });
}

export function hdfcIndiaQif(fileContent, transactions, index) {
    fileContent.shift();

    let transaction = { 'id': ++index };
    fileContent.forEach(line => {
        line = line.trim();
        if (line && line.length !== 0) {
            if (line === '^') {
                if (transaction.date && transaction.amount) transactions.push(transaction);
                transaction = { 'id': ++index };
            } else {
                switch (line.charAt(0)) {
                    case 'D':
                        const dateStr = line.slice(1).trim();
                        transaction['date'] = dateStr.substring(6) + '-' + dateStr.substring(0, 2) + '-' + dateStr.substring(3, 5);
                        break;
                    case 'P':
                        transaction['payee'] = line.slice(1);
                        break;
                    case 'T':
                        transaction['amount'] = Number.parseFloat(line.slice(1).trim());
                        break;
                    default:
                        throw new Error('Unable to parse transaction: ' + line);
                }
            }
        }
    });
}

export function sbiIndiaXls(matrix, transactions, index) {
    let continueReading = true;
    Object.keys(matrix).forEach(row => {
        if (row > 20 && continueReading) {
            const transaction = { 'id': ++index };
            let dateStr = matrix[row]['A'];
            if (dateStr) {
                if (dateStr.includes('*')) {
                    continueReading = false;
                    return;
                }
                dateStr = dateStr.trim();
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                transaction['date'] = (dateStr.substring(7)) + '-' + (months.indexOf(dateStr.substring(3, 6)) + 1) + '-' + dateStr.substring(0, 2);
                transaction['payee'] = matrix[row]['C'];
                transaction['amount'] = Number.parseFloat((matrix[row]['E'] > matrix[row]['F']) ? matrix[row]['E'] * -1 : matrix[row]['F']);
                if (transaction.date && transaction.amount) transactions.push(transaction);
            }
        }
    });
}

export function hdfcIndiaXls(matrix, transactions, index) {
    let continueReading = true;
    Object.keys(matrix).forEach(row => {
        if (row > 18 && continueReading) {
            const transaction = { 'id': ++index };
            const dateStr = matrix[row]['A'];
            if (dateStr) {
                if (dateStr.includes('*')) {
                    continueReading = false;
                    return;
                }
                transaction['date'] = ('20' + dateStr.substring(6)) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2);
                transaction['payee'] = matrix[row]['B'];
                transaction['amount'] = Number.parseFloat(matrix[row]['F'] ? Number.parseFloat(matrix[row]['F']) : Number.parseFloat(matrix[row]['E']) * -1);
                if (transaction.date && transaction.amount) transactions.push(transaction);
            }
        }
    });
}

export function iciciIndiaXls(matrix, transactions, index) {
    Object.keys(matrix).forEach(row => {
        if (row > 11) {
            const transaction = { 'id': ++index };
            const dateStr = matrix[row]['C'];
            if (dateStr) {
                transaction['date'] = dateStr.substring(6) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2);
                transaction['payee'] = matrix[row]['F'];
                transaction['amount'] = Number.parseFloat(matrix[row]['G'] === 0 ? Number.parseFloat(matrix[row]['H']) : Number.parseFloat(matrix[row]['G']) * -1);
                if (transaction.date && transaction.amount) transactions.push(transaction);
            }
        }
    });
}

export function lloydsUkQif(fileContent, transactions, index) {
    fileContent.shift();

    let transaction = { 'id': ++index };
    fileContent.forEach(line => {
        line = line.trim();
        if (line && line.length !== 0) {
            if (line === '^') {
                if (transaction.date && transaction.amount) transactions.push(transaction);
                transaction = { 'id': ++index };
            } else {
                switch (line.charAt(0)) {
                    case 'D':
                        const dateStr = line.slice(1).trim();
                        transaction['date'] = dateStr.substring(6) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2);
                        break;
                    case 'P':
                        transaction['payee'] = line.slice(1);
                        break;
                    case 'T':
                        transaction['amount'] = Number.parseFloat(line.slice(1).trim());
                        break;
                    default:
                        throw new Error('Unable to parse transaction: ' + line);
                }
            }
        }
    });
}

export function aibIrelandCsv(fileContent, transactions, index) {
    fileContent.shift();

    fileContent.forEach(line => {
        line = line.trim();
        if (line && line.length !== 0) {
            const values = line.split(',');
            const transaction = { 'id': ++index };
            const dateStr = values[1];
            transaction['date'] = '20' + dateStr.substring(6) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2);
            transaction['payee'] = values[2].slice(1, -1);
            transaction['amount'] = Number.parseFloat(values[6] === 'Debit' ? Number.parseFloat(values[3]) * -1 : Number.parseFloat(values[4]));
            if (transaction.date && transaction.amount) transactions.push(transaction);
        }
    });
}

export function paypalCsv(fileContent, transactions, index) {
    fileContent.shift();

    fileContent.forEach(line => {
        line = line.trim();
        if (line && line.length !== 0) {
            const values = line.split(',');
            const type = values[4].slice(1, -1);
            if (type === 'Express Checkout Payment') {
                const transaction = { 'id': ++index };
                const dateStr = values[0].slice(1, -1);
                transaction['date'] = dateStr.substring(6) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2);
                transaction['payee'] = values[3].slice(1, -1);
                transaction['amount'] = Number.parseFloat(values[7].slice(1, -1));
                if (transaction.date && transaction.amount && transaction.payee) transactions.push(transaction);
            }
        }
    });
}
