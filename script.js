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
