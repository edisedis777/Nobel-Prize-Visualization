// visualization.js
// Function to initialize the visualization once data is available
function initializeVisualizations() {
  // Initialize UI elements
  const categoryFilter = document.getElementById("categoryFilter");
  const yearFilter = document.getElementById("yearFilter");
  const countryFilter = document.getElementById("countryFilter");
  const laureatesList = document.getElementById("laureatesList");
  const totalLaureatesElement = document.getElementById("totalLaureates");
  const totalCategoriesElement = document.getElementById("totalCategories");
  const totalCountriesElement = document.getElementById("totalCountries");
  const categoryChartElement = document.getElementById("categoryChart");
  const countryChartElement = document.getElementById("countryChart");

  // Current filters state
  const filters = {
    category: "all",
    year: "all",
    country: "all",
  };

  // Initialize country dropdown
  function initializeCountryDropdown() {
    const countries = dataProcessor.getCountries();
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countryFilter.appendChild(option);
    });
  }

  // Initialize year dropdown
  function initializeYearDropdown() {
    const years = dataProcessor.years; // Access the years array directly from the processor
    years.forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearFilter.appendChild(option);
    });
  }

  // Update all visualizations based on current filters
  function updateVisualizations() {
    updateStats();
    updateLaureatesList();
    updateCharts();
  }

  // Update statistics panel
  function updateStats() {
    const stats = dataProcessor.getStats(filters);
    totalLaureatesElement.textContent = stats.totalLaureates;
    totalCategoriesElement.textContent = stats.totalCategories;
    totalCountriesElement.textContent = stats.totalCountries;
  }

  // Update laureates list
  function updateLaureatesList() {
    laureatesList.innerHTML = "";
    const laureates = dataProcessor.getLaureates(filters);

    // Sort laureates by year and then by category
    laureates.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return a.category.localeCompare(b.category);
    });

    laureates.forEach((laureate) => {
      const card = document.createElement("div");
      card.className = "laureate-card";

      const name = document.createElement("h3");
      name.textContent = laureate.name;

      const year = document.createElement("p");
      year.textContent = `Year: ${laureate.year}`;

      const country = document.createElement("p");
      country.textContent = `Country: ${laureate.country}`;

      const category = document.createElement("span");
      category.className = "category";
      category.textContent = laureate.category;

      card.appendChild(name);
      card.appendChild(year);
      card.appendChild(country);
      card.appendChild(category);

      if (laureate.achievement && laureate.achievement !== "Not specified") {
        const achievement = document.createElement("p");
        achievement.className = "achievement";
        achievement.textContent = `Achievement: ${laureate.achievement}`;
        card.appendChild(achievement);
      }

      laureatesList.appendChild(card);
    });
  }

  // Update charts
  function updateCharts() {
    updateCategoryChart();
    updateCountryChart();
  }

  // Update category distribution chart - FIXED
  function updateCategoryChart() {
    // Clear previous chart
    categoryChartElement.innerHTML = "";

    // Add title
    const title = document.createElement("h3");
    title.textContent = "Laureates by Category";
    title.style.textAlign = "center";
    title.style.marginBottom = "15px";
    categoryChartElement.appendChild(title);

    // Get category distribution data
    const categoryData = dataProcessor.getCategoryDistribution(filters);

    // Find the maximum value for scaling
    const maxValue = Math.max(...Object.values(categoryData), 1); // Ensure we have a non-zero divisor

    // Define category colors
    const categoryColors = {
      Chemistry: "#5470C6",
      Literature: "#91CC75",
      Peace: "#FAC858",
      Physics: "#EE6666",
      Medicine: "#73C0DE",
    };

    // Create bar chart container with fixed height
    const chartContainer = document.createElement("div");
    chartContainer.style.width = "100%";
    chartContainer.style.height = "220px"; // Fixed height for the chart
    chartContainer.style.display = "flex";

    // Create bars side by side with proper heights
    Object.entries(categoryData).forEach(([category, count]) => {
      const barGroup = document.createElement("div");
      barGroup.style.display = "flex";
      barGroup.style.flexDirection = "column";
      barGroup.style.justifyContent = "flex-end"; // Start from the bottom
      barGroup.style.alignItems = "center";
      barGroup.style.flex = "1";
      barGroup.style.height = "100%"; // Take full height of container

      // Create the bar
      const bar = document.createElement("div");
      const barHeight = count > 0 ? Math.max((count / maxValue) * 80, 5) : 0; // At least 5% height if count > 0
      bar.style.height = `${barHeight}%`;
      bar.style.width = "60%"; // Make bars slightly narrower for better visibility
      bar.style.backgroundColor = categoryColors[category] || "#8884d8";
      bar.style.borderRadius = "4px 4px 0 0";
      bar.style.transition = "height 0.5s ease";

      // Add count label above bar
      const countLabel = document.createElement("div");
      countLabel.textContent = count;
      countLabel.style.fontWeight = "bold";
      countLabel.style.marginBottom = "5px";

      // Add category label below bar
      const categoryLabel = document.createElement("div");
      categoryLabel.textContent = category.split(" ")[0]; // Use just the first word for brevity
      categoryLabel.style.fontSize = "12px";
      categoryLabel.style.marginTop = "8px";

      // Append in the order: count label, bar, category label
      barGroup.appendChild(countLabel);
      barGroup.appendChild(bar);
      barGroup.appendChild(categoryLabel);
      chartContainer.appendChild(barGroup);
    });

    categoryChartElement.appendChild(chartContainer);
  }

  // Update country distribution chart
  function updateCountryChart() {
    // Clear previous chart
    countryChartElement.innerHTML = "";

    // Add title
    const title = document.createElement("h3");
    title.textContent = "Laureates by Country";
    title.style.textAlign = "center";
    title.style.marginBottom = "15px";
    countryChartElement.appendChild(title);

    // Get country distribution data and get top 5 countries
    const fullCountryData = dataProcessor.getCountryDistribution(filters);
    let countryData = {};

    // Take top 5 countries or fewer if less than 5 are available
    const topCountries = Object.keys(fullCountryData).slice(0, 5);
    topCountries.forEach((country) => {
      countryData[country] = fullCountryData[country];
    });

    // Find maximum value for scaling
    const maxValue = Math.max(...Object.values(countryData), 1);

    // Create bar chart container
    const chartContainer = document.createElement("div");
    chartContainer.style.display = "flex";
    chartContainer.style.flexDirection = "column";
    chartContainer.style.height = "calc(100% - 40px)";

    // Generate random but consistent colors for countries
    function getCountryColor(country) {
      // Simple hash function for consistent colors
      let hash = 0;
      for (let i = 0; i < country.length; i++) {
        hash = country.charCodeAt(i) + ((hash << 5) - hash);
      }
      const h = hash % 360;
      return `hsl(${h}, 70%, 60%)`;
    }

    // Create horizontal bars
    Object.entries(countryData).forEach(([country, count], index) => {
      const rowContainer = document.createElement("div");
      rowContainer.style.display = "flex";
      rowContainer.style.alignItems = "center";
      rowContainer.style.marginBottom = "10px";
      rowContainer.style.height = "30px";

      // Country label
      const label = document.createElement("div");
      label.textContent = country;
      label.style.width = "80px";
      label.style.textAlign = "right";
      label.style.paddingRight = "10px";
      label.style.fontSize = "14px";

      // Bar container
      const barContainer = document.createElement("div");
      barContainer.style.flex = "1";
      barContainer.style.height = "100%";
      barContainer.style.position = "relative";

      // Bar
      const bar = document.createElement("div");
      const barWidth = (count / maxValue) * 100;
      bar.style.width = `${barWidth}%`;
      bar.style.height = "100%";
      bar.style.backgroundColor = getCountryColor(country);
      bar.style.borderRadius = "4px";
      bar.style.transition = "width 0.5s ease";

      // Value label
      const value = document.createElement("div");
      value.textContent = count;
      value.style.position = "absolute";
      value.style.left = `${barWidth + 2}%`;
      value.style.top = "50%";
      value.style.transform = "translateY(-50%)";
      value.style.fontSize = "14px";
      value.style.fontWeight = "bold";

      barContainer.appendChild(bar);
      barContainer.appendChild(value);

      rowContainer.appendChild(label);
      rowContainer.appendChild(barContainer);

      chartContainer.appendChild(rowContainer);
    });

    countryChartElement.appendChild(chartContainer);
  }

  // Event listeners for filters
  categoryFilter.addEventListener("change", function (e) {
    filters.category = e.target.value;
    updateVisualizations();
  });

  yearFilter.addEventListener("change", function (e) {
    filters.year = e.target.value;
    updateVisualizations();
  });

  countryFilter.addEventListener("change", function (e) {
    filters.country = e.target.value;
    updateVisualizations();
  });

  // Initialize the page
  initializeCountryDropdown();
  initializeYearDropdown(); // This line was missing in the original code
  updateVisualizations();
}

// Note: We don't immediately call initializeVisualizations() here.
// It will be called from data-processor.js after data is loaded.
// This ensures that the visualizations are only initialized once the data is available.
