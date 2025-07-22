import React, { useState } from 'react';
import '../doc.css';

const CollapseSnippet = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <button
                onClick={toggleCollapse}
                style={{
                    display: 'block',
                    marginBottom: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    color: 'yellow'
                }}
            >
                {isCollapsed ? 'Show' : 'Hide'}
            </button>
            <div style={{ display: isCollapsed ? 'none' : 'block' }}>
                {children}
            </div>
        </div>
    );
};

export default CollapseSnippet;
