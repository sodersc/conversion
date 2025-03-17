/**
 * Conversion functions for different unit types
 */

/**
 * Generic converter function for most unit types
 * @param {number} value - The value to convert
 * @param {string} fromUnit - The unit to convert from
 * @param {string} toUnit - The unit to convert to
 * @param {object} conversionTable - The conversion table to use
 * @returns {number} - The converted value
 */
function convertGeneric(value, fromUnit, toUnit, conversionTable) {
    // Convert to base unit first
    const valueInBaseUnit = value * conversionTable[fromUnit];
    
    // Then convert from base unit to target unit
    return valueInBaseUnit / conversionTable[toUnit];
}

/**
 * Temperature converter (special case)
 * @param {number} value - The value to convert
 * @param {string} fromUnit - The unit to convert from ('celsius', 'fahrenheit', or 'kelvin')
 * @param {string} toUnit - The unit to convert to ('celsius', 'fahrenheit', or 'kelvin')
 * @returns {number} - The converted value
 */
function convertTemperature(value, fromUnit, toUnit) {
    // Convert to Celsius first (our "base" unit for temperature)
    let celsius;
    
    switch (fromUnit) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Then convert from Celsius to target unit
    switch (toUnit) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

/**
 * Main conversion function that handles all unit types
 * @param {number} value - The value to convert
 * @param {string} fromUnit - The unit to convert from
 * @param {string} toUnit - The unit to convert to
 * @param {string} unitType - The type of unit ('length', 'area', etc.)
 * @returns {object} - Result object with converted value and formula
 */
function convert(value, fromUnit, toUnit, unitType) {
    let result, formula;
    
    // Handle temperature separately due to its special conversion formulas
    if (unitType === 'temperature') {
        result = convertTemperature(value, fromUnit, toUnit);
        
        // Create formula explanation for temperature
        if (fromUnit === toUnit) {
            formula = `${value} ${unitDisplayNames[fromUnit]} = ${result.toFixed(4)} ${unitDisplayNames[toUnit]}`;
        } else {
            let formulaExp;
            if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                formulaExp = `(${value} × 9/5) + 32`;
            } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                formulaExp = `(${value} - 32) × 5/9`;
            } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
                formulaExp = `${value} + 273.15`;
            } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
                formulaExp = `${value} - 273.15`;
            } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
                formulaExp = `(${value} - 32) × 5/9 + 273.15`;
            } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
                formulaExp = `(${value} - 273.15) × 9/5 + 32`;
            }
            formula = `${value} ${unitDisplayNames[fromUnit]} = ${formulaExp} = ${result.toFixed(4)} ${unitDisplayNames[toUnit]}`;
        }
    } else {
        // Use generic conversion for other unit types
        result = convertGeneric(value, fromUnit, toUnit, conversionDatabase[unitType]);
        
        // Create formula explanation
        if (fromUnit === toUnit) {
            formula = `${value} ${unitDisplayNames[fromUnit]} = ${result.toFixed(4)} ${unitDisplayNames[toUnit]}`;
        } else {
            // Get the conversion factors for display
            const fromFactor = conversionDatabase[unitType][fromUnit];
            const toFactor = conversionDatabase[unitType][toUnit];
            
            // Simplified factor for direct conversion
            const conversionFactor = fromFactor / toFactor;
            
            if (conversionFactor === 1) {
                formula = `${value} ${unitDisplayNames[fromUnit]} = ${result.toFixed(4)} ${unitDisplayNames[toUnit]}`;
            } else if (conversionFactor < 1) {
                formula = `${value} ${unitDisplayNames[fromUnit]} × ${conversionFactor.toExponential(4)} = ${result.toFixed(4)} ${unitDisplayNames[toUnit]}`;
            } else {
                formula = `${value} ${unitDisplayNames[fromUnit]} × ${conversionFactor.toExponential(4)} = ${result.toFixed(4)} ${unitDisplayNames[toUnit]}`;
            }
        }
    }
    
    return {
        value: result,
        formula: formula
    };
}
