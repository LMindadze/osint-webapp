import React, { useState } from 'react';

function ModulesDropdown({ modules, selectedModules, setSelectedModules }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleModuleChange = (event) => {
        const { value, checked } = event.target;
        setSelectedModules(prev =>
            checked ? [...prev, value] : prev.filter(mod => mod !== value)
        );
    };

    const handleSelectAll = (event) => {
        setSelectedModules(event.target.checked ? modules : []);
    };

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    return (
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
    );
}

export default ModulesDropdown;
