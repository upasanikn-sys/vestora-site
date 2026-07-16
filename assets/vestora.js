/* ============================================================================
   VESTORA — shared site behaviour. Loaded by every page (defer).

   >>> GO LIVE: set DOWNLOAD_URL to your Gumroad product page (recommended — it
   handles the free tier + paid license keys), or a public direct link to
   Vestora_windows.zip. While it is empty, the Windows buttons show a friendly
   "launching soon" message instead of a broken link.
   ============================================================================ */
var DOWNLOAD_URL = "";   // e.g. "https://vestora.gumroad.com/l/vestora"

(function () {
  "use strict";

  /* --- Windows download buttons (.js-dl) --- */
  document.querySelectorAll(".js-dl").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (DOWNLOAD_URL) { window.location.href = DOWNLOAD_URL; return; }
      e.preventDefault();
      window.location.href = "mailto:hello@vestora.app?subject=" +
        encodeURIComponent("Vestora for Windows — early access request") +
        "&body=" + encodeURIComponent("Hi — I'd like early access to Vestora for Windows.");
    });
  });

  /* --- coming-soon platforms ([data-notify]) --- */
  document.querySelectorAll("[data-notify]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var p = el.getAttribute("data-notify");
      window.location.href = "mailto:hello@vestora.app?subject=" +
        encodeURIComponent("Notify me — Vestora for " + p);
    });
  });

  /* --- mobile menu --- */
  var mb = document.querySelector(".menu-btn");
  var mm = document.querySelector(".mobile-menu");
  if (mb && mm) {
    mb.addEventListener("click", function () { mm.classList.toggle("open"); });
    mm.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mm.classList.remove("open"); });
    });
  }

  /* --- nav shadow on scroll --- */
  var hdr = document.querySelector("header");
  if (hdr) {
    addEventListener("scroll", function () {
      hdr.style.boxShadow = scrollY > 10 ? "0 8px 30px rgba(0,0,0,.35)" : "none";
    });
  }

  /* --- FAQ accordion (pricing) --- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (i) { i.classList.remove("open"); });
      if (!open) item.classList.add("open");
    });
  });

  /* --- pricing toggles (currency + billing) --- */
  var pricing = document.querySelector("[data-pricing]");
  if (pricing) {
    var state = { cur: "inr", cycle: "monthly" };
    function apply() {
      document.querySelectorAll("[data-price]").forEach(function (el) {
        var key = state.cur + "-" + state.cycle;      // e.g. inr-yearly
        el.textContent = el.getAttribute("data-" + key) || el.getAttribute("data-price");
      });
      document.querySelectorAll("[data-cur-sym]").forEach(function (el) {
        el.textContent = state.cur === "inr" ? "₹" : "$";
      });
      document.querySelectorAll("[data-showif]").forEach(function (el) {
        el.style.display = el.getAttribute("data-showif") === state.cycle ? "" : "none";
      });
    }
    document.querySelectorAll("[data-cur]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.cur = b.getAttribute("data-cur");
        document.querySelectorAll("[data-cur]").forEach(function (x) { x.classList.toggle("on", x === b); });
        apply();
      });
    });
    document.querySelectorAll("[data-cycle]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.cycle = b.getAttribute("data-cycle");
        document.querySelectorAll("[data-cycle]").forEach(function (x) { x.classList.toggle("on", x === b); });
        apply();
      });
    });
    apply();
  }

  /* --- newsletter / notify forms: never actually POST anywhere --- */
  document.querySelectorAll("[data-notify-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = f.querySelector("input");
      var val = input ? input.value.trim() : "";
      window.location.href = "mailto:hello@vestora.app?subject=" +
        encodeURIComponent("Keep me posted on Vestora") +
        "&body=" + encodeURIComponent("Please add me to the update list." + (val ? " My email: " + val : ""));
      if (input) input.value = "";
    });
  });
})();
