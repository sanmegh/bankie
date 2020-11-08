import React from 'react';
import { getBanks } from '../../../../Config/Banks';

function BankButtonBar(props) {

    return (
        <div>
            {
                getBanks().map((bank) => (
                    <button
                        key={'btn-' + bank.code}
                        className={props.selectedBank && props.selectedBank.code === bank.code ? 'PanelButton PanelSelectedButton' : 'PanelButton'}
                        onClick={() => props.callback(bank)}>

                        <img className='Icon' src={bank.logo} alt=''></img><br />
                        <label className='Clickable'>{bank.name}</label>

                    </button>
                ))
            }
        </div>
    )

}

export default BankButtonBar;
