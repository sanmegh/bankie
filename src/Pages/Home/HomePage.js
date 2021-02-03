import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getBankCurrency } from '../../Config/Banks';
import { getError } from '../../Config/Errors';
import extractTransactions from '../../Services/TransactionsReaderService';
import BankButtonBar from './Components/BankButtonBar/BankButtonBar';
import BankStatementsImporter from './Components/BankStatementsImporter/BankStatementsImporter';

class HomePage extends React.Component {

    constructor() {
        super();
        localStorage.clear();
        this.showError = this.showError.bind(this);
        this.state = {
            bank: null,
            files: null,
            transactions: null,
            error: null,
            showLoader: false,
        }
    }

    render() {
        return (
            <div>
                <BankButtonBar selectedBank={this.state.bank} callback={this.selectBank.bind(this)} />
                <BankStatementsImporter selectedBank={this.state.bank} callback={this.importBankStatements.bind(this)} />

                {
                    this.state.transactions &&
                    <Link to={{ pathname: '/bankie/transactions' }}>
                        <button className='SubmitButton'>SUBMIT</button>
                    </Link>
                }

                {this.state.error && <p className='ErrorMsg'>{getError(this.state.error)}</p>}

                <Modal
                    isOpen={this.state.showLoader}
                    shouldCloseOnOverlayClick={false}
                    shouldCloseOnEsc={false}
                    className='Modal'>

                    <p>Loading...</p>

                </Modal>
            </div >
        )
    }

    selectBank = (bank) => {
        this.setState({ bank: bank, transactions: null, error: null }, () => this.evaluateAndExtract());
        localStorage.setItem('currency', getBankCurrency(bank));
    }

    importBankStatements = (files, error) => {
        this.setState({ files: files, transactions: null, error: null },
            () => error ? this.showError(error) : this.evaluateAndExtract());
    };

    showError = (error) => this.setState({ error: error, showLoader: false });

    evaluateAndExtract = () => {
        localStorage.removeItem('transactions');
        if (this.state.bank && this.state.files) {
            this.setState({ showLoader: true });
            extractTransactions(this.state.bank, this.state.files, this.markImportComplete.bind(this), this.showError)
        }
    }

    markImportComplete = (transactions, currency) => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('currency', currency);
        this.setState({ transactions: transactions, error: null, showLoader: false });
    }

}

export default HomePage;
