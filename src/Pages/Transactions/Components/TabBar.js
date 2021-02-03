import { faArrowCircleLeft, faCheck, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import './TabBar.css';

const exportFileName = 'export.bankie';

function TabBar(props) {

    const [state, setState] = useState({ showConfirmBackAction: false });

    return (
        <table className='MenuBar'>
            <tbody>
                <tr>
                    <td className='EdgeMenuItem'>
                        <FontAwesomeIcon
                            data-tip data-for='btn-back-tip'
                            className='Icon Clickable'
                            icon={faArrowCircleLeft}
                            size={'2x'}
                            onClick={() => setState({ showConfirmBackAction: true })} />
                        <ReactTooltip id='btn-back-tip' place='bottom'>Start over</ReactTooltip>

                        <Modal
                            isOpen={state.showConfirmBackAction}
                            shouldCloseOnOverlayClick={true}
                            shouldCloseOnEsc={true}
                            className='Modal'
                            onRequestClose={() => setState({ showConfirmBackAction: false })}>

                            <p>You will lose all unsaved changes.</p>

                            <Link to={{ pathname: '/bankie/home' }}>
                                <FontAwesomeIcon className='ButtonOK' icon={faCheck} />
                            </Link>
                            <FontAwesomeIcon className='ButtonCancel' onClick={() => setState({ showConfirmBackAction: false })} icon={faWindowClose} />
                        </Modal>
                    </td>

                    {
                        props.tabs.map((tab) => (
                            <td
                                key={'btn-' + tab.code}
                                className={(tab.code === props.selectedTab) ? 'TabOption SelectedTabOption' : 'TabOption'}
                                onClick={() => props.callback(tab.code)}
                                data-tip data-for={'btn-tab-' + tab.code + '-tip'}>
                                <label className='Clickable'>{tab.title}</label>
                                <ReactTooltip id={'btn-tab-' + tab.code + '-tip'} place='bottom'>{tab.description}</ReactTooltip>
                            </td>
                        ))
                    }

                    <td className='EdgeMenuItem'>
                        <FontAwesomeIcon
                            data-tip data-for='btn-export-tip'
                            className='Icon Clickable'
                            icon={faSave}
                            size={'2x'}
                            onClick={() => downloadBankieExport()} />
                        <ReactTooltip id='btn-export-tip' place='bottom'>Export changes</ReactTooltip>
                    </td>
                </tr>
            </tbody>
        </table>
    )

    function downloadBankieExport() {
        const a = document.createElement('a');
        const file = new Blob([JSON.stringify(getBankieExport())], { type: 'text/json' });
        a.href = URL.createObjectURL(file);
        a.download = exportFileName;
        a.click();
    }

    function getBankieExport() {
        return {
            transactions: localStorage.getItem('transactions'),
            currency: localStorage.getItem('currency')
        }
    }

}

export default TabBar;
