import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImages, perPage } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const inputSearch = document.querySelector('[name="search"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-images');

const localKey = 'input-name-image';
const formData = { search: '' };
let page = 1, galleryData = { totalHits: 0 };

initialize();

function initialize() {
    loadMoreBtn.style.display = 'none';
    const localData = JSON.parse(localStorage.getItem(localKey));
    if (localData) {
        inputSearch.value = localData.search;
        formData.search = localData.search;
    }

    form.addEventListener('input', saveToLocalStorage);
    form.addEventListener('submit', handleSearch);
    loadMoreBtn.addEventListener('click', loadMoreImages);
}

function saveToLocalStorage(e) {
    formData.search = e.target.value.trim();
    localStorage.setItem(localKey, JSON.stringify(formData));
}

async function handleSearch(e) {
    e.preventDefault();
    resetGallery();

    const searchQuery = inputSearch.value.trim();
    if (!searchQuery) return showMessage('info', 'The field must be filled');

    await fetchImages(searchQuery, 1);
}

async function loadMoreImages() {
    page += 1;

    try {
        await fetchImages(formData.search, page, true);
    } catch (error) {
        console.error('Error loading more images:', error);
        showMessage('error', 'Failed to load more images. Please try again later!');
    }
}

async function fetchImages(search, currentPage, append = false) {
    toggleLoader(true);

    try {
        const response = await getImages(search, currentPage);
        const { hits, totalHits } = response;

        if (!hits.length) return showMessage('warning', 'Sorry, no images match your query!');

        galleryData.totalHits = totalHits;
        append ? appendGallery(hits) : renderGallery(hits, gallery);

        hits.length < perPage || currentPage * perPage >= totalHits
            ? hideLoadMoreButton()
            : showLoadMoreButton();

    } catch (error) {
        console.error(error);
        showMessage('error', 'Something went wrong. Please try again later!');
    } finally {
        toggleLoader(false);
    }
}

function resetGallery() {
    gallery.innerHTML = '';
    hideLoadMoreButton();
    toggleLoader(false);
    page = 1;
}

function appendGallery(hits) {
    renderGallery(hits, gallery);
    scrollToNewImages();
}

function toggleLoader(show) {
    const loader = document.querySelector('.loader');
    if (show) {
        if (!loader) gallery.insertAdjacentHTML('beforeend', '<div class="loader"></div>');
    } else {
        if (loader) loader.remove();
    }
}

function showLoadMoreButton() {
    loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
    loadMoreBtn.style.display = 'none';
}

function scrollToNewImages() {
    const firstImage = document.querySelector('.list-item');
    if (!firstImage) return;

    const { height } = firstImage.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
}

function showMessage(type, message) {
    const bgColor = {
        success: 'rgb(0, 255, 128, 0.7)',
        info: 'rgb(76, 153, 255, 0.7)',
        warning: 'rgb(255, 193, 7, 0.7)',
        error: 'rgb(255, 76, 76, 0.7)',
    };

    iziToast.show({
        message,
        messageColor: 'white',
        position: "topRight",
        backgroundColor: bgColor[type],
    });
}
