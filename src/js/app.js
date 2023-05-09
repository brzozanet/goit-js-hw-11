import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createGalleryItem } from "./createGalleryItem";

const API_URL = "https://pixabay.com/api/";
const API_KEY = "8543283-ac41910cbcd5ccb3a6a09e0db";
const PHOTO_PER_PAGE = 40;

let querySearch = "";
let page = 1;

const searchFormEl = document.querySelector("#search-form");
const galleryEl = document.querySelector(".gallery");
const loadMoreBtnEl = document.querySelector(".load-more");

const searchParams = () =>
  new URLSearchParams({
    key: API_KEY,
    q: querySearch,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: PHOTO_PER_PAGE,
  });

const fetchPhotos = async () => {
  try {
    const response = await axios.get(`${API_URL}?${searchParams()}`);
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(
      "Sorry, there are no images matching your search query. Please try again."
    );
  }
};

const createGallery = event => {
    event.preventDefault();
    galleryEl.innerHTML = "";
    querySearch = event.currentTarget.elements.searchQuery.value.trim();
    if (querySearch === "") {
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    fetchPhotos().then(data => {
        if (data.hits.length === 0) {
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        galleryEl.insertAdjacentHTML("beforeend", data.hits.map(createGalleryItem).join(""));
    });
    loadMoreBtnEl.classList.remove("is-hidden");
};

searchFormEl.addEventListener("submit", createGallery);
