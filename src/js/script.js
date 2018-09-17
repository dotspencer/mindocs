const content = document.querySelector('.content');

(async () => {
  const rand = Math.random().toString();
  const endpoints = await fetch(`/data/endpoints.json?u=${rand}`).then(res => res.json());
  endpoints.forEach(ep => {
    const endpointDisplay = createEndpointDisplay(ep);
    content.appendChild(endpointDisplay);
  });
})();

function createEndpointDisplay(endpoint) {
  const { path, method, desc, post_body, example } = endpoint;

  const container = createElement('div', ['endpoint-container']);

  // initially visible
  const titleRow = createElement('div', ['title-row']);
  titleRow.addEventListener('click', function() {
    const more = this.parentElement.querySelector('.show-more');
    if (more) {
      more.classList.toggle('hidden');
      const img = this.parentElement.querySelector('img.chevron');
      img.classList.toggle('rotated');
    }
  });

  const methodTag = createElement('div', ['tag', [method.toLowerCase()]]);
  methodTag.textContent = method;
  titleRow.appendChild(methodTag);

  const title = createElement('h2', ['endpoint-path']);
  title.textContent = path;
  titleRow.appendChild(title);

  const descEl = createElement('div', ['endpoint-desc']);
  descEl.textContent = desc;
  titleRow.appendChild(descEl);
  container.appendChild(titleRow);

  // initially hidden
  if (example) {
    const chev = createElement('img', ['chevron']);
    chev.src = "/img/chevron.svg";
    titleRow.appendChild(chev);

    const { success, fail } = example;
    const more = createElement('div', ['show-more', 'hidden']);

    more.appendChild(createSnippet('Success', success));
    more.appendChild(createSnippet('Fail', fail));

    container.appendChild(more);
  }

  return container;
}

function createSnippet(labelText, object = {}) {
  const snippet = createElement('div', ['snippet']);

  const exampleSuccess = createElement('pre');
  exampleSuccess.innerHTML = JSON.stringify(object, null, '  ');
  const label = createElement('h3');
  label.innerText = labelText;

  snippet.appendChild(label);
  snippet.appendChild(exampleSuccess);
  return snippet;
}

function createElement(type, classes = []) {
  const el = document.createElement(type);
  el.classList.add.apply(el.classList, classes);
  return el;
}
