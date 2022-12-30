var home = document.querySelector("header .movie-text-title");
var recommendationsSection = document.querySelector(
  ".credits-section .recommendations-box "
);
var recommendationsTotal = document.querySelector(
  ".credits-section .search .total span"
);
var id = window.location.search.slice(4);
var movies_api =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&append_to_response=recommendations&page=1";

getData(movies_api);

function showRecommendationsSerie(results) {
  var listMovie = [];
  recommendationsTotal.textContent =
    results.recommendations.results.length + " Recommended Serie";

  if (results.recommendations.results.length > 10) {
    pagination(results.recommendations.results);
  }
}

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showRecommendationsSerie(data);
}

function pagination(data) {
  $(".pagination").pagination({
    dataSource: data,
    className: "paginationjs-theme-red",
    pageSize: 10,
    callback: function (data) {
      recommendationsSection.innerHTML = ``;
      for (let i = 0; i < data.length; i++) {
        var { id, name, poster_path, vote_average } = data[i];
        console.log(data[i]);
        var movie = document.createElement("div");
        movie.classList.add("recommended-movie");
        movie.innerHTML = `
        <div class="img">
        <img src="${
          poster_path != null
            ? "https://image.tmdb.org/t/p/original" + poster_path
            : "images/No-Image-Placeholder.svg"
        }" alt="">
        <div class="info">
            <!-- <ul class="category">
                <li class="action">action</li>
                <li class="crime">crime</li>
            </ul> -->
            <h2 class="title">${name}</h2>
            <p class="rating">
                <i class="bi bi-star-fill star"></i>
                <span>${vote_average}</span>/10
            </p>
        </div>
        <a href="single-page-serie.html?id=${
          id +
          "-" +
          name.replaceAll(/[(\s)]/g, "-").replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
        }" target="_blank">Read more
            <i class="bi bi-caret-right-fill"></i>
        </a>
        </div>
        `;
        recommendationsSection.append(movie);
      }
    },
  });
}
