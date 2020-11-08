import React from 'react';
import { getStatementFields } from '../../../../Config/StatementFields';
import { getFilterFields } from '../../../../Config/StatementFilters';
import DataTable from './Components/DataTable/DataTable';
import EditorModal from './Components/EditorModal/EditorModal';
import ExpenseTally from './Components/ExpenseTally/ExpenseTally';
import DataFilter from './Components/Filter/DataFilter';
import PaginationButtons from './Components/Pagination/PaginationButtons';

const maxNumberOfButtons = 5;
const recordsPerPageOptions = [10, 20, 50, 100];

class StatementsTab extends React.Component {

    constructor(props) {
        super(props);

        const filterInitialFieldsState = {};
        getFilterFields().forEach(field => filterInitialFieldsState[field.key] = '');

        this.state = {
            displayedPage: 1,
            transactionsPerPage: recordsPerPageOptions[0],
            transactions: props.transactions,
            filteredTransactions: props.transactions,
            displayedTransactions: [],
            sort: {
                sortField: getStatementFields()[0].key,
                isSortOrderAscending: getStatementFields()[0].defaultSortOrderAscending,
            },
            filter: { filterFields: getFilterFields(), filterFieldsState: filterInitialFieldsState },
        }
    }

    componentDidMount() { this.updateDisplayedTransactions(this.state.transactions, 1) }

    updateDisplayedTransactions(filteredTransactions, pageNumber) {
        const indexOfLastTransaction = pageNumber * this.state.transactionsPerPage;
        const indexOfFirstTransaction = indexOfLastTransaction - this.state.transactionsPerPage;
        const displayedTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
        this.setState({ filteredTransactions: filteredTransactions, displayedPage: pageNumber, displayedTransactions: displayedTransactions });
    }

    render() {
        return (
            <div>
                {this.state.editTransaction &&
                    <EditorModal
                        modalHeader='Update Record'
                        fields={this.state.filter.filterFields}
                        transaction={this.state.editTransaction}
                        callbackAction={this.editTransactionComplete.bind(this)}
                    />
                }

                <DataFilter
                    filterFields={this.state.filter.filterFields}
                    filterData={this.state.filter.filterFieldsState}
                    transactions={this.state.transactions}
                    filter={this.applyFilter.bind(this)}
                    clear={this.clearAllFilters.bind(this)}
                />

                <PaginationButtons
                    selectedPage={this.state.displayedPage}
                    recordsCount={this.state.filteredTransactions.length}
                    recordsPerPage={this.state.transactionsPerPage}
                    paginate={this.applyPage.bind(this)}
                    updateRecordsPerPage={this.updateTransactionsPerPage.bind(this)}
                    maxNumberOfButtons={maxNumberOfButtons}
                    recordsPerPageOptions={recordsPerPageOptions}
                />

                <ExpenseTally
                    records={this.state.filteredTransactions}
                />

                <DataTable
                    records={this.state.displayedTransactions}
                    fields={getStatementFields()}
                    sortField={this.state.sort.sortField}
                    isSortOrderAscending={this.state.sort.isSortOrderAscending}
                    sort={this.applySort.bind(this)}
                    onRecordClick={(transaction) => this.setState({ editTransaction: Object.assign({}, transaction) })}
                />

                <ExpenseTally
                    records={this.state.filteredTransactions}
                />

                <PaginationButtons
                    selectedPage={this.state.displayedPage}
                    recordsCount={this.state.filteredTransactions.length}
                    recordsPerPage={this.state.transactionsPerPage}
                    paginate={this.applyPage.bind(this)}
                    updateRecordsPerPage={this.updateTransactionsPerPage.bind(this)}
                    maxNumberOfButtons={maxNumberOfButtons}
                    recordsPerPageOptions={recordsPerPageOptions}
                />

            </div>
        )
    }

    applySort = (newSortField) => {
        //Evaluate sort order
        const newSortOrderAscending = (newSortField.key === this.state.sort.sortField) ? !this.state.sort.isSortOrderAscending : newSortField.defaultSortOrderAscending;
        //Update sort state
        const sortState = this.state.sort;
        sortState.sortField = newSortField.key;
        sortState.isSortOrderAscending = newSortOrderAscending;
        this.setState({ sort: sortState }, () => {
            //Apply sort
            const result = this.state.filteredTransactions;
            newSortField.sort(result, newSortOrderAscending);
            this.updateDisplayedTransactions(result, 1);
        });
    }

    applyFilter = (newFilterField, value) => {
        //Update filter state
        const filterState = this.state.filter;
        filterState.filterFieldsState[newFilterField.key] = value;
        this.setState({ filter: filterState }, () => {
            //Apply all filters
            let result = this.state.transactions;
            filterState.filterFields.forEach(filterField => {
                const filterValue = filterState.filterFieldsState[filterField.key];
                if (filterValue !== '') { result = filterState.filterFields.find(f => f.key === filterField.key).filter(result, filterValue) }
            });
            this.updateDisplayedTransactions(result, 1);
        });
    }

    clearAllFilters = () => {
        const filterInitialFieldsState = {};
        getFilterFields().forEach(field => filterInitialFieldsState[field.key] = '');
        this.setState({ filter: { filterFields: getFilterFields(), filterFieldsState: filterInitialFieldsState } },
            () => this.updateDisplayedTransactions(this.state.transactions, 1))
    }

    applyPage = (pageNumber) =>
        this.setState({ displayedPage: pageNumber }, () => this.updateDisplayedTransactions(this.state.filteredTransactions, pageNumber));


    updateTransactionsPerPage = (transactionsPerPage) =>
        this.setState({ transactionsPerPage: transactionsPerPage }, () => this.updateDisplayedTransactions(this.state.filteredTransactions, 1));

    editTransactionComplete(transaction, updateForAllTransactions) {
        // Close the modal for save or close
        this.setState({ editTransaction: null });

        // Closing the modal will send null transaction
        if (transaction) {
            const transactions = this.state.transactions;
            let originalPayee;
            transactions.forEach(t => {
                if (t.id === transaction.id) {
                    originalPayee = t.payee;
                    t.category = transaction.category;
                    t.payee = transaction.payee;
                    t.displayPayee = transaction.payee ? transaction.payee : '---No Payee Specified---';
                }
            });
            if (updateForAllTransactions) {
                transactions.forEach(t => {
                    if (t.payee === originalPayee) {
                        t.category = transaction.category;
                        t.payee = transaction.payee;
                        t.displayPayee = transaction.payee;
                    }
                });
            }

            this.setState({ transactions: transactions });
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }
    }

}

export default StatementsTab;
