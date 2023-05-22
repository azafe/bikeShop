const form = document.querySelector("form");
const input = document.querySelector('input[type="text"]');
const content = document.querySelector("body");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm.length) {
    const regex = new RegExp(searchTerm, "gi");
    const matches = content.innerHTML.match(regex);
    if (matches && matches.length) {
        content.innerHTML = content.innerHTML.replace(regex, '<span class="highlight">$&</span>');
        const highlighted = document.querySelector('.highlight');
        highlighted.scrollIntoView();
      } else {
        alert('No se encontraron coincidencias.');
      }
  }
});
