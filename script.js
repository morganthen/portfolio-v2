document
  .querySelectorAll(".projects__item")
  .forEach((item) =>
    item.addEventListener("click", () =>
      document
        .getElementById(item.querySelector("[data-dialog]").dataset.dialog)
        .showModal(),
    ),
  );
document
  .querySelectorAll("[data-close]")
  .forEach((btn) =>
    btn.addEventListener("click", () => btn.closest("dialog").close()),
  );

// Dot-grid spotlight: track the cursor per project item so the CSS mask can
// reveal a feathered patch of dots around it. rAF-throttled to one write/frame.
document.querySelectorAll(".projects__item").forEach((item) => {
  let raf = null;
  let x = 0;
  let y = 0;
  item.addEventListener("pointermove", (e) => {
    const rect = item.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      item.style.setProperty("--mx", `${x}px`);
      item.style.setProperty("--my", `${y}px`);
    });
  });
});
