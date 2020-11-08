import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './../CategoryStatisticsTab.css';

function CategoryBarComponent(props) {

    return (
        <div>
            {
                props.categories.map(cat => (
                    <button
                        key={'btn-' + cat.name}
                        className={props.selectedCategory && props.selectedCategory.name === cat.name ? 'PanelButton PanelSelectedButton' : 'PanelButton'}
                        onClick={() => props.callback(cat)}>

                        <FontAwesomeIcon icon={cat.icon} className='Icon' size={'2x'} />
                        <p>{cat.name}</p>

                    </button>)
                )
            }
        </div >
    )

}

export default CategoryBarComponent;
