import { FaRegCopy } from "react-icons/fa6";
import { useState, useEffect } from 'react';

function CopyButton({ copy }) {
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(copy);
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        } catch (err) {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        }
    };

    return (
        <>
            <button className="copy-btn" onClick={copyToClipboard}>
                <FaRegCopy style={{ fontSize: '15px' }}/>
            </button>
            {copySuccess && <span style={{ marginLeft: '10px', color: 'yellow' }}>{copySuccess}</span>}
        </>
    );
}

export default CopyButton;
