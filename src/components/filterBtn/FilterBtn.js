import React from 'react';

import './filterBtn.scss';

const FilterBtn = ({ onFilterChange }) => {
    return (
        <div className='btns-filter'>
            <button className='btn-filter' onClick={() => onFilterChange(false)}>ACTIVE</button>
            <button className='btn-filter' onClick={() => onFilterChange(true)}>COMPLETED</button>
        </div>
    );
};

export default FilterBtn;
