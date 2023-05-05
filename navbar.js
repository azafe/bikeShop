document.getElementById("search-button").addEventListener("click", function() {
    const searchText = document.getElementById("search-input").value.toLowerCase();
    const contentText = document.querySelector(".content").textContent.toLowerCase();
    
    if (contentText.includes(searchText)) {
      window.find(searchText);
    } else {
      alert("La palabra buscada no fue encontrada.");
    }
  });
  