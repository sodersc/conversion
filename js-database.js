/**
 * Database for unit conversions
 * Structure: Each unit type has its own table
 * Each table has units with their conversion factor to the base unit
 */
const conversionDatabase = {
    // Length conversion table (base unit: nanometers)
    length: {
        nm: 1, // nanometer (base unit)
        mm: 1000000, // millimeter
        cm: 10000000, // centimeter
        meters: 1000000000, // meter
        kilometers: 1000000000000, // kilometer
        inches: 25400000, // inch
        feet: 304800000, // foot
        yards: 914400000, // yard
        miles: 1609344000000 // mile
    },
    
    // Area conversion table (base unit: square nanometers)
    area: {
        'sq_nm': 1, // square nanometer (base unit)
        'sq_mm': 1000000000000, // square millimeter
        'sq_cm': 100000000000000, // square centimeter
        'sq_m': 1000000000000000000, // square meter
        'hectare': 10000000000000000000000, // hectare
        'sq_km': 1000000000000000000000000, // square kilometer
        'sq_inch': 645160000000000, // square inch
        'sq_ft': 92903040000000000, // square foot
        'sq_yd': 836127360000000000, // square yard
        'acre': 4046856422400000000000, // acre
        'sq_mile': 2589988110336000000000000 // square mile
    },
    
    // Volume conversion table (base unit: cubic nanometers)
    volume: {
        'cu_nm': 1, // cubic nanometer (base unit)
        'cu_mm': 1000000000000000, // cubic millimeter
        'cu_cm': 1000000000000000000, // cubic centimeter (ml)
        'liter': 1000000000000000000000, // liter
        'cu_m': 1000000000000000000000000, // cubic meter
        'cu_inch': 16387064000000000000, // cubic inch
        'cu_ft': 28316846592000000000000, // cubic foot
        'cu_yd': 764554857984000000000000, // cubic yard
        'gallon_us': 3785411784000000000000, // US gallon
        'gallon_uk': 4546090000000000000000 // UK gallon
    },
    
    // Weight conversion table (base unit: nanograms)
    weight: {
        ng: 1, // nanogram (base unit)
        ug: 1000, // microgram
        mg: 1000000, // milligram
        g: 1000000000, // gram
        kg: 1000000000000, // kilogram
        ton_metric: 1000000000000000, // metric ton
        oz: 28349523125, // ounce
        lb: 453592370000, // pound
        stone: 6350293180000, // stone
        ton_us: 907184740000000, // US ton
        ton_uk: 1016046908800000 // UK ton
    },
    
    // Speed conversion table (base unit: nanometers per second)
    speed: {
        'nm_per_sec': 1, // nanometer per second (base unit)
        'm_per_sec': 1000000000, // meter per second
        'km_per_hour': 277777778, // kilometer per hour
        'ft_per_sec': 304800000, // feet per second
        'miles_per_hour': 447040000, // miles per hour
        'knot': 514444444 // knot
    },
    
    // Time conversion table (base unit: nanoseconds)
    time: {
        ns: 1, // nanosecond (base unit)
        us: 1000, // microsecond
        ms: 1000000, // millisecond
        sec: 1000000000, // second
        min: 60000000000, // minute
        hour: 3600000000000, // hour
        day: 86400000000000, // day
        week: 604800000000000, // week
        month: 2629746000000000, // month (average)
        year: 31556952000000000 // year (average)
    },
    
    // Temperature is special because it's not a simple multiplication
    // We'll handle it differently in the converter function
    temperature: {
        celsius: 'celsius',
        fahrenheit: 'fahrenheit',
        kelvin: 'kelvin'
    }
};

// Display names for units (for better readability in dropdowns)
const unitDisplayNames = {
    // Length
    nm: 'Nanometers (nm)',
    mm: 'Millimeters (mm)',
    cm: 'Centimeters (cm)',
    meters: 'Meters (m)',
    kilometers: 'Kilometers (km)',
    inches: 'Inches (in)',
    feet: 'Feet (ft)',
    yards: 'Yards (yd)',
    miles: 'Miles (mi)',
    
    // Area
    sq_nm: 'Square Nanometers (nm²)',
    sq_mm: 'Square Millimeters (mm²)',
    sq_cm: 'Square Centimeters (cm²)',
    sq_m: 'Square Meters (m²)',
    hectare: 'Hectares (ha)',
    sq_km: 'Square Kilometers (km²)',
    sq_inch: 'Square Inches (in²)',
    sq_ft: 'Square Feet (ft²)',
    sq_yd: 'Square Yards (yd²)',
    acre: 'Acres',
    sq_mile: 'Square Miles (mi²)',
    
    // Volume
    cu_nm: 'Cubic Nanometers (nm³)',
    cu_mm: 'Cubic Millimeters (mm³)',
    cu_cm: 'Cubic Centimeters/ml (cm³)',
    liter: 'Liters (L)',
    cu_m: 'Cubic Meters (m³)',
    cu_inch: 'Cubic Inches (in³)',
    cu_ft: 'Cubic Feet (ft³)',
    cu_yd: 'Cubic Yards (yd³)',
    gallon_us: 'US Gallons',
    gallon_uk: 'UK Gallons',
    
    // Weight
    ng: 'Nanograms (ng)',
    ug: 'Micrograms (μg)',
    mg: 'Milligrams (mg)',
    g: 'Grams (g)',
    kg: 'Kilograms (kg)',
    ton_metric: 'Metric Tons',
    oz: 'Ounces (oz)',
    lb: 'Pounds (lb)',
    stone: 'Stone',
    ton_us: 'US Tons',
    ton_uk: 'UK Tons',
    
    // Speed
    nm_per_sec: 'Nanometers per second (nm/s)',
    m_per_sec: 'Meters per second (m/s)',
    km_per_hour: 'Kilometers per hour (km/h)',
    ft_per_sec: 'Feet per second (ft/s)',
    miles_per_hour: 'Miles per hour (mph)',
    knot: 'Knots',
    
    // Time
    ns: 'Nanoseconds (ns)',
    us: 'Microseconds (μs)',
    ms: 'Milliseconds (ms)',
    sec: 'Seconds (s)',
    min: 'Minutes (min)',
    hour: 'Hours (h)',
    day: 'Days',
    week: 'Weeks',
    month: 'Months',
    year: 'Years',
    
    // Temperature
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    kelvin: 'Kelvin (K)'
};
