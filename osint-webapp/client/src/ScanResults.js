import React, { useState } from 'react';
import './App.css';

// Modal component for displaying detailed scan results
const Modal = ({ selectedScan, onClose }) => {
    return (
        <div className="modal">
            <h2 className="modal-header">Details for {selectedScan.domain}</h2>
                <div className="modal-content" dangerouslySetInnerHTML={{ __html: selectedScan.result }} />
            <button className="close-btn" onClick={onClose}>Close</button>
        </div>
    );
};

const ScanResults = ({ scanResults, onDeleteAll, onDeleteResult }) => {
    const [selectedScan, setSelectedScan] = useState(null);

    // Function to display details of a specific scan
    const handleViewDetails = (scan) => {
        setSelectedScan(scan);
    };

    return (
        <div className="scan-results-wrapper">
            <div className="scan-results-container">
                {scanResults.map((scan, index) => (
                    <div key={index} className="result-card">
                        <h3>{scan.domain}</h3>
                        <p>Tool: {scan.tool}</p>
                        <p>Start: {scan.start_time}</p>
                        <p>End: {scan.end_time}</p>
                        <button className="view-details-btn" onClick={() => handleViewDetails(scan)}>View Details</button>
                        <button className="delete-btn" onClick={() => onDeleteResult(index)}>Delete</button>
                    </div>
                ))}
            </div>
            {selectedScan && (
                <Modal selectedScan={selectedScan} onClose={() => setSelectedScan(null)} />
            )}
            {scanResults.length > 0 && (
                <button className="delete-all-btn" onClick={onDeleteAll}>Delete All Outputs</button>
            )}
        </div>
    );
};

export default ScanResults;
