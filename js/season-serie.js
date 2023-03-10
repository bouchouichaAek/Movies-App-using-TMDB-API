var home = document.querySelector("header .movie-text-title");
var seasonSection = document.querySelector(".credits-section .seasons ");
var seasonTotal = document.querySelector(
  ".credits-section .search .total span"
);
var id = window.location.search.slice(4);
var movies_api =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&page=1";

getData(movies_api);

function showSerieInfo(results, url) {
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

function showSeasonSerie(results) {
  seasonTotal.textContent = `${results.number_of_seasons} Season`;
  for (let i = 0; i < results.seasons.length; i++) {
    var { air_date, episode_count, name, poster_path } = results.seasons[i];
    console.log(results.seasons[i]);
    if (results.seasons[i].name != "Specials") {
      var season = document.createElement("div");
      season.classList.add("season");
      season.innerHTML = `
          <img src="${
            poster_path != null
              ? "https://image.tmdb.org/t/p/original" + poster_path
              : "images/No-Image-Placeholder.svg"
          }" alt="">
          <div>
              <a href="#">${name}</a>
              <p>${episode_count} Episodes</p>
              <p>${name} of ${results.name}
                  ${
                    air_date != null
                      ? "premiered on " + getFormattedDateSeasons(air_date)
                      : " comming song "
                  }.</p>
          </div>
          `;
      seasonSection.append(season);
    }
  }
}

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showSerieInfo(data, url);
  showSeasonSerie(data);
}

function getFormattedDateSeasons(date) {
  var date = new Date(date);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  month = date.toLocaleString("default", { month: "long" });

  return month + " " + day + ", " + year;
}

function getYerar(date) {
  var date = new Date(date);
  let year = date.getFullYear();

  return year;
}
