var home = document.querySelector("header .movie-text-title");
var creditsTotal = document.querySelector(
  ".credits-section .search .total span"
);
var creditsSection = document.querySelector(".credits-section .credits-box");
var submit = document.querySelector(".credits-section .search form");

var select = document.querySelector(".credits-section .search form select");
var id = window.location.search.slice(4);
var movies_api =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&append_to_response=credits";

getData(movies_api, select.value);

function showMovieInfo(results, url) {
  var { id, name, title, poster_path, first_air_date } = results;
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
    }">
        <h1>${name} <span>(${getYerar(first_air_date)})</span></h1>
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
function showCredits(results, select) {
  var { credits } = results;
  var type = "";
  var typeCredits = "";
  if (select == "cast") {
    type = credits.cast;
    typeName = "cast";
  }
  if (select == "crew") {
    type = credits.crew;
    typeName = "crew";
  }

  creditsTotal.textContent = `${type.length} ${typeName}`;

  for (let i = 0; i < type.length; i++) {
    var { name, profile_path, character, id, job } = type[i];
    var credit = document.createElement("div");
    credit.classList.add("credit");
    credit.innerHTML = `
    <a href=""><img src="${
      profile_path != null
        ? "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + profile_path
        : "images/No-Image.png"
    }" alt="">
      <div class="credit-info">
          <h1>${name}</h1>
          <p>${typeName == "cast" ? character : job}</p>
      </div></a>`;
    creditsSection.append(credit);
  }
  console.log(submit);
  console.log(select);
}

async function getData(url, select) {
  const res = await fetch(url);
  const data = await res.json();
  showMovieInfo(data, url);
  showCredits(data, select);
}

function getYerar(date) {
  var date = new Date(date);
  let year = date.getFullYear();

  return year;
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  creditsSection.innerHTML = "";
  getData(movies_api, select.value);
});
