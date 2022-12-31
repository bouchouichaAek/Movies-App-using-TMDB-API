var network_id = window.location.search.slice(
  4,
  4 + window.location.search.slice(4).indexOf("&")
);
var networkShowSection = document.querySelector(
  ".credits-section .recommendations-box "
);
var networkShowTotal = document.querySelector(
  ".credits-section .search .total span"
);
var networkInfo = document.querySelector("header .container .network");
var networkAPI = `https://api.themoviedb.org/3/network/${network_id}?api_key=ee9ddd028297c7c00ad6168b72365519`;
var movieList = [];

getData(networkAPI);

for (let i = 1; i < 22; i++) {
  getData(
    `https://api.themoviedb.org/3/tv/popular?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=${i}`
  );
}

function showNetworkInfo(results) {
  var { headquarters, homepage, logo_path, name } = results;
  networkInfo.innerHTML = `
  <img src="https://image.tmdb.org/t/p/h30//${logo_path}" alt="">
  <ul class="network-info">
      <li><i class="bi bi-person-badge-fill"></i>${name}</li>
      <li><i class="bi bi-geo-alt-fill"></i>${headquarters}</li>
      <li><i class="bi bi-link"></i><a href="${homepage}" target="_blank">
              Homepage
          </a></li>
  </ul>
  `;
}
async function getAllSerieOfThisNetwork(results) {
  for (let i = 0; i < results.length; i++) {
    // console.log(results[i].id);
    getData(
      `https://api.themoviedb.org/3/tv/${results[i].id}?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US`
    );
  }
}
function getAllSerie(results) {
  for (let i = 0; i < results.networks.length; i++) {
    if (results.networks[i].id == network_id) {
      movieList.push(results);
      break;
    }
  }
}
setTimeout(() => {
  $(".pagination").pagination({
    dataSource: movieList,
    className: "paginationjs-theme-red",
    pageSize: 10,
    locator: "results",
    callback: function (data, pagination) {
      networkShowSection.innerHTML = ``;
      networkShowTotal.textContent = movieList.length + " shows";
      console.log(movieList);
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
                <span>${vote_average.toFixed(1)}</span>/10
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
        networkShowSection.append(movie);
      }
    },
  });
}, 3000);

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (url.includes("network")) {
    showNetworkInfo(data);
  }
  if (url.includes("popular") && url.includes("page")) {
    getAllSerieOfThisNetwork(data.results);
  }
  if (!url.includes("popular") && !url.includes("page") && url.includes("tv")) {
    getAllSerie(data);
  }
}

$(".pagination").pagination({
  dataSource:
    "https://api.themoviedb.org/3/tv/popular?api_key=ee9ddd028297c7c00ad6168b72365519&total_items=5&total_pages=20",
  className: "paginationjs-theme-red",
  pageSize: 10,
  locator: "results",
  callback: function (data, pagination) {
    // console.log(data);
    // console.log(pagination);
  },
});
