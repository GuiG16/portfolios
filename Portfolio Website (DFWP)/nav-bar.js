/***********
* Nav Bar JS
***********/

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("main-nav");
  const animation = nav.querySelector(".animation");
  const links = Array.from(nav.querySelectorAll(".nav-link"));

  // Helper: move animation to the provided element (or hide if null)
  function moveTo(el) {
    if (!el) {
      animation.style.width = "0";
      return;
    }
    // Get bounding box relative to the nav container
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const left = elRect.left - navRect.left;
    const width = elRect.width;

    // Apply styles
    animation.style.left = Math.round(left) + "px";
    animation.style.width = Math.round(width) + "px";
  }

  // Initialize to the active link if present
  const initialActive = nav.querySelector(".nav-link.active");
  moveTo(initialActive || null);

  // Hover: move to hovered link
  links.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
      moveTo(e.currentTarget);
    });

    // For keyboard users: show on focus
    link.addEventListener("focus", (e) => {
      moveTo(e.currentTarget);
    });

    // Click: set active persistent state
    link.addEventListener("click", (e) => {
      // Prevent page navigation for demo; remove in real site
      e.preventDefault();

      // Clear previous active
      links.forEach(l => l.classList.remove("active"));
      e.currentTarget.classList.add("active");

      // Move the bar (in case click didn't move it yet)
      moveTo(e.currentTarget);
    });
  });

  // When leaving the nav, return to active (or hide if none)
  nav.addEventListener("mouseleave", () => {
    const active = nav.querySelector(".nav-link.active");
    moveTo(active || null);
  });

  // Also handle blur so keyboard users revert to active
  nav.addEventListener("focusout", (e) => {
    // If focus moves outside the nav entirely, revert
    setTimeout(() => {
      if (!nav.contains(document.activeElement)) {
        const active = nav.querySelector(".nav-link.active");
        moveTo(active || null);
      }
    }, 0);
  });

  // Recalculate positions on resize (keeps bar aligned if layout changes)
  window.addEventListener("resize", () => {
    const active = nav.querySelector(".nav-link.active");
    moveTo(active || null);
  });

  // Mobile touch: make the bar follow touchstart similarly to hover
  links.forEach(link => {
    link.addEventListener("touchstart", (e) => {
      moveTo(e.currentTarget);
    }, {passive: true});
  });
});