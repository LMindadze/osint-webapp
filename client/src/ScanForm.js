import React, { useState } from 'react';
import ModulesDropdown from './ModulesDropdown';


function ScanForm({ setProgress, setIsScanning, handleScanCompletion, isScanning }) {
    const [tool, setTool] = useState('theHarvester');
    const [selectedModules, setSelectedModules] = useState([]);

    const modules = [
        'anubis', 'baidu', 'bing', 'brave', 'censys', 'certspotter', 'crtsh',
        'dnsdumpster', 'duckduckgo', 'github-code', 'hackertarget', 'hunterhow',
        'otx', 'rapiddns', 'sitedossier', 'subdomaincenter', 'subdomainfinderc99',
        'threatminer', 'urlscan', 'yahoo'
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProgress(0);
        setIsScanning(true);

        let duration = tool === 'theHarvester'
            ? selectedModules.length * 2 + 4
            : 60;

        let progressInterval = setInterval(() => {
            setProgress(prev => (prev < 75 ? prev + 1 : 75));
        }, (duration * 1000) / 75);

        const domain = event.target.domain.value;

        const response = await fetch('http://localhost:5000/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domain, tool, modules: selectedModules }),
        });

        const scanData = await response.json();
        handleScanCompletion(scanData);

        clearInterval(progressInterval);
        setProgress(100);
        setIsScanning(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="domain" placeholder="Enter domain" required />
            <select name="tool" value={tool} onChange={(e) => setTool(e.target.value)} required>
                <option value="theHarvester">theHarvester</option>
                <option value="Amass">Amass</option>
            </select>

            {tool === "theHarvester" && (
                <ModulesDropdown
                    modules={modules}
                    selectedModules={selectedModules}
                    setSelectedModules={setSelectedModules}
                />
            )}

            <button type="submit" disabled={isScanning}>Scan</button>
        </form>
    );
}

export default ScanForm;
