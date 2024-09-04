import React, { useState, useEffect } from 'react';
import './App.css';
import ScanResults from './ScanResults';
import Header from './Header';
import ScanForm from './ScanForm';
import ProgressBar from './ProgressBar';
import DarkMode from './DarkMode ';

function App() {
    const [scanResults, setScanResults] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        const storedResults = localStorage.getItem('scanResults');
        if (storedResults) {
            setScanResults(JSON.parse(storedResults));
        }
    }, []);

    const addScanResult = (newScan) => {
        const updatedResults = [...scanResults, newScan];
        setScanResults(updatedResults);
        localStorage.setItem('scanResults', JSON.stringify(updatedResults));
    };

    const handleScanCompletion = (scanData) => {
        addScanResult(scanData);
    };

    const handleDeleteResult = (index) => {
        const updatedResults = scanResults.filter((_, i) => i !== index);
        setScanResults(updatedResults);
        localStorage.setItem('scanResults', JSON.stringify(updatedResults));
    };

    const handleDeleteAll = () => {
        setScanResults([]);
        localStorage.removeItem('scanResults');
    };

    return (
        <div className="App">
            <DarkMode />
            <Header />
            <ScanForm
                setProgress={setProgress}
                setIsScanning={setIsScanning}
                handleScanCompletion={handleScanCompletion}
                isScanning={isScanning}
            />
            {isScanning && <ProgressBar progress={progress} />}
            <ScanResults scanResults={scanResults} onDeleteAll={handleDeleteAll} onDeleteResult={handleDeleteResult} />
        </div>
    );
}

export default App;
