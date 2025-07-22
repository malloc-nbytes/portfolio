import React, { useState, useRef, useEffect } from 'react';
import '../doc.css';

const CollapseSnippet = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        const updateHeight = () => {
            if (contentRef.current) {
                setContentHeight(contentRef.current.scrollHeight);
            }
        };

        updateHeight();

        // Use ResizeObserver to monitor changes in content size (e.g., nested CollapseSnippet toggles)
        const observer = new ResizeObserver(updateHeight);
        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        // Cleanup observer on unmount
        return () => {
            if (contentRef.current) {
                observer.unobserve(contentRef.current);
            }
        };
    }, [children]);

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
                    padding: '5px 20px',
                    backgroundColor: '#333',
                    color: 'yellow',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                }}
            >
                {isCollapsed ? 'Show' : 'Hide'}
            </button>
            <div
                style={{
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out',
                    maxHeight: isCollapsed ? 0 : `${contentHeight}px`,
                    width: '100%',
                }}
            >
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CollapseSnippet;
