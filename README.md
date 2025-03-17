# Unit Converter

A versatile web-based unit conversion tool that allows users to convert between different units of measurement.

## Features

- Convert between different units for:
  - Length (nm, mm, cm, meters, kilometers, inches, feet, yards, miles)
  - Area (square units)
  - Volume (cubic units, liters, gallons)
  - Weight (nanograms to tons)
  - Speed (various velocity units)
  - Time (nanoseconds to years)
  - Temperature (Celsius, Fahrenheit, Kelvin)
- Responsive design that works on desktop and mobile
- Simple and intuitive user interface
- Real-time conversion with formula explanation

## How to Use

1. Select the type of unit you want to convert from the horizontal menu at the top
2. Choose the unit to convert from in the "Convert From" dropdown
3. Choose the unit to convert to in the "Convert To" dropdown
4. Enter the value you want to convert
5. Click the "Convert Now" button to see the result
6. The result will be displayed with a formula explaining the conversion

## Technical Implementation

The application uses a robust conversion database that stores conversion factors for different units:

- Each unit type has its own conversion table
- Each unit is stored with its conversion factor to the base unit for its type
- For example, in the length table, the base unit is nanometers, and each unit has a factor showing how many nanometers it equals
- Temperature conversions are handled separately due to their non-linear formulas

## Installation

Simply clone this repository and open `index.html` in a web browser:

```
git clone https://github.com/yourusername/unit-converter.git
cd unit-converter
```

No build process or dependencies are required.

## Future Enhancements

Potential future improvements:

- Add more unit types (currency, data storage, etc.)
- Implement history of conversions
- Add ability to save favorite conversions
- Implement direct input parsing (e.g., "5ft to m")
- Create a dark mode theme option

## License

MIT License - Feel free to use, modify, and distribute this code as you wish.
