import { faCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { getCategoryNames } from '../../../../../../Config/CategoryPack';
import './EditorModal.css';

const payeeCharacterLimit = 30;

function EditorModal(props) {

    const [state, setState] = useState({
        transaction: props.transaction,
        updateForAllTransactions: false,
    });

    return (
        <Modal
            isOpen={state.transaction != null}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            className='Modal'
            onRequestClose={() => props.callbackAction(null, null)}>

            <p className='ModalHeading'>{props.modalHeader}</p>

            <form>
                <table className='FormTable'>
                    <tbody>
                        <tr>
                            <td className='FormField'>Date:</td>
                            <td>{state.transaction.displayDate}</td>
                        </tr>
                        <tr>
                            <td className='FormField'>Category:</td>
                            <td>
                                <select
                                    value={state.transaction.category}
                                    onChange={(e) => updateTransaction('category', e.target.value)}>
                                    {getCategoryNames().map((cat) => <option key={'opt-' + state.transaction.transactionId + '-' + cat}>{cat}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className='FormField'>Payee:</td>
                            <td>
                                <input
                                    value={state.transaction.payee}
                                    onChange={(e) => onPayeeFieldKeyPress(e.target.value)}
                                    className='FormValue'
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td className='FormField'>Amount:</td>
                            <td>{state.transaction.displayAmount}</td>
                        </tr>
                    </tbody>
                </table>

                <div hidden={!state.transaction.payee || state.transaction.category === 'Unknown'}>
                    <input type='checkbox' onChange={(e) => setState({ transaction: state.transaction, updateForAllTransactions: e.target.value })}></input>
                    <label>Update for all transactions with this payee</label>
                </div>

                <FontAwesomeIcon className='ButtonOK' onClick={() => props.callbackAction(state.transaction, state.updateForAllTransactions)} icon={faCheck} />
                <FontAwesomeIcon className='ButtonCancel' onClick={() => props.callbackAction(null, null)} icon={faWindowClose} />
            </form>

        </Modal>
    )

    function onPayeeFieldKeyPress(value) {
        if (value.length < payeeCharacterLimit) {
            updateTransaction('payee', value.toUpperCase());
        }
    }

    function updateTransaction(key, value) {
        const t = state.transaction;
        t[key] = value;
        setState({ transaction: t, updateForAllTransactions: state.updateForAllTransactions });
    }

}

export default EditorModal;
