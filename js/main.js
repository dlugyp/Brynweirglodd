(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Hero: hide a missing image so the fallback colour shows
  var hero = document.querySelector(".hero-img");
  if (hero) {
    var hideHero = function () { hero.classList.add("missing"); };
    if (hero.complete && hero.naturalWidth === 0) hideHero();
    hero.addEventListener("error", hideHero);
  }

  // Maps button: Apple Maps on Apple devices, Google Maps everywhere else
  var mapsBtn = document.getElementById("open-maps");
  if (mapsBtn && /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
    mapsBtn.href = "https://maps.apple.com/?q=Bryn-Weirglodd&address=LL51%209AZ";
  }

  // Gallery + lightbox
  var buttons = Array.prototype.slice.call(document.querySelectorAll("#gallery-grid button"));
  var dialog = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCap = document.getElementById("lightbox-caption");
  var current = 0;

  function available() {
    return buttons.filter(function (b) { return !b.classList.contains("missing"); });
  }

  buttons.forEach(function (btn) {
    var img = btn.querySelector("img");
    btn.setAttribute("aria-label", "View photo: " + img.alt);
    var markMissing = function () {
      btn.classList.add("missing");
      btn.setAttribute("data-label", img.alt);
      btn.setAttribute("tabindex", "-1");
      btn.setAttribute("aria-hidden", "true");
    };
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener("error", markMissing);
    btn.addEventListener("click", function () {
      if (btn.classList.contains("missing")) return;
      open(available().indexOf(btn));
    });
  });

  function show(i) {
    var list = available();
    if (!list.length) return;
    current = (i + list.length) % list.length;
    var img = list[current].querySelector("img");
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt + " (" + (current + 1) + " of " + list.length + ")";
  }

  function open(i) {
    if (!dialog || typeof dialog.showModal !== "function") {
      window.open(available()[i].querySelector("img").src, "_blank");
      return;
    }
    show(i);
    dialog.showModal();
  }

  if (dialog) {
    dialog.querySelector(".lb-close").addEventListener("click", function () { dialog.close(); });
    dialog.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
    dialog.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    var startX = null;
    dialog.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    dialog.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }
})();
