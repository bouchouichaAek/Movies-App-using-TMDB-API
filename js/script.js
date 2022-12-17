var originalTitlePopular = document.querySelectorAll(
  ".what-is-popular .filter-boxs .title"
);
var posterPopular = document.querySelectorAll(
  ".what-is-popular .filter-boxs img"
);
var ratingPopular = document.querySelectorAll(
  ".what-is-popular .filter-boxs .info .rating span"
);
var categoryPopular = document.querySelectorAll(
  ".what-is-popular .filter-boxs .info ul.category"
);
var filterListPopular = document.querySelectorAll(
  ".what-is-popular .filtering .filter li"
);

var listTypePopular = document.querySelectorAll(
  ".what-is-popular .filtering .filter li"
);
var singlePageLinkPopular = document.querySelectorAll(
  ".what-is-popular .filter-boxs .img a"
);
// ###############################################################
var originalTitleCoomingSoon = document.querySelectorAll(
  ".comming-soon .filter-boxs .title"
);
var posterCoomingSoon = document.querySelectorAll(
  ".comming-soon .filter-boxs img"
);
var ratingCoomingSoon = document.querySelectorAll(
  ".comming-soon .filter-boxs .info .rating span"
);
var categoryCoomingSoon = document.querySelectorAll(
  ".comming-soon .filter-boxs .info ul.category"
);
var filterListCoomingSoon = document.querySelectorAll(
  ".comming-soon .filtering .filter li"
);

var listTypeCoomingSoon = document.querySelectorAll(
  ".comming-soon .filtering .filter li"
);

var singlePageLinkCoomingSoon = document.querySelectorAll(
  ".comming-soon .filter-boxs .img a"
);
// ###############################################################
var originalTitleTopRated = document.querySelectorAll(
  ".top-rated .filter-boxs .title"
);
var posterTopRated = document.querySelectorAll(".top-rated .filter-boxs img");
var ratingTopRated = document.querySelectorAll(
  ".top-rated .filter-boxs .info .rating span"
);
var categoryTopRated = document.querySelectorAll(
  ".top-rated .filter-boxs .info ul.category"
);
var filterListTopRated = document.querySelectorAll(
  ".top-rated .filtering .filter li"
);

var listTypeTopRated = document.querySelectorAll(
  ".top-rated .filtering .filter li"
);
var singlePageLinkTopRated = document.querySelectorAll(
  ".top-rated .filter-boxs .img a"
);

var api_key = "ee9ddd028297c7c00ad6168b72365519";
var Moviesimage = "https://image.tmdb.org/t/p/original";
var type = "movie";
var popular =
  "https://api.themoviedb.org/3/movie/popular?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1";
var comming_soon =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1";
var top_rated =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1";

showPopular(popular);
showCommingSoon(comming_soon);
showTopRated(top_rated);

filterListPopular.forEach((el) => {
  el.addEventListener("click", function (e) {
    filterListPopular.forEach((el) => {
      el.classList.remove("active");
      e.target.classList.add("active");
    });
    listTypePopular.forEach((ele) => {
      if (ele.classList.contains("active")) {
        console.log(ele.dataset["filter"]);
        if (ele.dataset["filter"] == "movies") {
          showPopular(
            "https://api.themoviedb.org/3/movie/popular?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
          );
        } else {
          showPopular(
            "https://api.themoviedb.org/3/tv/popular?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
          );
        }
      }
    });
  });
});

filterListCoomingSoon.forEach((el) => {
  el.addEventListener("click", function (e) {
    filterListCoomingSoon.forEach((el) => {
      el.classList.remove("active");
      e.target.classList.add("active");
    });
    listTypeCoomingSoon.forEach((ele) => {
      if (ele.classList.contains("active")) {
        console.log(ele.dataset["filter"]);
        if (ele.dataset["filter"] == "movies") {
          showCommingSoon(
            "https://api.themoviedb.org/3/movie/upcoming?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
          );
        } else {
          showCommingSoon(
            "https://api.themoviedb.org/3/tv/on_the_air?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
          );
        }
      }
    });
  });
});

filterListTopRated.forEach((el) => {
  el.addEventListener("click", function (e) {
    filterListTopRated.forEach((el) => {
      el.classList.remove("active");
      e.target.classList.add("active");
    });
    listTypeTopRated.forEach((ele) => {
      if (ele.classList.contains("active")) {
        console.log(ele.dataset["filter"]);
        if (ele.dataset["filter"] == "movies") {
          showTopRated(
            "https://api.themoviedb.org/3/movie/top_rated?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
          );
        } else {
          showTopRated(
            "https://api.themoviedb.org/3/tv/top_rated?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
          );
        }
      }
    });
  });
});

function showPopular(popular) {
  fetch(popular)
    .then((response) => response.json())
    .then((response) => response["results"])
    .then(function (response) {
      var listName = [];
      var listIamge = [];
      var listRating = [];
      var listIds = [];
      for (let i = 0; i < response.length; i++) {
        if (!popular.includes("tv")) {
          listName.push(response[i].title);
        } else {
          listName.push(response[i].name);
        }
        listIamge.push(Moviesimage + response[i].poster_path);
        listRating.push(response[i].vote_average);
        listIds.push(response[i].id);
      }
      // console.log(response);
      originalTitlePopular.forEach((el, index, array) => {
        el.textContent = listName[index];
      });
      posterPopular.forEach((el, index, array) => {
        el.setAttribute("src", listIamge[index]);
      });
      ratingPopular.forEach((el, index, array) => {
        el.textContent = listRating[index];
      });
      singlePageLinkPopular.forEach((el, index, array) => {
        el.href = "single-page.html?id=" + listIds[index];
        el.setAttribute("target", "_blank");
      });
    });
}
//
function showCommingSoon(comming_soon) {
  fetch(comming_soon)
    .then((response) => response.json())
    .then((response) => response["results"])
    .then(function (response) {
      var listName = [];
      var listIamge = [];
      var listRating = [];
      var listIds = [];

      for (let i = 0; i < response.length; i++) {
        if (!comming_soon.includes("tv")) {
          listName.push(response[i].title);
        } else {
          listName.push(response[i].name);
        }
        listIamge.push(Moviesimage + response[i].poster_path);
        listRating.push(response[i].vote_average);
        listIds.push(response[i].id);
      }
      originalTitleCoomingSoon.forEach((el, index, array) => {
        el.textContent = listName[index];
      });
      posterCoomingSoon.forEach((el, index, array) => {
        el.setAttribute("src", listIamge[index]);
      });
      ratingCoomingSoon.forEach((el, index, array) => {
        el.textContent = listRating[index];
      });
      singlePageLinkCoomingSoon.forEach((el, index, array) => {
        el.href = "single-page.html?id=" + listIds[index];
        el.setAttribute("target", "_blank");
      });
    });
}
function showTopRated(top_rated) {
  fetch(top_rated)
    .then((response) => response.json())
    .then((response) => response["results"])
    .then(function (response) {
      var listName = [];
      var listIamge = [];
      var listRating = [];
      var listIds = [];
      for (let i = 0; i < response.length; i++) {
        if (!top_rated.includes("tv")) {
          listName.push(response[i].title);
        } else {
          listName.push(response[i].name);
        }
        listIamge.push(Moviesimage + response[i].poster_path);
        listRating.push(response[i].vote_average);
        listIds.push(response[i].id);
      }
      originalTitleTopRated.forEach((el, index, array) => {
        el.textContent = listName[index];
      });
      posterTopRated.forEach((el, index, array) => {
        el.setAttribute("src", listIamge[index]);
      });
      ratingTopRated.forEach((el, index, array) => {
        el.textContent = listRating[index];
      });
      singlePageLinkTopRated.forEach((el, index, array) => {
        el.href = "single-page.html?id=" + listIds[index];
        el.setAttribute("target", "_blank");
      });
    });
}
