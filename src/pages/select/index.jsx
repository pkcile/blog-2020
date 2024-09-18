import React, { useState } from 'react';
import './index.less'; // 引入样式文件

const Select = ({ options, placeholder, width ='100%', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };


    return (
        <div className="select-container" style={{
            width: width,
        }}>
            <div className="select-header" onClick={handleToggle}>
                {selectedOption || placeholder}
                <span className={`select-arrow ${isOpen ? 'open' : ''}`}>&#9662;</span>
            </div>
            {isOpen && (
                <div className="select-options">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="select-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;