// Add event listeners to change color on mouseenter and mouseleave
document.querySelector('#scene1-link').addEventListener('mouseenter', function () {
  // this.setAttribute('link', 'color: blue');
  document.querySelector('#cursor').setAttribute('color', 'blue');
});
document.querySelector('#scene1-link').addEventListener('mouseleave', function () {
  // this.setAttribute('link', 'color: white');
  document.querySelector('#cursor').setAttribute('color', 'black');
});

document.querySelector('#scene2-link').addEventListener('mouseenter', function () {
  // this.setAttribute('link', 'color: blue');
  document.querySelector('#cursor').setAttribute('color', 'blue');
});
document.querySelector('#scene2-link').addEventListener('mouseleave', function () {
  // this.setAttribute('link', 'color: white');
  document.querySelector('#cursor').setAttribute('color', 'black');
});