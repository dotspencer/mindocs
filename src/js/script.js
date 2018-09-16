const content = document.querySelector('.content');

(async () => {
  const endpoints = await fetch('/data/endpoints.json').then(res => res.json());
  endpoints.forEach(ep => {
    const endpointDisplay = createEndpointDisplay(ep);
    content.appendChild(endpointDisplay);
  });
})();

function createEndpointDisplay(endpoint) {
  const { path, method, desc, post_body, example } = endpoint;

  const container = createElement('div', ['endpoint-container']);
  const titleRow = createElement('div', ['title-row']);

  const methodTag = createElement('div', ['tag', [method.toLowerCase()]]);
  methodTag.textContent = method;
  titleRow.appendChild(methodTag);

  const title = createElement('h2', ['endpoint-path']);
  title.textContent = path;
  titleRow.appendChild(title);

  const chev = createElement('img', ['chevron']);
  chev.src = "/img/chevron.svg";
  titleRow.appendChild(chev);

  container.appendChild(titleRow);
  return container;
}

function createElement(type, classes = []) {
  const el = document.createElement(type);
  el.classList.add.apply(el.classList, classes);
  return el;
}
