import { gallery } from "./data.js";

const $ = (id) => document.getElementById(id);

// Shared Tailwind class groups
const CARD = "relative shadow-xl";
const BODY = "modal-box max-w-200!";
const TITLE = "text-xl font-semibold";
const BTN = "absolute top-0 left-0 w-full h-full cursor-pointer hover:bg-gray-800/30 transition-all";
const BTN_FILL = "bg-pink-950 py-2 px-3 rounded-lg text-white mt-2.5 cursor-pointer";

// --------------- gallery Card
const galleryCard = (photo) => 
    `
        <div class="${CARD}">
            <figure>
                <img src="${photo.image}" alt="${photo.title}"/>
            </figure>
            <button type="button" class="${BTN}" onclick="zoom.showModal()"></button>
            <dialog id="zoom" class="modal">
                <div class="${BODY}">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><i class="fa-solid fa-xmark"></i></button>
                    </form>
                    <figure>
                        <img src="${photo.image}" alt="${photo.title}"/>
                    </figure>
                    <div class="mt-2.5">
                        <h1 class="${TITLE}">${photo.title}</h1>
                        <p>${photo.description}</p>
                        <button class="${BTN_FILL}" data-download="">Download <i class="fa-solid fa-download"></i></button>
                    </div>
                </div>
            </dialog>
        </div>
    `

if ($("galleryContainer")) {
    render("galleryContainer", gallery, galleryCard);
    setupFilter("galleryContainer", gallery, galleryCard);
    setupModal("galleryContainer", gallery, openPhoto);
    setupDownload("galleryContainer", gallery);
}