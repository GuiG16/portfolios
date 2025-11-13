/***********
* Nav Bar JS
***********/

const nav = document.querySelector("nav");
const animation = document.querySelector(".animation");
const links = document.querySelectorAll("nav a");

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