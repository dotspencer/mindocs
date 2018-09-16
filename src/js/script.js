const rootEl = document.querySelector('#root');

(async () => {
  const paths = await fetch('/data/paths.json').then(res => res.json());
  console.log('paths:', paths);
})();
