import axios from "axios";
import Notiflix from "notiflix";
import { createGalleryItem } from "./createGalleryItem.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = "8543283-ac41910cbcd5ccb3a6a09e0db";
const API_URL = "https://pixabay.com/api/?";
const LIMIT = 40;
const searchFormEl = document.querySelector("#search-form");
const galleryEl = document.querySelector("#gallery");
const loadMoreEl = document.querySelector("#load-more");

let currentPage = 1;
let totalPages = 0;
let querySearch = "";

const createSearchParams = () =>
  new URLSearchParams({
    key: API_KEY,
    q: querySearch,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: currentPage,
    per_page: LIMIT,
  });

const fetchPhotos = async () => {
  try {
    const response = await axios.get(API_URL + createSearchParams());
    if (response.data.hits.length === 0) throw new Error();
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
  }
};

const createFirstPhotos = async () => {
  const data = await fetchPhotos();
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  totalPages = Math.ceil(data.totalHits / LIMIT);
  data.hits.forEach(photo => createGalleryItem(galleryEl, loadMoreEl, photo));
  new SimpleLightbox("#gallery a");
};

const showMorePhotos = async () => {
  currentPage++;
  try {
    if (currentPage > totalPages) throw new Error(error);
    const data = await fetchPhotos();
    data.hits.forEach(photo => createGalleryItem(galleryEl, loadMoreEl, photo));
    new SimpleLightbox("#gallery a");
  } catch (error) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
};

const createGallery = event => {
  event.preventDefault();
  querySearch = event.currentTarget.elements.searchQuery.value;
  currentPage = 1;
  totalPages = 0;
  galleryEl.innerHTML = "";
  loadMoreEl.classList.add("hidden");
  createFirstPhotos();
};

searchFormEl.addEventListener("submit", createGallery);
loadMoreEl.addEventListener("click", () => showMorePhotos());

console.log("Hello from app.js");
