//======================= Live_time--------------
function liveTime() {
    let now = new Date();
    let localFormate = now.toLocaleString();
    let showMessage = document.getElementById("time");

    showMessage.innerHTML = localFormate;
}
liveTime();
setInterval(liveTime, 1000);

//======================= MixitUp--------------
var mixer = mixitup('.menu-item');


//======================= Live Search and Category Filter--------------
// Select HTML elements
const searchInput = document.querySelector("[data-doc-search]");
const categoryFilter = document.getElementById("docFilter");
const documentCards = document.querySelectorAll(".doc-card");
const noResultsMessage = document.getElementById("noDocs");
// Filter documents
function filterDocuments() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    let visibleCount = 0;

    documentCards.forEach((card) => {
        const titleAndText = card.innerText.toLowerCase();
        const searchKeywords = card.dataset.search.toLowerCase();
        // Check if the document matches the search
        const matchesSearch = titleAndText.includes(searchText) || searchKeywords.includes(searchText);
        // Check if the document matches the category
        const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
        // Show or hide the document
        const shouldShow = matchesSearch && matchesCategory;

        card.classList.toggle("hidden", !shouldShow);

        if (shouldShow) {
            visibleCount++;
        }
    });

    // Show message when no documents match
    noResultsMessage.classList.toggle("hidden", visibleCount > 0);
}
// Listen for search input
searchInput.addEventListener("input", filterDocuments);
// Listen for category changes
categoryFilter.addEventListener("change", filterDocuments);


//======================= Live Search and Category Filter 2--------------
function filterDocuments() {
    let filter = document.getElementById("documentFilter").value;
    let documents = document.querySelectorAll(".document-card");

    documents.forEach(function(documentCard) {
        let type = documentCard.getAttribute("data-type");

        if (filter === "all" || type === filter) {
            documentCard.style.display = "block";
        } else {
            documentCard.style.display = "none";
        }
    });
}