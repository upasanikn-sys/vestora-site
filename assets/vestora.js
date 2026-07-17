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

  /* --- toast: visible confirmation for mailto-based CTAs --- */
  var toast = document.createElement("div");
  toast.className = "toast"; toast.setAttribute("role", "status"); toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  var toastTimer;
  function showToast(html) {
    toast.innerHTML = html; toast.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("on"); }, 7000);
  }
  function mailtoDone() {
    showToast("<b>Email draft opened.</b> Send it and you're done — a human replies within 48 hours " +
      "(check spam). No email app? Write to <b>hello@vestora.app</b>.");
  }

  /* --- Windows download buttons (.js-dl) --- */
  document.querySelectorAll(".js-dl").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (DOWNLOAD_URL) { window.location.href = DOWNLOAD_URL; return; }
      e.preventDefault();
      window.location.href = "mailto:hello@vestora.app?subject=" +
        encodeURIComponent("Vestora for Windows — early access request") +
        "&body=" + encodeURIComponent("Hi — I'd like early access to Vestora for Windows.");
      mailtoDone();
    });
  });

  /* --- coming-soon platforms ([data-notify]) --- */
  document.querySelectorAll("[data-notify]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var p = el.getAttribute("data-notify");
      window.location.href = "mailto:hello@vestora.app?subject=" +
        encodeURIComponent("Notify me — Vestora for " + p);
      mailtoDone();
    });
  });

  /* --- mobile menu (aria-expanded tracked) --- */
  var mb = document.querySelector(".menu-btn");
  var mm = document.querySelector(".mobile-menu");
  if (mb && mm) {
    mb.setAttribute("aria-expanded", "false");
    mb.addEventListener("click", function () {
      var open = mm.classList.toggle("open");
      mb.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mm.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mm.classList.remove("open"); mb.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- Resources dropdown: keyboard + touch accessible (hover still works via CSS) --- */
  document.querySelectorAll(".dropdown").forEach(function (dd) {
    var trigger = dd.querySelector(":scope > a");
    var menu = dd.querySelector(".dropdown-menu");
    if (!trigger || !menu) return;
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
    function setOpen(open) {
      dd.classList.toggle("open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    trigger.addEventListener("click", function (e) {
      e.preventDefault();                        // first activation opens the menu instead of navigating
      setOpen(!dd.classList.contains("open"));
    });
    dd.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setOpen(false); trigger.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!dd.contains(e.target)) setOpen(false);
    });
  });

  /* --- decorative inline SVGs: hide from screen readers --- */
  document.querySelectorAll("svg:not([role])").forEach(function (s) {
    s.setAttribute("aria-hidden", "true");
  });

  /* --- nav shadow on scroll --- */
  var hdr = document.querySelector("header");
  if (hdr) {
    addEventListener("scroll", function () {
      hdr.style.boxShadow = scrollY > 10 ? "0 8px 30px rgba(0,0,0,.35)" : "none";
    });
  }

  /* --- FAQ accordion (pricing) — keyboard accessible --- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.setAttribute("role", "button");
    q.setAttribute("tabindex", "0");
    q.setAttribute("aria-expanded", "false");
    function toggle() {
      var item = q.closest(".faq-item");
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (i) {
        i.classList.remove("open");
        var qq = i.querySelector(".faq-q"); if (qq) qq.setAttribute("aria-expanded", "false");
      });
      if (!open) { item.classList.add("open"); q.setAttribute("aria-expanded", "true"); }
    }
    q.addEventListener("click", toggle);
    q.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
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
      if (typeof mailtoDone === "function") mailtoDone();
    });
  });
})();
