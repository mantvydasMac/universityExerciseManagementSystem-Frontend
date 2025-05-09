import React from 'react';
import PropTypes from 'prop-types';
import './styles/FloatingActionButton.css';

export default function FloatingActionButton({
                                                 ariaLabel,
                                                 icon,
                                                 onClick,
                                                 className = '',
                                             }) {
    return (
        <button
            className={`fab ${className}`}
            aria-label={ariaLabel}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}

FloatingActionButton.propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};