import React from 'react';
import Modal from 'react-modal';
import { getTabMenu } from '../../Config/TabMenu';
import TabBar from './Components/TabBar';
import StatementsTab from './Tabs/Statements/StatementsTab';
import CategoryStatisticsTab from './Tabs/Statistics/CategoryStatisticsTab';
import ExpenseSummaryTab from './Tabs/Summary/ExpenseSummaryTab';

class TransactionsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedTab: getTabMenu()[0].code,
            transactions: JSON.parse(localStorage.getItem('transactions'))
        }
        this.handleUnload = this.handleUnload.bind(this);
    }

    /** Code to warn user about unsaved changes - BEGINS */
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);
        Modal.setAppElement('body');
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleUnload);
    }
    handleUnload(e) {
        var dialogText = 'All unsaved changes will be lost';
        e.returnValue = dialogText;
        return dialogText;
    }
    /** Code to warn user about unsaved changes - ENDS */

    render() {
        const getCurrentTab = () => {
            switch (this.state.selectedTab) {
                case 'SUMMARY': return <ExpenseSummaryTab transactions={this.state.transactions} />
                case 'STATEMENTS': return <StatementsTab transactions={this.state.transactions} />
                case 'CATEGORIES': return <CategoryStatisticsTab transactions={this.state.transactions} />
                default: return 'SUMMARY';
            }
        }

        return (
            <div>
                <TabBar
                    tabs={getTabMenu()}
                    selectedTab={this.state.selectedTab}
                    transactions={this.state.transactions}
                    callback={(tab) => this.setState({ selectedTab: tab })} />
                {getCurrentTab()}
            </div>
        )
    }

}

export default TransactionsPage;
