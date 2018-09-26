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
  const { path = '', method = '', desc = '', req_body, examples = {} } = endpoint;

  const container = createElement('div', ['endpoint-container']);

  // initially visible
  const titleRow = createElement('div', ['title-row']);
  const methodTag = createElement('div', ['tag', method.toLowerCase()]);
  methodTag.textContent = method;
  titleRow.appendChild(methodTag);

  const title = createElement('h2', ['endpoint-path']);
  title.textContent = path;
  titleRow.appendChild(title);

  const descEl = createElement('div', ['endpoint-desc']);
  descEl.textContent = desc;
  titleRow.appendChild(descEl);
  container.appendChild(titleRow);

  let moreElements = [];

  // example responses
  const { success, fail } = examples;
  const moreContainer = createElement('div', ['show-more', 'hidden']);

  moreElements.push(createSnippet('Request Body', req_body));
  moreElements.push(createSnippet('Response Success', success));
  moreElements.push(createSnippet('Response Fail', fail));

  // add all more elements
  moreElements = moreElements.filter(m => m);
  moreElements.forEach(m => {
    moreContainer.appendChild(m);
  });
  container.appendChild(moreContainer);

  if (moreElements.length > 0) {
    titleRow.addEventListener('click', titleRowClicked);
    titleRow.classList.add('clickable');
    const chev = createElement('img', ['chevron']);
    chev.src = "/img/chevron.svg";
    titleRow.appendChild(chev);
  }

  if (Object.keys(endpoint).length === 0) {
    container.classList.add('invisible');
  }

  return container;
}

function createSnippet(labelText, object) {
  if (!object) return;
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
  classes = classes.filter(c => c);
  const el = document.createElement(type);
  el.classList.add.apply(el.classList, classes);
  return el;
}

function titleRowClicked() {
  const more = this.parentElement.querySelector('.show-more');
  if (more) {
    more.classList.toggle('hidden');
    const img = this.parentElement.querySelector('img.chevron');
    img.classList.toggle('rotated');
  }
}
