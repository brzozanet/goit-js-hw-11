import axios from "axios";
import Notiflix from "notiflix";

const API_URL = "https://pixabay.com/api/";
const API_KEY = "8543283-ac41910cbcd5ccb3a6a09e0db";
const PHOTO_PER_PAGE = 40;

const searchFormEl = document.querySelector("#search-form");
const galleryEl = document.querySelector(".gallery");

let querySearch = "";
querySearch = "pieniny";

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

console.log(searchParams());
console.log(fetchPhotos());
