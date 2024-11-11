window.onscroll = function () {
  makeNavbarSticky();
};

function makeNavbarSticky() {
  const navbar = document.querySelector(".navbar");
  const sticky = navbar.offsetTop;

  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
