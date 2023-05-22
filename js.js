const form = document.querySelector("form");
const input = document.querySelector('input[type="text"]');
const content = document.querySelector("body");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm.length) {
    const regex = new RegExp(searchTerm, "gi");
    const textNodes = getTextNodes(content);

    textNodes.forEach((node) => {
      const matches = node.nodeValue.match(regex);
      if (matches && matches.length) {
        const fragment = document.createDocumentFragment();
        const parts = node.nodeValue.split(regex);

        parts.forEach((part, index) => {
          const span = document.createElement('span');
          span.textContent = part;
          fragment.appendChild(span);

          if (index < parts.length - 1) {
            const match = document.createElement('span');
            match.textContent = matches[index];
            match.classList.add('highlight');
            fragment.appendChild(match);
          }
        });

        node.parentNode.replaceChild(fragment, node);
      }
    });

    const highlighted = document.querySelector('.highlight');
    if (highlighted) {
      highlighted.scrollIntoView();
    } else {
      alert('No se encontraron coincidencias.');
    }
  }
});

input.addEventListener("input", () => {
  removeHighlights();
});

function getTextNodes(element) {
  const textNodes = [];

  function traverse(element) {
    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        traverse(node);
      }
    }
  }

  traverse(element);
  return textNodes;
}

function removeHighlights() {
  const highlighted = document.querySelectorAll('.highlight');
  highlighted.forEach((element) => {
    const parent = element.parentNode;
    parent.replaceChild(document.createTextNode(element.textContent), element);
  });
}