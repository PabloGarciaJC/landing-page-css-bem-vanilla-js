
// let menuBtn = document.getElementById("menu-btn") as HTMLButtonElement;
// let menu = document.getElementById("menu") as HTMLElement;

// menuBtn.addEventListener("click", () => {
//     if (menu.classList.contains("hidden")) {
//         menu.classList.remove("hidden");
//         // Forzar reflow para que la transición funcione
//         menu.offsetHeight;
//         menu.classList.remove("opacity-0", "scale-95");
//         menu.classList.add("opacity-100", "scale-100");
//     } else {
//         menu.classList.remove("opacity-100", "scale-100");
//         menu.classList.add("opacity-0", "scale-95");
//         // Esperar el tiempo de transición para ocultar el menú
//         setTimeout(() => {
//             menu.classList.add("hidden");
//         }, 300); // coincide con duration-300
//     }
// });

class App {
  onReady() {
    this.customApp();
  }

  applyAnimationsByDirection(containerSelector, direction) {
    const targets = document.querySelectorAll(containerSelector);
    if (!targets.length) return;

    const observerOptions = {
      threshold: 0.01,
      rootMargin: "-500px 0px 0px 0px"
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(`animation__slide--${direction}`);

          entry.target.addEventListener(
            "animationend",
            function () {
              entry.target.classList.remove(`animation__slide--${direction}`);
            },
            { once: true }
          );

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    targets.forEach(target => observer.observe(target));
  }

  initAnimationLeftRight(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    if (container.classList.contains("animations-applied")) return;

    const bannerWrappers = container.querySelectorAll(".banner-wrapper");

    const applyAnimation = (element, index) => {
      if (index % 2 === 0) {
        element.classList.add("animation__slide--left");
      } else {
        element.classList.add("animation__slide--right");
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(bannerWrappers).indexOf(entry.target);
            applyAnimation(entry.target, index);
            entry.target.classList.add("animation-applied");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "-500px 0px 0px 0px"
      }
    );

    bannerWrappers.forEach(wrapper => observer.observe(wrapper));
    container.classList.add("animations-applied");
  }

  customApp() {
    this.applyAnimationsByDirection(".animation__left", "left");
    this.applyAnimationsByDirection(".animation__right", "right");
    this.applyAnimationsByDirection(".animation__fade-in-upscale", "fade-in-upscale");
    this.applyAnimationsByDirection(".animation__up", "up");
    this.applyAnimationsByDirection(".animation__down", "down");

    this.initAnimationLeftRight(".animation__left-right");
  }

  init() {
    this.onReady();
  }
}

const app = new App();
app.init();
