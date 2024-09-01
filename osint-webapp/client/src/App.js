import React, { useState, useEffect } from 'react';
import './App.css';
import ScanResults from './ScanResults';

function App() {
    const [scanResults, setScanResults] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [tool, setTool] = useState('theHarvester');
    const [timeout, setTimeout] = useState(10);
    const [selectedModules, setSelectedModules] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const modules = [
        'anubis', 'baidu', 'bing', 'brave', 'censys', 'certspotter', 'crtsh',
        'dnsdumpster', 'duckduckgo', 'github-code', 'hackertarget', 'hunterhow',
        'otx', 'rapiddns', 'sitedossier',
        'subdomaincenter', 'subdomainfinderc99', 'threatminer', 'urlscan', 'yahoo'
    ];

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

    const handleModuleChange = (event) => {
        const { value, checked } = event.target;
        setSelectedModules(prev =>
            checked ? [...prev, value] : prev.filter(mod => mod !== value)
        );
    };

    const handleSelectAll = (event) => {
        setSelectedModules(event.target.checked ? modules : []);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProgress(0);
        setIsScanning(true);

        let duration;
        if (tool === 'theHarvester') {
            duration = selectedModules.length * 2 + 4; // Dynamic duration based on the number of selected modules
        } else if (tool === 'Amass') {
            duration = 60; // Always 60 seconds for Amass
        }

        let progressInterval = setInterval(() => {
            setProgress((prev) => (prev < 75 ? prev + 1 : 75));
        }, (duration * 1000) / 75);  // Adjust the interval timing based on the calculated duration


        const domain = event.target.domain.value;

        const response = await fetch('http://localhost:5000/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domain, tool, timeout, modules: selectedModules }),
        });

        const scanData = await response.json();
        handleScanCompletion(scanData);

        clearInterval(progressInterval);
        setProgress(100);
        setIsScanning(false);
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

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    return (
        <div className="App">
            <h1>OSINT Web Application</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="domain" placeholder="Enter domain" required />
                <select name="tool" value={tool} onChange={(e) => setTool(e.target.value)} required>
                    <option value="theHarvester">theHarvester</option>
                    <option value="Amass">Amass</option>
                </select>

                {tool === "Amass" && (
                    <input
                        type="number"
                        name="timeout"
                        value={timeout}
                        onChange={(e) => setTimeout(e.target.value)}
                        placeholder="Timeout in seconds"
                        required
                    />
                )}

                {tool === "theHarvester" && (
                    <div className={`modules-dropdown ${dropdownOpen ? 'open' : ''}`}>
                        <button type="button" className="dropdown-btn" onClick={toggleDropdown}>
                            Select Modules
                        </button>
                        <div className="modules-selection">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedModules.length === modules.length}
                                />
                                Select All
                            </label>
                            {modules.map(mod => (
                                <label key={mod}>
                                    <input
                                        type="checkbox"
                                        value={mod}
                                        onChange={handleModuleChange}
                                        checked={selectedModules.includes(mod)}
                                    />
                                    {mod}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <button type="submit" disabled={isScanning}>Scan</button>
            </form>

            {isScanning && (
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            )}

            <ScanResults scanResults={scanResults} onDeleteAll={handleDeleteAll} onDeleteResult={handleDeleteResult} />
        </div>
    );
}

export default App;
