export default function (what) {
  let container = document.querySelector('.main');
  container.parentNode.replaceChild(what, container);
}
