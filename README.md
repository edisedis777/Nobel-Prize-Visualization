# Nobel Prize Visualization
[![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white)](#)
[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Markdown](https://img.shields.io/badge/Markdown-%23000000.svg?logo=markdown&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)


![Screenshot](https://github.com/user-attachments/assets/e3f93067-8bf4-4352-b238-3619e24f2b73)

This project provides an interactive web-based visualization of Nobel Prize winners across various categories from 1901 to 2019. Built with HTML, CSS, and JavaScript, it allows users to explore laureates by category, year, and country through dynamic filters, summaries, and bar charts.

## Features

- **Interactive Filters**: Filter laureates by category (e.g., Chemistry, Physics, Peace), year, or country.
- **Statistics Panel**: Displays total laureates, unique categories, and countries based on applied filters.
- **Visual Charts**: 
  - Bar chart of laureates by category with color-coded bars.
  - Horizontal bar chart of top 5 countries by laureate count.
- **Laureate Cards**: Detailed cards listing each laureate with their name, year, country, category, and achievement.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Demo

[View live demo](https://edisedis777.github.io/Nobel-Prize-Visualization/)

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/edisedis777/nobel-prize-visualization.git
   ```

2. Navigate to the project directory:
```bash
cd nobel-prize-visualization
```

3. Open index.html in a browser:
Simply open the index.html file directly in your preferred web browser, or
Use a local server (recommended for proper functionality):
```bash
npx live-server
```
(Requires Node.js and npm installed)

## Project Structure
```text
nobel-prize-visualization/
├── index.html           # Main HTML file
├── styles.css           # Stylesheet for layout and design
├── visualization.js     # Logic for rendering visualizations
├── data-processor.js    # Data processing and filtering logic
├── nobel-prize-data.json # Transformed Nobel Prize data
├── transform.ipynb      # Jupyter notebook for data transformation
└── README.md            # This file
```

### Data Source
The data is sourced from a open-source JSON file, which was transformed from an original dataset (nobel-prize-winners.json) using the Python script in transform.ipynb. The transformed data is structured hierarchically by category, year, and laureate details.

## Data Transformation
- Input: JSON file (year-based structure)
- Output: nobel-prize-data.json (category-based hierarchy)
- Tool: Python with json library (see transform.ipynb)

## Usage
- Open the application in a browser.
- Use the dropdown filters to select a category, year, or country.
- Explore the updated statistics, charts, and laureate list.

## Technologies Used
- HTML5: Structure of the web page.
- CSS3: Styling with responsive design and animations.
- JavaScript (ES6): Data processing, DOM manipulation, and visualization logic.
- Python: Data transformation script in Jupyter Notebook.

## Contributing
Contributions are welcome!

## Credits
Nobel Prize data inspired by public datasets available online.

## License
This project is licensed under the MIT License - see the  file for details.
