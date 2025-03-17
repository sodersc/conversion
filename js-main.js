/**
 * Main JavaScript file for the Unit Converter application
 */

// Global variables
let currentUnitType = 'length'; // Default unit type

// DOM elements
const unitTypeLinks = document.querySelectorAll('.unit-types a');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const valueInput = document.getElementById('value-input');
const converterForm = document.getElementById('converter-form');
const resultDiv = document.getElementById('result');
const resultText = document.getElementById('result-text');
const resultFormula = document.getElementById('result-formula');

/**
 * Initialize the application
 */
function init() {
    // Set event listeners
    unitTypeLinks.forEach(link => {
        link.addEventListener('click', handleUnitTypeChange);
    });
    
    converterForm.addEventListener('submit', handleConversion);
    
    // Initialize with default unit type (length)
    updateUnitTypeSelection('length');
    populateUnitDropdowns('length');
}

/**
 * Handle unit type change when clicking on the unit type links
 * @param {Event} e - The click event
 */
function handleUnitTypeChange(e) {
    e.preventDefault();
    
    const unitType = e.target.getAttribute('data-unit-type');
    
    // Update selection display
    updateUnitTypeSelection(unitType);
    
    // Update the current unit type
    currentUnitType = unitType;
    
    // Populate dropdowns according to unit type
    populateUnitDropdowns(unitType);
    
    // Clear previous results
    hideResult();
}

/**
 * Update the visual selection of unit type in the navigation
 * @param {string} unitType - The selected unit type
 */
function updateUnitTypeSelection(unitType) {
    // Remove active class from all links
    unitTypeLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to selected link
    const selectedLink = document.querySelector(`.unit-types a[data-unit-type="${unitType}"]`);
    if (selectedLink) {
        selectedLink.classList.add('active');
    }
}

/**
 * Populate unit dropdowns based on the selected unit type
 * @param {string} unitType - The selected unit type
 */
function populateUnitDropdowns(unitType) {
    // Clear existing options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    // Get units for the selected type
    const units = Object.keys(conversionDatabase[unitType]);
    
    // Add options to both dropdowns
    units.forEach(unit => {
        // "From" dropdown
        const fromOption = document.createElement('option');
        fromOption.value = unit;
        fromOption.textContent = unitDisplayNames[unit] || unit;
        fromUnitSelect.appendChild(fromOption);
        
        // "To" dropdown
        const toOption = document.createElement('option');
        toOption.value = unit;
        toOption.textContent = unitDisplayNames[unit] || unit;
        toUnitSelect.appendChild(toOption);
    });
    
    // Set default selections (first option for "from", second for "to" if available)
    fromUnitSelect.selectedIndex = 0;
    toUnitSelect.selectedIndex = units.length > 1 ? 1 : 0;
}

/**
 * Handle the conversion form submission
 * @param {Event} e - The submit event
 */
function handleConversion(e) {
    e.preventDefault();
    
    // Get input values
    const value = parseFloat(valueInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    
    // Validate input
    if (isNaN(value)) {
        alert('Please enter a valid number.');
        return;
    }
    
    // Perform conversion
    const result = convert(value, fromUnit, toUnit, currentUnitType);
    
    // Display result
    showResult(result.value, result.formula);
}

/**
 * Show the conversion result
 * @param {number} value - The converted value
 * @param {string} formula - The conversion formula explanation
 */
function showResult(value, formula) {
    resultText.textContent = value.toLocaleString(undefined, {
        maximumFractionDigits: 6
    });
    
    resultFormula.textContent = formula;
    resultDiv.classList.remove('hidden');
}

/**
 * Hide the result section
 */
function hideResult() {
    resultDiv.classList.add('hidden');
    resultText.textContent = '';
    resultFormula.textContent = '';
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
