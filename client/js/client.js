function render(htmlFile, id) {
  fetch(htmlFile)
    .then((x) => x.text())
    .then((x) => {
      document.querySelector(id).innerHTML = x;
    });
}

render("components/navbar.html", "#nav-bar");

render("components/footer.html", "#footer");

render("pages/home.html", "#root");
