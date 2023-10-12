import React, { useState, useEffect } from "react";

function RandomCocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const numberOfCocktailsToFetch = 20;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      setCocktails(data.drinks);
    } catch (error) {
      console.error("Error searching cocktails:", error);
    }
  };

  const handleFilter = (filterType) => {
    // Implement your filtering logic here
    // For example: filter by first letter, rating, price, or name
    // Update the 'cocktails' state with the filtered results
    setSelectedFilter(filterType);
    toggleMenu();
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const fetchRandomCocktails = async () => {
      try {
        const fetchedCocktails = [];

        for (let i = 0; i < numberOfCocktailsToFetch; i++) {
          const response = await fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/random.php"
          );
          const data = await response.json();
          const randomCocktail = data.drinks[0];
          fetchedCocktails.push(randomCocktail);
        }

        if (!searchTerm) {
          setCocktails(fetchedCocktails);
        }
      } catch (error) {
        console.error("Error fetching random cocktails:", error);
      }
    };

    fetchRandomCocktails();
  }, [searchTerm]);

  return (
    <div className="bg-gray-600 w-full h-auto relative">
      <header className="bg-gray-600 text-center text-2xl font-normal text-blue-300 p-2">
        <div className="flex justify-between px-4">
          <div>Cock Tail Db</div>
          <div className="text-center mb-4">
          <input
            type="text"
            placeholder="Search for cocktails"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-l-full py-2 px-5 focus:outline-none text-base"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-base text-white py-2 px-4 rounded-r-full hover-bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </div>
          <div>
            <button
              className="text-blue-300 hover:text-white"
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>
        </div>
      </header>
      {menuVisible && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-600 text-center text-2xl font-normal text-blue-300 p-2">
          <div className="flex flex-col p-16">
            <button
              className="text-blue-300 hover:text-white"
              onClick={() => handleFilter("firstLetter")}
            >
              Filter by First Letter
            </button>
            <button
              className="text-blue-300 hover:text-white"
              onClick={() => handleFilter("rating")}
            >
              Filter by Rating
            </button>
            <button
              className="text-blue-300 hover:text-white"
              onClick={() => handleFilter("price")}
            >
              Filter by Price
            </button>
            <button
              className="text-blue-300 hover:text-white"
              onClick={() => handleFilter("name")}
            >
              Filter by Name
            </button>
          </div>
          <button
            className="absolute top-4 right-4 text-blue-300 hover:text-white"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>
      )}
      <div className="bg-gray-600 p-4">
        
        <div className="bg-gray-600 flex flex-wrap justify-center p-4">
          {cocktails && cocktails.length > 0 ? (
            cocktails.map((cocktail, index) => (
              <div key={index} className="w-1/4 p-4">
                <div className="bg-blue-300 rounded-lg p-4 flex flex-col items-center text-center">
                  <h2 className="text-lg mb-2">{cocktail.strDrink}</h2>
                  <img
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    className="w-36 h-36 mb-2"
                  />
                  <p className="mb-2">Category: {cocktail.strCategory}</p>
                  <p>
                    Description:{" "}
                    {cocktail.strInstructions.length > 100
                      ? cocktail.strInstructions.slice(0, 100) + "..."
                      : cocktail.strInstructions}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No cocktails found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RandomCocktails;
