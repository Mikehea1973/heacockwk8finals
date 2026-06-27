const revealItems = document.querySelectorAll(".reveal");
const statItems = document.querySelectorAll(".count-up");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const observedSections = document.querySelectorAll("main section[id]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const duration = 1400;
      const startTime = performance.now();

      const updateValue = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = String(value).padStart(target < 10 ? 2 : 1, "0");

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };

      requestAnimationFrame(updateValue);
      countObserver.unobserve(counter);
    });
  },
  {
    threshold: 0.55,
  }
);

statItems.forEach((item) => {
  countObserver.observe(item);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isMatch = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isMatch);
      });
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.1,
  }
);

observedSections.forEach((section) => {
  navObserver.observe(section);
});