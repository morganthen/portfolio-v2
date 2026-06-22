// ASCII portrait: on-load reveal (noise -> resolve + fade) then a subtle continuous shimmer. One file so nothing competes over textContent.

(function () {
  const el = document.querySelector(".hero__ascii-photo");
  if (!el) return;

  // Ramp used to generate the art (light -> dark). Match your .txt file.
  const RAMP = " .'`^,:;Iiltfjrxnuvczo0OQLCJUYXmwqpdkbahKW8B&%#@M";
  const indexOf = new Map([...RAMP].map((c, i) => [c, i]));
  const GLYPHS = RAMP.slice(1); // non-space chars, used for noise

  // Tuning -------------------------------------------------
  const REVEAL_MS = 2000; // length of the reveal
  const TOPDOWN_BIAS = 2; // 0 = pure random, 1 = strict top-to-bottom
  const SHIMMER_FPS = 12;
  const SHIMMER_FRACTION = 0.054; // ~0.4% of figure chars per frame
  // --------------------------------------------------------

  const original = [...el.textContent];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Map each cell to its row fraction (0 top .. 1 bottom) for the bias.
  const rowOf = [];
  let row = 0;
  for (let i = 0; i < original.length; i++) {
    rowOf[i] = row;
    if (original[i] === "\n") row++;
  }
  const totalRows = row || 1;

  // Figure cells = the drawn portrait (skip background + newlines).
  const targets = [];
  for (let i = 0; i < original.length; i++) {
    const ch = original[i];
    if (ch !== " " && ch !== "\n" && indexOf.has(ch)) targets.push(i);
  }
  if (!targets.length) return;

  // Reduced motion: skip the show, just display the final art.
  if (reduce) {
    el.style.opacity = "1";
    return;
  }

  // Per-cell resolve threshold in [0,1): random mixed with top-down bias.
  const threshold = new Float32Array(original.length);
  for (const i of targets) {
    const r = Math.random();
    const pos = rowOf[i] / totalRows;
    threshold[i] = (1 - TOPDOWN_BIAS) * r + TOPDOWN_BIAS * pos;
  }

  const current = original.slice();
  const rnd = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

  el.style.opacity = "0";

  let start = null;
  function reveal(now) {
    if (start === null) start = now;
    const p = Math.min(1, (now - start) / REVEAL_MS);
    el.style.opacity = String(1 - Math.pow(1 - p, 2)); // easeOut fade

    for (const i of targets) {
      current[i] = p >= threshold[i] ? original[i] : rnd();
    }
    el.textContent = current.join("");

    if (p < 1) {
      requestAnimationFrame(reveal);
    } else {
      el.style.opacity = "1";
      startShimmer();
    }
  }
  requestAnimationFrame(reveal);

  // --- continuous shimmer: nudge a few chars one ramp-step, then revert ---
  function startShimmer() {
    const perFrame = Math.max(1, Math.floor(targets.length * SHIMMER_FRACTION));
    const interval = 1000 / SHIMMER_FPS;
    let last = 0;
    let touched = [];

    function tick(now) {
      if (now - last >= interval) {
        last = now;
        for (const i of touched) current[i] = original[i];
        touched = [];
        for (let n = 0; n < perFrame; n++) {
          const i = targets[(Math.random() * targets.length) | 0];
          const base = indexOf.get(original[i]);
          let j = base + (Math.random() < 0.5 ? -1 : 1);
          if (j < 1) j = 1;
          if (j > RAMP.length - 1) j = RAMP.length - 1;
          current[i] = RAMP[j];
          touched.push(i);
        }
        el.textContent = current.join("");
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
