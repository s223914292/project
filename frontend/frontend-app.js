// frontend/frontend-app.js

document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('filterForm');
  const carList = document.getElementById('carList');

  // Function to fetch and display cars based on filters
  function fetchAndDisplayCars(filters) {
      // Send a POST request to fetch cars based on filters
      fetch('http://localhost:3000/api/cars/filter', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(filters),
      })
      .then(response => response.json())
      .then(cars => {
          // Clear the existing car list
          carList.innerHTML = '';

          // Display the fetched cars
          cars.forEach(car => {
              const li = document.createElement('li');
              li.textContent = `${car.make} ${car.model} (${car.year}) - Price: $${car.price}`;
              carList.appendChild(li);
          });
      });
  }

  // Handle form submission to apply filters
  filterForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Gather filter values from the form
      const filters = {
          make: filterForm.make.value,
          location: filterForm.location.value,
          //postcode: filterForm.postcode.value,
          priceLow: filterForm.priceLow.value,
          priceHigh: filterForm.priceHigh.value,
          yearFrom: filterForm.yearFrom.value,
          yearTo: filterForm.yearTo.value,
          kilometersFrom: filterForm.kilometersFrom.value,
          kilometersTo: filterForm.kilometersTo.value,
          // Add more filters as needed
      };

      // Fetch and display cars based on filters
      fetchAndDisplayCars(filters);
  });
});
