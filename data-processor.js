// Data Processor for Nobel Prize Visualization
class NobelDataProcessor {
  constructor(data) {
    this.rawData = data;
    this.laureates = [];
    this.categories = [];
    this.years = [];
    this.countries = new Set();
    this.processData();
  }

  processData() {
    // Process the hierarchical data to flatten it for easier manipulation
    const nobelData = this.rawData;

    // Extract categories
    this.categories = nobelData.children.map((category) => category.name);

    // Process all categories
    nobelData.children.forEach((category) => {
      const categoryName = category.name;

      // Process years within each category
      category.children.forEach((year) => {
        const yearValue = year.name;

        if (!this.years.includes(yearValue)) {
          this.years.push(yearValue);
        }

        // Process laureates within each year
        year.children.forEach((laureate) => {
          const country = laureate.country;
          this.countries.add(country);

          // Create a laureate object with all necessary information
          this.laureates.push({
            name: laureate.name,
            country: country,
            category: categoryName,
            year: yearValue,
            achievement: laureate.achievement || "Not specified",
          });
        });
      });
    });

    // Sort years chronologically
    this.years.sort();
  }

  // Get all laureates or filtered subset
  getLaureates(filters = {}) {
    let filteredLaureates = [...this.laureates];

    // Apply category filter
    if (filters.category && filters.category !== "all") {
      filteredLaureates = filteredLaureates.filter(
        (laureate) => laureate.category === filters.category
      );
    }

    // Apply year filter
    if (filters.year && filters.year !== "all") {
      filteredLaureates = filteredLaureates.filter(
        (laureate) => laureate.year === filters.year
      );
    }

    // Apply country filter
    if (filters.country && filters.country !== "all") {
      filteredLaureates = filteredLaureates.filter(
        (laureate) => laureate.country === filters.country
      );
    }

    return filteredLaureates;
  }

  // Get statistics based on current filters
  getStats(filters = {}) {
    const filteredLaureates = this.getLaureates(filters);

    // Count unique countries in the filtered set
    const countriesInFilter = new Set();
    filteredLaureates.forEach((laureate) =>
      countriesInFilter.add(laureate.country)
    );

    // Count unique categories in the filtered set
    const categoriesInFilter = new Set();
    filteredLaureates.forEach((laureate) =>
      categoriesInFilter.add(laureate.category)
    );

    return {
      totalLaureates: filteredLaureates.length,
      totalCountries: countriesInFilter.size,
      totalCategories: categoriesInFilter.size,
    };
  }

  // Get category distribution for charts
  getCategoryDistribution(filters = {}) {
    const filteredLaureates = this.getLaureates(filters);
    const distribution = {};

    this.categories.forEach((category) => {
      distribution[category] = 0;
    });

    filteredLaureates.forEach((laureate) => {
      distribution[laureate.category]++;
    });

    return distribution;
  }

  // Get country distribution for charts
  getCountryDistribution(filters = {}) {
    const filteredLaureates = this.getLaureates(filters);
    const distribution = {};

    filteredLaureates.forEach((laureate) => {
      if (!distribution[laureate.country]) {
        distribution[laureate.country] = 0;
      }
      distribution[laureate.country]++;
    });

    // Sort by count in descending order
    return Object.fromEntries(
      Object.entries(distribution).sort((a, b) => b[1] - a[1])
    );
  }

  // Get all available countries
  getCountries() {
    return Array.from(this.countries).sort();
  }
}

// Declare dataProcessor in the global scope
let dataProcessor = null;

// Fetch the Nobel data from a JSON file
fetch("nobel-prize-data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((nobelData) => {
    // Initialize the data processor with the fetched data
    dataProcessor = new NobelDataProcessor(nobelData);

    // Now that we have the data, initialize the visualizations
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeVisualizations);
    } else {
      initializeVisualizations();
    }
  })
  .catch((error) => {
    console.error("Error loading Nobel data:", error);
  });

// No need to initialize dataProcessor here again
// The last line was causing the error
