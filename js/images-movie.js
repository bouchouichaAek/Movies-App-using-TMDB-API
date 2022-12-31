var home = document.querySelector("header .movie-text-title");
var imagesTotal = document.querySelector(
  ".credits-section .search .total span"
);
var trilarContent = document.querySelector(".video-trailer iframe");
var video = document.querySelector(".video-trailer");
var closVideo = document.querySelector(".video-trailer i");
var imagesSection = document.querySelector(".credits-section .images-box");
var submit = document.querySelector(".credits-section .search form");

var select = document.querySelector(".credits-section .search form select");
var id = window.location.search.slice(
  4,
  4 + window.location.search.slice(4).indexOf("&")
);

var urlLink = window.location;
var movies_api =
  "https://api.themoviedb.org/3/movie/" +
  id +
  "/images?api_key=ee9ddd028297c7c00ad6168b72365519";

getData(movies_api, urlLink);
getData(
  "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=ee9ddd028297c7c00ad6168b72365519&append_to_response=videos",
  urlLink
);

function showMovieInfo(results, url) {
  var { id, name, title, poster_path, release_date } = results;
  home.innerHTML = `
  <img src="${
    poster_path != null
      ? "https://image.tmdb.org/t/p/original" + poster_path
      : "images/No-Image-Placeholder.svg"
  }" alt="">
  <div class="text-movie">
    <a href="${
      url.includes("tv")
        ? "single-page-serie.html?id=" +
          id +
          "-" +
          name.replaceAll(/[(\s)]/g, "-").replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
        : "single-page-movie.html?id=" +
          id +
          "-" +
          title.replaceAll(/[(\s)]/g, "-").replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
    }" >
        <h1>${title} <span>(${getYerar(release_date)})</span></h1>
    </a>
    <a href="${
      url.includes("tv")
        ? "single-page-serie.html?id=" +
          id +
          "-" +
          name.replaceAll(/[(\s)]/g, "-").replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
        : "single-page-movie.html?id=" +
          id +
          "-" +
          title.replaceAll(/[(\s)]/g, "-").replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
    }">
        <p><i class="bi bi-arrow-left"></i> Back to main.</p>
    </a>
  </div>`;
}

function showMovieBackdrops(results) {
  console.log();
  if (results.hasOwnProperty("backdrops")) {
    imagesTotal.textContent = results.backdrops.length + " backdrops";
    for (let i = 0; i < results.backdrops.length; i++) {
      var { file_path } = results.backdrops[i];
      var image = document.createElement("div");
      image.classList.add("image");
      image.innerHTML = `<img src="${
        "https://image.tmdb.org/t/p/original" + file_path
      }" alt="backdrop">`;
      imagesSection.append(image);
    }
  }
}
function showMoviePoster(results) {
  if (results.hasOwnProperty("posters")) {
    imagesTotal.textContent = results.posters.length + " posters";
    for (let i = 0; i < results.posters.length; i++) {
      var { file_path } = results.posters[i];
      var image = document.createElement("div");
      image.classList.add("image");
      image.innerHTML = `<img src="${
        "https://image.tmdb.org/t/p/original" + file_path
      }" alt="backdrop">`;
      imagesSection.append(image);
    }
  }
}
function showMovieVideo(res) {
  imagesTotal.textContent = res.results.length + " videos";
  for (let i = 0; i < res.results.length; i++) {
    var { key, name, type } = res.results[i];
    var image = document.createElement("div");
    image.classList.add("vd-item");
    image.innerHTML = `
    <div class="vd-it">
        <img class="vd-img" src="${
          "https://i.ytimg.com/vi/" + key + "/hqdefault.jpg"
        }" alt="${name}">
        <a class="fancybox-media hvr-grow" onclick = display("https://www.youtube.com/embed/${key}")
            rel="playlist"><img src="images/play-vd.png" alt=""></a>
    </div>
    <div class="vd-infor">
        <h6> <a href="#">${name}</a></h6>
        <p class="time"> 1: 31</p>
    </div>
    `;

    imagesSection.append(image);
  }
  console.log(res);
}

async function getData(url, urlLink) {
  const res = await fetch(url);
  const data = await res.json();
  if (
    url.includes("videos") &&
    (urlLink.search.includes("image") ||
      urlLink.search.includes("poster") ||
      urlLink.search.includes("video"))
  ) {
    showMovieInfo(data, url);
  }
  if (urlLink.search.includes("image")) {
    showMovieBackdrops(data);
  }
  if (urlLink.search.includes("poster")) {
    showMoviePoster(data);
  }
  if (urlLink.search.includes("video") && url.includes("videos")) {
    showMovieVideo(data);
  }
}

closVideo.addEventListener("click", function (e) {
  if (video.style.display === "block") {
    video.style.display = "none";
    var iframeSrc = trilarContent.src;
    trilarContent.src = iframeSrc;
  }
});

function display(source) {
  video.style.display = "block";
  trilarContent.src = source;
}

function getYerar(date) {
  var date = new Date(date);
  let year = date.getFullYear();

  return year;
}
