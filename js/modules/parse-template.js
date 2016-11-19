export default function (string) {
  let container = document.createElement('div');
  container.innerHTML = string;
  return container.firstChild;
}
