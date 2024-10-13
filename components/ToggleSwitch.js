import React from 'react';

const ToggleSwitch = ({isToggled, onToggleChange}) => {
    return (
        <div className="switch-container">
            <label className="switch">
                <input type="checkbox" checked={isToggled} onChange={onToggleChange} />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default ToggleSwitch;
