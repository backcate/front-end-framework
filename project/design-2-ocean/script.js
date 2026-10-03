import { guides, crops, pests } from "./data.js";

const $ = (id) => document.getElementById(id);

const MODAL = "bg-white rounded-lg border-t-8 border-sky-500";
const badge = (t) => `<span class="bg-sky-100 text-sky-800 px-2 py-0.5 rounded text-xs font-semibold">${t}</span>`;
const btn = (id, label) => `<button data-id="${id}" class="mt-2 border border-sky-600 text-sky-700 px-4 py-1.5 rounded text-sm font-semibold hover:bg-sky-600 hover:text-white">${label}</button>`;
const shell = ({ img, title, tags, body, action }) => `
  <article class="flex flex-col sm:flex-row bg-white border-l-8 border-sky-500 shadow rounded-lg overflow-hidden">
    <img src="${img}" alt="${title}" class="sm:w-60 h-44 sm:h-auto object-cover">
    <div class="p-5 flex-1 space-y-2">
      <h2 class="text-xl font-extrabold text-sky-900">${title}</h2>
      <div class="flex flex-wrap gap-1">${tags}</div>
      ${body}${action}
    </div>
  </article>`;

const SEVERITY = { Low: "bg-green-500", Medium: "bg-yellow-500", High: "bg-orange-500", Critical: "bg-red-600" };
const line = (label, text) => `<p class="text-sm opacity-80"><b>${label}:</b> ${text}</p>`;
const list = (items) => items.map((i) => `<li>${i}</li>`).join("");

// ---------- Helpers ----------
function render(containerId, items, cardTemplate) {
  $(containerId).innerHTML = items.length
    ? items.map(cardTemplate).join("")
    : `<p class="text-2xl text-center col-span-full">No data found</p>`;
}

function setupModal(containerId, items, openFn) {
  $(containerId).addEventListener("click", (event) => {
    const button = event.target.closest("[data-id]");
    if (button) openFn(items.find((item) => item.id === Number(button.dataset.id)));
  });
}

function openModal(title, body) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4";
  modal.innerHTML = `
    <div class="${MODAL} max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold">${title}</h3>
        <button class="btn btn-sm btn-circle btn-ghost" data-close>✕</button>
      </div>
      ${body}
      <a href="contact.html" class="btn btn-sm btn-primary mt-6">Contact an Agricultural Expert</a>
    </div>`;
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-close]")) modal.remove();
  });
  document.body.appendChild(modal);
}

// ---------- Cards ----------
const guideCard = (g) => shell({
  img: g.image, title: g.title,
  tags: [g.category, g.season, g.method].map(badge).join(""),
  body: `<p class="text-sm opacity-80">${g.summary}</p><p class="text-xs opacity-60">⏱ ${g.duration}</p>`,
  action: btn(g.id, "View Full Guide"),
});

const cropCard = (c) => shell({
  img: c.image, title: c.name,
  tags: badge(c.category),
  body: line("Varieties", c.varieties) + line("Soil", c.soil) + line("Water", c.water) + line("Growth", c.growthDuration),
  action: btn(c.id, "View Full Details"),
});

const pestCard = (p) => shell({
  img: p.image, title: p.name,
  tags: `<span class="${SEVERITY[p.severity]} text-white text-xs font-bold px-2 py-1 rounded">${p.severity}</span>` +
        badge(p.type) + p.affects.map(badge).join(""),
  body: line("Symptoms", p.symptoms) + line("Identification", p.identification) +
        `<ul class="list-disc list-inside text-xs opacity-80 bg-gray-500/10 p-2 rounded">${list(p.ipm)}</ul>`,
  action: "",
});

// ---------- Modals ----------
const openGuide = (g) => openModal(g.title, `
  <img src="${g.image}" alt="${g.title}" class="w-full h-64 object-cover rounded mb-4">
  <p class="mb-4">${g.summary}</p>
  <h4 class="font-bold text-lg">Steps</h4>
  <ol class="list-decimal list-inside space-y-2 bg-gray-500/10 p-4 rounded">${list(g.steps)}</ol>
  <h4 class="font-bold text-lg mt-4">Expert Tips</h4>
  <ul class="list-disc list-inside space-y-2 bg-gray-500/10 p-4 rounded">${list(g.tips)}</ul>`);

const openCrop = (c) => openModal(c.name, `
  <img src="${c.image}" alt="${c.name}" class="w-full h-64 object-cover rounded mb-4">
  <div class="space-y-2">
    ${line("Varieties", c.varieties)}${line("Soil", c.soil)}${line("Water", c.water)}
    ${line("Harvest", c.harvestTechnique)}${line("Growth", c.growthDuration)}
    ${line("Nutrition (per 100g)", `${c.nutrition.calories} cal, ${c.nutrition.protein} protein, ${c.nutrition.carbs} carbs`)}
    ${line("Uses", c.uses.join(", "))}${line("Tip", c.tips)}
  </div>`);

// ---------- Pages ----------
function setupGuides() {
  const filters = { category: $("filterCropType"), season: $("filterSeason"), method: $("filterMethod") };
  const show = () => {
    const result = guides.filter((g) =>
      Object.entries(filters).every(([key, select]) => select.value === "all" || g[key] === select.value));
    render("guidesContainer", result, guideCard);
  };
  Object.values(filters).forEach((select) => select.addEventListener("change", show));
  show();
  setupModal("guidesContainer", guides, openGuide);
}

function setupCrops() {
  const select = $("filterCropCategory");
  const show = () => {
    const result = select.value === "all" ? crops : crops.filter((c) => c.category === select.value);
    render("cropsContainer", result, cropCard);
  };
  select.addEventListener("change", show);
  show();
  setupModal("cropsContainer", crops, openCrop);
}

function setupContactForm() {
  const status = $("status");
  const showMessage = (text, color) =>
    (status.innerHTML = `<div class="bg-${color}-100 text-${color}-700 p-3 rounded-lg">${text}</div>`);

  $("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!$("name").value.trim() || !$("email").value.trim() || !$("subject").value || $("message").value.trim().length < 10) {
      return showMessage("Please fill all fields correctly (message min 10 chars)", "red");
    }
    showMessage("Message sent successfully! We will contact you soon.", "green");
    event.target.reset();
  });
}

// ---------- Start ----------
if ($("guidesContainer")) setupGuides();
if ($("cropsContainer")) setupCrops();
if ($("pestsContainer")) render("pestsContainer", pests, pestCard);
if ($("contactForm")) setupContactForm();
if ($("live-date")) $("live-date").innerText = new Date().getFullYear();
