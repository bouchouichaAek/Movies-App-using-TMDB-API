var listPopular = document.querySelector(
  ".Section.what-is-popular .filter-boxs"
);
var listCoomingSoon = document.querySelector(
  ".Section.comming-soon .filter-boxs"
);
var listTopRated = document.querySelector(".Section.top-rated .filter-boxs");

var home = document.querySelector("header .container nav img");

var filterListPopular = document.querySelectorAll(
  ".what-is-popular .filtering .filter li"
);

var listTypePopular = document.querySelectorAll(
  ".what-is-popular .filtering .filter li"
);
var filterListCoomingSoon = document.querySelectorAll(
  ".comming-soon .filtering .filter li"
);

var listTypeCoomingSoon = document.querySelectorAll(
  ".comming-soon .filtering .filter li"
);
var filterListTopRated = document.querySelectorAll(
  ".top-rated .filtering .filter li"
);

var listTypeTopRated = document.querySelectorAll(
  ".top-rated .filtering .filter li"
);

var submit = document.querySelector("form");
var select = document.querySelector("form select");

var search = document.querySelector(".search .results");

var searchSubmit = document.querySelector(
  "header .container .search-bar input[type='text']"
);

var popular =
  "https://api.themoviedb.org/3/movie/popular?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1";
var comming_soon =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1";
var top_rated =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1";

getData(popular);
getData(comming_soon);
getData(top_rated);

filterListPopular.forEach((el) => {
  el.addEventListener("click", function (e) {
    filterListPopular.forEach((el) => {
      el.classList.remove("active");
      e.target.classList.add("active");
    });
    listTypePopular.forEach((ele) => {
      if (ele.classList.contains("active")) {
        getData(
          "https://api.themoviedb.org/3/" +
            ele.dataset["filter"] +
            "/popular?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
        );
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
        if (ele.dataset["filter"] == "movies") {
          getData(
            "https://api.themoviedb.org/3/movie/upcoming?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
          );
        } else {
          getData(
            "https://api.themoviedb.org/3/tv/on_the_air?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
          );
        }
      }
    });
  });
});
//

filterListTopRated.forEach((el) => {
  el.addEventListener("click", function (e) {
    filterListTopRated.forEach((el) => {
      el.classList.remove("active");
      e.target.classList.add("active");
    });
    listTypeTopRated.forEach((ele) => {
      if (ele.classList.contains("active")) {
        getData(
          "https://api.themoviedb.org/3/" +
            ele.dataset["filter"] +
            "/top_rated?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1"
        );
      }
    });
  });
});

function showPopular(results, url) {
  listPopular.innerHTML = "";
  for (let i = 0; i < results.length; i++) {
    var { id, title, genre_ids, name, vote_average, poster_path } = results[i];
    var box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
    <div class="img">
      <img src="${"https://image.tmdb.org/t/p/original" + poster_path}" alt="">
      <div class="info">
          <h2 class="title">${url.includes("tv") ? name : title}</h2>
          <p class="rating">
              <i class="bi bi-star-fill star"></i>
              <span>${vote_average}</span>/10
          </p>
      </div>
      <a href="${
        url.includes("tv")
          ? "single-page-serie.html?id=" +
            id +
            "-" +
            name.replaceAll(/[(\s)]/g, "-").replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
          : "single-page-movie.html?id=" +
            id +
            "-" +
            title
              .replaceAll(/[(\s)]/g, "-")
              .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
      }" target="_blank">Read more
          <i class="bi bi-caret-right-fill"></i>
      </a>
    </div>
    `;

    listPopular.append(box);
  }
}

function showCommingSoon(results, url) {
  listCoomingSoon.innerHTML = "";
  for (let i = 0; i < results.length; i++) {
    var { id, title, name, vote_average, poster_path } = results[i];
    var box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
    <div class="img">
      <img src="${"https://image.tmdb.org/t/p/original" + poster_path}" alt="">
      <div class="info">
          <h2 class="title">${url.includes("tv") ? name : title}</h2>
          <p class="rating">
              <i class="bi bi-star-fill star"></i>
              <span>${vote_average}</span>/10
          </p>
      </div>
      <a href="${
        url.includes("tv")
          ? "single-page-serie.html?id=" +
            id +
            "-" +
            name.replaceAll(/[(\s)]/g, "-").replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
          : "single-page-movie.html?id=" +
            id +
            "-" +
            title
              .replaceAll(/[(\s)]/g, "-")
              .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
      }" target="_blank">Read more
          <i class="bi bi-caret-right-fill"></i>
      </a>
    </div>
    `;
    listCoomingSoon.append(box);
  }
}

function showTopRated(results, url) {
  listTopRated.innerHTML = "";
  for (let i = 0; i < results.length; i++) {
    var { id, title, name, vote_average, poster_path } = results[i];
    var box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
    <div class="img">
      <img src="${"https://image.tmdb.org/t/p/original" + poster_path}" alt="">
      <div class="info">
          <h2 class="title">${url.includes("tv") ? name : title}</h2>
          <p class="rating">
              <i class="bi bi-star-fill star"></i>
              <span>${vote_average}</span>/10
          </p>
      </div>
      <a href="${
        url.includes("tv")
          ? "single-page-serie.html?id=" +
            id +
            "-" +
            name.replaceAll(/[(\s)]/g, "-").replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
          : "single-page-movie.html?id=" +
            id +
            "-" +
            title
              .replaceAll(/[(\s)]/g, "-")
              .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
      }" target="_blank">Read more
          <i class="bi bi-caret-right-fill"></i>
      </a>
    </div>
    `;
    listTopRated.append(box);
  }
}

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (url.includes("popular")) {
    showPopular(data.results, url);
  }
  if (url.includes("upcoming") || url.includes("on_the_air")) {
    showCommingSoon(data.results, url);
  }
  if (url.includes("top_rated")) {
    showTopRated(data.results, url);
  }
  if (url.includes("search")) {
    showSearch(data.results, url);
  }
}

home.addEventListener("click", () => {
  window.location.reload();
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  var section = document.querySelector("section");
  var searchValue = searchSubmit.value;
  console.log(select.value);
  search.classList.remove("hide");
  section.classList.add("hide");
  searchSubmit.value = "";
  getData(
    "https://api.themoviedb.org/3/search/" +
      select.value +
      "?api_key=ee9ddd028297c7c00ad6168b72365519&query='" +
      searchValue
  );
});

function showSearch(results, url) {
  search.innerHTML = "";
  if (results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      var { id, title, name, vote_average, poster_path } = results[i];
      var result = document.createElement("div");
      result.classList.add("result");
      result.innerHTML = `
      <div class="img">
        <img src="${
          poster_path != null
            ? "https://image.tmdb.org/t/p/original" + poster_path
            : "images/No-Image-Placeholder.svg"
        }" alt="">
        <div class="info">
            <h2 class="title">${url.includes("tv") ? name : title}</h2>
            <p class="rating">
                <i class="bi bi-star-fill star"></i>
                <span>${vote_average}</span>/10
            </p>
        </div>
        <a href="${
          url.includes("tv")
            ? "single-page-serie.html?id=" +
              id +
              "-" +
              name
                .replaceAll(/[(\s)]/g, "-")
                .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
            : "single-page-movie.html?id=" +
              id +
              "-" +
              title
                .replaceAll(/[(\s)]/g, "-")
                .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
        }" target="_blank">Read more
            <i class="bi bi-caret-right-fill"></i>
        </a>
      </div>
      `;
      search.append(result);
    }
  } else {
    var p = document.createElement("p");

    p.innerHTML = `<p>There are no movies that matched your query.</p>`;
    search.append(p);
  }
}
