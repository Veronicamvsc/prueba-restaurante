document.addEventListener('DOMContentLoaded', () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then(response => response.json())
    .then(data => {
      const cocktailsContainer = document.getElementById("cocktailsContainer");
      data.drinks.forEach(cocktail => {
        const cocktailDiv = document.createElement("div");
        cocktailDiv.className = "cocktail";
        cocktailDiv.innerHTML = `
          <h3>${cocktail.strDrink}</h3>
          <p>Ingredientes: ${cocktail.strIngredient1}, ${cocktail.strIngredient2}, ${cocktail.strIngredient3}</p>
        `;
        cocktailsContainer.appendChild(cocktailDiv);
      });
    })
    .catch(error => console.error('Error fetching cocktails:', error));
});