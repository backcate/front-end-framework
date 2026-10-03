//------Mobile Menu
const menuButton = document.querySelector(".mobileMenuButton");
const offcanva = document.querySelector(".mobileOffcanva");
const menu = document.querySelector(".mobileMenu");
const closeButton = menu.querySelector("button");

menuButton.onclick = () => {
    menu.classList.remove("hidden");
    offcanva.classList.remove("hidden");

    setTimeout(() => {
        menu.classList.remove("translate-x-full");
    }, 10);
};

closeButton.onclick = () => {
    menu.classList.add("translate-x-full");

    setTimeout(() => {
        menu.classList.add("hidden");
        offcanva.classList.add("hidden");
    }, 300);
};

offcanva.onclick = () => {
    menu.classList.add("translate-x-full");

    setTimeout(() => {
        menu.classList.add("hidden");
        offcanva.classList.add("hidden");
    }, 300);
};

// live time
function liveTime() {
  let now = new Date();
  let localFormate = now.toLocaleString();
  let showMessage = document.getElementById("time");

  showMessage.innerHTML = localFormate;
}

liveTime();
setInterval(liveTime, 1000);

import { documents, interviews, gallery } from "./data2.js";

const $ = (id) => document.getElementById(id);

// Shared Tailwind class groups
const CARD =
  "group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-amber-500/60";
const BODY = "flex flex-1 flex-col gap-2 p-5";
const TITLE = "text-xl font-bold text-white";
const BTN =
  "rounded-lg border border-amber-800 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-800 hover:text-white";
const BTN_FILL =
  "rounded-lg bg-amber-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-900";
const MEDIA = "mt-3 rounded-lg border border-slate-700 bg-slate-900/60 p-5";

// ---------- Card templates ----------
const documentCard = (doc) => `
  <article class="${CARD}">
    <div class="${BODY}">
      <div class="self-start rounded-full bg-yellow-400/15 px-3 py-1 text-xs font-bold text-yellow-300">${doc.category}</div>
      <h2 class="${TITLE}">${doc.title}</h2>
      <p class="text-sm text-slate-400"><strong class="text-slate-300">Date:</strong> ${doc.date}</p>
      <p class="text-slate-400">${doc.description}</p>
      <p class="text-sm text-slate-400"><strong class="text-slate-300">Source:</strong> ${doc.source}</p>
      <div class="mt-auto flex justify-end pt-3">
        <button class="${BTN}" data-id="${doc.id}">View Details</button>
      </div>
    </div>
  </article>`;

const mediaBox = (item) => {
  if (item.mediaType === "Audio") {
    return `
      <div class="${MEDIA}">
        <p class="mb-3 font-semibold text-amber-200">Audio Interview</p>
        <audio controls class="w-full"><source src="${item.audioUrl}" type="audio/mpeg"></audio>
      </div>`;
  }
  if (item.mediaType === "Video") {
    return `
      <div class="${MEDIA}">
        <p class="mb-3 font-semibold text-amber-200">Video Interview</p>
        <div class="aspect-video">
          <iframe class="h-full w-full rounded-lg" src="${item.videoUrl}" title="${item.name} Interview" allowfullscreen></iframe>
        </div>
      </div>`;
  }
  return `
    <div class="mt-3 rounded-lg border border-slate-800 bg-slate-800 p-5 text-center">
      <p class="font-semibold text-slate-400">Media not available</p>
    </div>`;
};

const interviewCard = (item) => `
  <article class="${CARD}">
    <div class="${BODY}">
      <div class="self-start rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300">${item.role}</div>
      <h2 class="${TITLE}">${item.name}</h2>
      <p class="text-slate-400"><strong class="text-slate-100">Biography:</strong> ${item.biography}</p>
      <p class="text-slate-400"><strong class="text-slate-100">Interview Summary:</strong> ${item.summary}</p>
      ${mediaBox(item)}
    </div>
  </article>`;

const galleryCard = (photo) => `
  <div class="relative shadow-xl">
            <figure class="h-75">
                <img class="bg-center bg-no-repeat bg-cover w-full h-full" src="${photo.image}" alt="${photo.title}"/>
            </figure>
            <button type="button" class="absolute top-0 left-0 w-full h-full cursor-pointer hover:bg-gray-800/30 transition-all" onclick="zoom_${photo.id}.showModal()"></button>
            <dialog id="zoom_${photo.id}" class="modal">
                <div class="modal-box max-w-200!">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><i class="fa-solid fa-xmark"></i></button>
                    </form>
                    <figure class="h-100">
                        <img class="bg-center bg-no-repeat bg-cover w-full h-full" src="${photo.image}" alt="${photo.title}"/>
                    </figure>
                    <div class="mt-2.5">
                        <h1 class="text-xl font-semibold">${photo.title}</h1>
                        <p>${photo.description}</p>
                        <button class="bg-pink-950 py-2 px-3 rounded-lg text-white mt-2.5 cursor-pointer" data-download="${photo.id}">Download <i class="fa-solid fa-download"></i></button>
                    </div>
                </div>
            </dialog>
        </div>`;

// ---------- Small reusable helpers ----------
function render(containerId, items, cardTemplate) {
  $(containerId).innerHTML = items.map(cardTemplate).join("");
}

// Buttons with data-filter="Category" re-render the list
function setupFilter(containerId, items, cardTemplate) {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      const list =
        category === "All"
          ? items
          : items.filter((item) => item.category === category);
      render(containerId, list, cardTemplate);
    });
  });
}

// Buttons with data-id="1" inside a container open a modal for that item
function setupModal(containerId, items, openModal) {
  $(containerId).addEventListener("click", (event) => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    openModal(items.find((item) => item.id === Number(button.dataset.id)));
  });
}

// Fetch the image as a file, then save it directly (no new tab)
function downloadImage(photo) {
    fetch(photo.image)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = photo.title + ".jpg";

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error("Download failed:", error);
        });
}

document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-download]");

    if (!button) return;

    const id = Number(button.dataset.download);
    const photo = gallery.find(item => item.id === id);

    if (photo) {
        downloadImage(photo);
    }
});

// ---------- Modals ----------
function openDocument(doc) {
  $("modalTitle").innerText = doc.title;
  $("modalCategory").innerText = "Category: " + doc.category;
  $("modalDate").innerText = "Date: " + doc.date;
  $("modalSource").innerText = "Source: " + doc.source;
  $("modalDescription").innerText = doc.description;
  $("documentModal").showModal();
}

function openPhoto(photo) {
  $("imageModalTitle").innerText = photo.title;
  $("imageModalPhoto").src = photo.image;
  $("imageModalDescription").innerText = photo.description;
  $("imageModal").showModal();
}

// ---------- Contact form ----------
function setupContactForm() {
  const form = $("contactForm");
  const messageBox = $("formMessage");

  const showMessage = (text, colorClass) => {
    messageBox.innerText = text;
    messageBox.className = "text-sm font-semibold " + colorClass;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("name").value.trim();
    const email = $("email").value.trim();
    const subject = $("subject").value.trim();
    const message = $("message").value.trim();

    if (!name || !email || !subject || !message) {
      return showMessage(
        "Please fill in all required fields.",
        "text-yellow-600",
      );
    }
    if (!email.includes("@")) {
      return showMessage(
        "Please enter a valid email address.",
        "text-yellow-600",
      );
    }

    showMessage(
      "Your message has been submitted successfully.",
      "text-amber-400",
    );
    form.reset();
  });
}

// ---------- Start (each page only runs what it has) ----------
if ($("documentsContainer")) {
  render("documentsContainer", documents, documentCard);
  setupFilter("documentsContainer", documents, documentCard);
  setupModal("documentsContainer", documents, openDocument);
}

if ($("interviewsContainer")) {
  render("interviewsContainer", interviews, interviewCard);
}

if ($("galleryContainer")) {
  render("galleryContainer", gallery, galleryCard);
  setupFilter("galleryContainer", gallery, galleryCard);
  setupModal("galleryContainer", gallery, openPhoto);
  setupDownload("galleryContainer", gallery);
}

if ($("contactForm")) {
  setupContactForm();
}
