import aibLogo from '../Resources/bank-logos/aib.png';
import hdfcLogo from '../Resources/bank-logos/hdfc.png';
import hsbcLogo from '../Resources/bank-logos/hsbc.png';
import iciciLogo from '../Resources/bank-logos/icici.png';
import lloydsLogo from '../Resources/bank-logos/lloyds.png';
import paypalLogo from '../Resources/bank-logos/paypal.png';
import sbiLogo from '../Resources/bank-logos/sbi.png';
import bankieLogo from '../Resources/bankie_logo.png';

const banks = [
    {
        'code': 'BANKIE',
        'name': 'BANKIE',
        'logo': bankieLogo,
        'supportedFileExtensions': ['bankie'],
    },
    {
        'code': 'IRL_AIB',
        'name': 'AIB',
        'country': 'IRL',
        'logo': aibLogo,
        'supportedFileExtensions': ['csv'],
    },
    {
        'code': 'IND_HDFC',
        'name': 'HDFC',
        'country': 'IND',
        'logo': hdfcLogo,
        'supportedFileExtensions': ['csv', 'qif', 'xls'],
    },
    {
        'code': 'GBR_HSBC',
        'name': 'HSBC',
        'country': 'GBR',
        'logo': hsbcLogo,
        'supportedFileExtensions': ['csv'],
    },
    {
        'code': 'IND_ICICI',
        'name': 'ICICI',
        'country': 'IND',
        'logo': iciciLogo,
        'supportedFileExtensions': ['xls'],
    },
    {
        'code': 'GBR_LLOYDS',
        'name': 'LLOYDS',
        'country': 'GBR',
        'logo': lloydsLogo,
        'supportedFileExtensions': ['qif'],
    },
    {
        'code': 'IND_SBI',
        'name': 'SBI',
        'country': 'IND',
        'logo': sbiLogo,
        'supportedFileExtensions': ['xlsx'],
    },
    {
        'code': 'PAYPAL',
        'name': 'Paypal',
        'country': 'GBR',
        'logo': paypalLogo,
        'supportedFileExtensions': ['csv'],
    },
];

export function getBankCurrency(bank) {
    switch (bank.country) {
        case 'IND': return '₹';
        case 'IRL': return '€';
        case 'GBR': return '£';
        default: if (bank.code !== 'BANKIE') return '';
    }
}

export function getBanks() {
    return banks;
}
