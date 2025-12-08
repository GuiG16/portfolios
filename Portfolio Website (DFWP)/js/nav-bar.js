/***********
* Nav Bar JS
***********/

const nav = document.getElementById("myTopNav");

const animation = nav.querySelector(".animation");
const links = nav.querySelectorAll("a.nav-link");

links.forEach(link => {
  link.addEventListener("mouseenter", e => {
    const rect = e.target.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    animation.style.left = `${rect.left - navRect.left}px`;
    animation.style.width = `${rect.width}px`;
  });
});


nav.addEventListener("mouseleave", () => {
  animation.style.width = 0;
});

function myFunction() {
  nav.classList.toggle("responsive");
}
