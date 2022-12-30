var movieDetail = document.querySelector(".movie-detail");
var movieDetailContainer = document.querySelector(".movie-detail .container");

var trilarContent = document.querySelector(".video-trailer iframe");

var info = document.querySelector(".information ");
var information = document.querySelector(".information .info-box");

var castInfo = document.querySelector(".information .cast-box .casts");
var imagesMedia = document.querySelector(".information .media-box .images");
var videosMedia = document.querySelector(".information .media-box .videos");
var postersMedia = document.querySelector(".information .media-box .posters");
var rewiews = document.querySelector(".information .review-box .reviews");
var relatedMovies = document.querySelector(
  ".information .related-movies-box .related-movies"
);
var seasons = document.querySelector(".information .season-box .seasons");

var castTotal = document.querySelector(".information .cast-box .total span");
var mediaTotal = document.querySelectorAll(
  ".information .media-box .total span"
);
var rewiewsTotal = document.querySelector(
  ".information .review-box .total span"
);
var relatedMoviesTotal = document.querySelector(
  ".information .related-movies-box .total span"
);
var seasonTotal = document.querySelector(
  ".information .season-box .total span"
);

var filterSection = document.querySelectorAll(".information .section .box");

var id = window.location.search.slice(4);

var shortLi = document.querySelectorAll(".shortcut-bar .container ul li");

var api_key = "ee9ddd028297c7c00ad6168b72365519";

var video = document.querySelector(".video-trailer");
var closVideo = document.querySelector(".video-trailer i");

var search = document.querySelector(".search .results");

var movies_api =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&append_to_response=external_ids,videos,reviews,recommendations,credits,content_ratings";

getData(movies_api);
getData(
  "https://api.themoviedb.org/3/tv/" +
    id +
    "/images?api_key=ee9ddd028297c7c00ad6168b72365519"
);

function showSerieDetail(results) {
  var {
    backdrop_path,
    poster_path,
    name,
    in_production,
    first_air_date,
    last_air_date,
    content_ratings,
    genres,
    number_of_episodes,
    vote_average,
    videos,
    overview,
  } = results;

  var movieBackround = document.querySelector(".movie-detail");
  movieBackround.style.backgroundImage = `url(${
    backdrop_path != null
      ? "https://image.tmdb.org/t/p/original" + backdrop_path
      : "url(./images/header-background.jpg)"
  })`;
  var movie = document.createElement("div");
  movie.classList.add("box");
  movie.innerHTML = `
  <img src="${
    poster_path != null
      ? "https://image.tmdb.org/t/p/original" + poster_path
      : "images/No-Image-Placeholder.svg"
  }" alt="">
  <div class="box-detail">
    <div class="info">
      <div class="box-title"><h1 class="title">${name}</h1><span>${
    in_production
      ? getYerar(first_air_date) + " - " + "CURRENT"
      : getYerar(first_air_date) + " - " + getYerar(last_air_date)
  }</span>
      </div>
      <div class="text-box">
        ${
          getRating(content_ratings.results) != null
            ? "<p class='cert'>" + getRating(content_ratings.results) + "</p>"
            : ""
        }
        <p class="relaes-date">${getFormattedDate(first_air_date)}</p>
        <i class="bi bi-circle-fill"></i>
        <ul class="category">
        ${getCategoryList(genres)}
        </ul>
        <i class="bi bi-circle-fill"></i>
        <p class="run-time">${number_of_episodes + " Episodes"}</p>
      </div>
      <div class="rat-trailer">
        <div class="rating">
          <i class="bi bi-star-fill star"></i>
          <span>${vote_average.toFixed(1)}</span>/10
        </div>
        ${
          getVideoTrailer(videos.results) != null
            ? `<div class='trailer'><a onclick = display("https://www.youtube.com/embed/${getVideoTrailer(
                videos.results
              )}")><i class='bi bi-play-fill'></i>Play Trailer</a></div>`
            : ``
        }
        </div>
        <div class="overview-box">
          <p class="description">${
            overview != ""
              ? overview
              : "We don't have an overview translated in English"
          }</p>
    </div>
  </div>
</div>
  `;
  movieDetailContainer.append(movie);
}
function showSerieInformation(results) {
  var {
    homepage,
    external_ids,
    original_name,
    status,
    networks,
    type,
    spoken_languages,
  } = results;
  var box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
  <div class="info-box-head">
      <ul class="social-media">
    ${
      external_ids.facebook_id != null
        ? "<li class='facebook'><a href='https://facebook.com/" +
          external_ids.facebook_id +
          "'target='_blank'><i class='bi bi-facebook'></i></a></li>"
        : ""
    }
    ${
      external_ids.twitter_id != null
        ? "<li class='twitter'><a href='https://twitter.com/" +
          external_ids.twitter_id +
          "'target='_blank'><i class='bi bi-twitter'></i></a></li>"
        : ""
    }
    ${
      external_ids.instagram_id != null
        ? "<li class='instagram'><a href='https://instagram.com/" +
          external_ids.instagram_id +
          "'target='_blank'><i class='bi bi-instagram'></i></a></li>"
        : ""
    }
    ${
      homepage != null
        ? "<li class='home-page'><a href='" +
          homepage +
          "'target='_blank'><i class='bi bi-link'></i></a></li>"
        : ""
    }
      </ul>
  </div>
  <div class="status original-name">
      <p class="lable">Original Name</p>
      <p class="value">${original_name}</p>
  </div>
  <div class="status status-status">
      <p class="lable">Status</p>
      <p class="value">${status}</p>
  </div>
  <div class="status networks">
      <p class="lable">Networks</p>
      <ul class="value">
    ${getSerieNetwork(networks)}
      </ul>
  </div>
  <div class="status type">
      <p class="lable">Type</p>
      <p class="value">${type}</p>
  </div>
  <div class="status original-language">
      <p class="lable">Original Language</p>
      <p class="value">${spoken_languages[0].english_name}</p>
  </div>
  `;
  information.append(box);
}
function showSerieCast(results) {
  var castLink = document.querySelector(
    ".information .cast-box .cast-box-head a"
  );

  if (results.credits.cast.length > 0) {
    castLink.href =
      `credits-serie.html?id=` +
      results.id +
      "-" +
      results.name
        .replaceAll(/[(\s)]/g, "-")
        .replaceAll(/[(:?=\s)|(,?=\s)]/g, "");
  } else {
    castLink.style.display = "none";
  }

  castTotal.textContent = results.credits.cast.length;

  if (results.credits.cast.length != 0) {
    var displayCast = 10;
    if (results.credits.cast.length < 10) {
      displayCast = results.credits.cast.length;
    }
    for (let i = 0; i < displayCast; i++) {
      var { name, profile_path, character } = results.credits.cast[i];
      var cast = document.createElement("div");
      cast.classList.add("cast");
      cast.innerHTML = `
                <a href=""><img src="${
                  profile_path != null
                    ? "https://www.themoviedb.org/t/p/w66_and_h66_face" +
                      profile_path
                    : "images/no-image.jpg"
                }" alt="${name}"></a>
                <a href=""><p class="name">${name}</p></a>
                <p class="character">${character}</p>
              `;
      castInfo.append(cast);
    }
  } else {
    var cast = document.createElement("div");
    cast.classList.add("cast");
    cast.innerHTML = `<p>We don't have any cast added to this TV Show</p>`;
    castInfo.append(cast);
  }
}
function showSerieImage(results) {
  var imagesLink = document.querySelector(
    ".information .image-box .media-box-head a"
  );

  if (results.backdrops.length > 0) {
    imagesLink.href = `images-series.html?id=` + results.id + "&image";
  } else {
    videosLink.style.display = "none";
  }

  var posterLink = document.querySelector(
    ".information .poster-box .poster-box-head a"
  );
  if (results.posters.length > 0) {
    posterLink.href = `images-series.html?id=` + results.id + "&poster";
  } else {
    videosLink.style.display = "none";
  }
  var imageTotal = mediaTotal[0];
  imageTotal.textContent = results.backdrops.length;

  var posterTotal = mediaTotal[2];
  posterTotal.textContent = results.posters.length;

  var maxDisplaybackdrops = 9;
  if (results.backdrops.length > 0) {
    if (results.backdrops.length < 9) {
      maxDisplaybackdrops = results.backdrops.length;
    }
    for (let i = 0; i < maxDisplaybackdrops; i++) {
      var img = document.createElement("img");
      var anchor = document.createElement("a");
      img.src =
        "https://image.tmdb.org/t/p/original" + results.backdrops[i].file_path;
      anchor.href =
        "https://image.tmdb.org/t/p/original" + results.backdrops[i].file_path;
      anchor.target = "_blank";
      anchor.append(img);
      imagesMedia.append(anchor);
    }
  } else {
    var p = document.createElement("div");
    p.innerHTML = `<p class="name">We don't have any image added to this TV Show</p>`;
    imagesMedia.append(p);
  }

  if (results.posters.length > 0) {
    var maxDisplayPoster = 8;
    if (results.posters.length < 8) {
      maxDisplayPoster = results.posters.length;
    }
    for (let i = 0; i < maxDisplayPoster; i++) {
      var poster = document.createElement("img");
      var anchor = document.createElement("a");
      poster.src =
        "https://image.tmdb.org/t/p/original" + results.posters[i].file_path;
      anchor.href =
        "https://image.tmdb.org/t/p/original" + results.posters[i].file_path;
      anchor.target = "_blank";
      anchor.append(poster);
      postersMedia.append(anchor);
    }
  } else {
    var p = document.createElement("div");

    p.innerHTML = `<p>We don't have any poster added to this TV Show</p>`;
    postersMedia.append(p);
  }
}
function showSerieVideos(results) {
  var videosLink = document.querySelector(
    ".information .videos-box .media-box-head a"
  );
  if (results.videos.results.length > 0) {
    videosLink.href = `images-series.html?id=` + results.id + "&video";
  } else {
    videosLink.style.display = "none";
  }
  var videosTotal = mediaTotal[1];
  videosTotal.textContent = results.videos.results.length;

  if (results.videos.results.length > 0) {
    var maxDisplayVideos = 6;
    if (results.videos.results.length < 6) {
      maxDisplayVideos = results.videos.results.length;
    }
    for (let i = 0; i < maxDisplayVideos; i++) {
      var { key, name } = results.videos.results[i];
      var v_item = document.createElement("div");
      v_item.classList.add("vd-item");
      v_item.innerHTML = `
            <div class="vd-it">
              <img class="vd-img" src="${
                "https://i.ytimg.com/vi/" + key + "/hqdefault.jpg"
              }" alt="">
              <a class="fancybox-media hvr-grow" onclick = display("https://www.youtube.com/embed/${key}")><img src="images/play-vd.png" alt=""></a>
            </div>
            <div class="vd-infor">
              <h6> <a >${name}</a></h6>
              <!--  <p class="time"> 1: 31</p> -->
            </div>
        `;
      videosMedia.append(v_item);
    }
  } else {
    var p = document.createElement("div");
    p.innerHTML = `<p>We don't have any videos added to this TV Show</p>`;
    videosMedia.append(p);
  }
}
function showSerieReviews(results) {
  var reviewLink = document.querySelector(
    ".information .review-box .media-box-head a"
  );

  if (results.reviews.total_results > 0) {
    reviewLink.href =
      `reviews-serie.html?id=` +
      results.id +
      "-" +
      results.name
        .replaceAll(/[(\s)]/g, "-")
        .replaceAll(/[(:?=\s)|(,?=\s)]/g, "");
  } else {
    reviewLink.style.display = "none";
  }
  rewiewsTotal.textContent = results.reviews.total_results;

  var maxDisplayReviews = 5;
  if (results.reviews.results.length < 5) {
    maxDisplayReviews = results.reviews.results.length;
  }
  if (results.reviews.results.length > 0) {
    for (let i = 0; i < maxDisplayReviews; i++) {
      var { author, content, author_details, created_at, url } =
        results.reviews.results[i];
      var rewiew = document.createElement("div");
      rewiew.classList.add("review");
      rewiew.innerHTML = `
              <div class="user-infor">
              <img src="${showAuthorPicture(
                author_details.avatar_path
              )}" alt="">
              <div>
                  <h3>A review by ${author}</h3>
                  <div class="no-star">
                  ${getRatingAuthor(author_details.rating).outerHTML}
                  </div>
                  <p class="time">
                      Written on ${getFormattedDate(created_at)}
                  </p>
              </div>
          </div>
          <p>${
            content.length < 400
              ? content
              : content.substring(0, 400) +
                "..." +
                ` 
              <a href="` +
                url +
                `" target="_blank">Go To Link</a>`
          }</p>
              `;
      rewiews.append(rewiew);
    }
  } else {
    var p = document.createElement("div");
    p.innerHTML = `<p>We don't have any rewiews added to this TV Show</p>`;
    rewiews.append(p);
  }
}
function showSerieRecommendations(results) {
  var relatedMoviesLink = document.querySelector(
    ".information .related-movies-box-head a "
  );

  if (results.reviews.total_results > 0) {
    relatedMoviesLink.href =
      `Recommendations-serie.html?id=` +
      results.id +
      "-" +
      results.name
        .replaceAll(/[(\s)]/g, "-")
        .replaceAll(/[(:?=\s)|(,?=\s)]/g, "");
  } else {
    reviewLink.style.display = "none";
  }
  relatedMoviesTotal.textContent = results.recommendations.results.length;
  var ids = [];
  if (results.recommendations.results.length > 0) {
    for (let i = 0; i < 5; i++) {
      var { name, overview, poster_path, first_air_date, vote_average, id } =
        results.recommendations.results[i];
      ids.push(id);
      var relatedMovie = document.createElement("div");
      relatedMovie.classList.add("related-movie");
      relatedMovie.innerHTML = `
          <img src="${
            "https://image.tmdb.org/t/p/original" + poster_path
          }" alt="">
            <div class="mv-item-infor">
              <h6><a href="single-page-serie.html?id=${
                id +
                "-" +
                name
                  .replaceAll(/[(\s)]/g, "-")
                  .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
              }" target="_blank">${name} <span>(${getYerar(
        first_air_date
      )})</span></a></h6>
              <p class="rate"> <i class="bi bi-star-fill"></i><span>${vote_average.toFixed(
                1
              )}</span> /10</p>
              <p class="describe">${overview.substring(0, 200)}</p>
              <div id="${id}"></div>
            </div>
        `;

      relatedMovies.append(relatedMovie);
    }
    for (let i = 0; i < ids.length; i++) {
      getData(
        "https://api.themoviedb.org/3/tv/" +
          ids[i] +
          "?api_key=ee9ddd028297c7c00ad6168b72365519&append_to_response=content_ratings,credits"
      );
    }
  } else {
    var p = document.createElement("div");
    p.innerHTML = `<p>We don't have any Recommendation added to this TV Show</p>`;
    relatedMovies.append(p);
  }
}
function showSerieRecommendationsInfo(results) {
  var info = document.querySelectorAll(
    ".related-movies .related-movie .mv-item-infor div"
  );

  info.forEach((ele, index, array) => {
    var cert = "";
    var director = "";
    var stars = [];
    if (results.id == ele.id) {
      var { content_ratings, first_air_date, credits, number_of_episodes } =
        results;
      ele.innerHTML = `<p class="run-time"> Number Of Episodes: ${number_of_episodes} . <span>MMPA: ${
        getRating(content_ratings.results) != null
          ? getRating(content_ratings.results)
          : "rating"
      } </span> . <span>Release: ${getFormattedDateSimilar(
        first_air_date
      )}</span></p>
      <p>Director: ${
        getDirector(credits.crew) != null
          ? "<a href='#'>" + getDirector(credits.crew) + "</a>"
          : "Unknow Name Director "
      }</p>
      <p>Stars: ${
        getCasts(credits.cast) != null
          ? getCasts(credits.cast)
          : "Unknow Name Stars"
      }`;
    }
  });
}
function showSerieSeasons(results) {
  seasonTotal.textContent = results.number_of_seasons;

  var maxDisplaySeason = 11;
  if (results.seasons.length < 11) {
    maxDisplaySeason = results.seasons.length;
  }
  for (let i = 0; i < maxDisplaySeason; i++) {
    var { name, episode_count, poster_path, air_date } = results.seasons[i];
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
      seasons.append(season);
    }
  }
}
closVideo.addEventListener("click", function (e) {
  if (video.style.display === "block") {
    video.style.display = "none";
    var iframeSrc = trilarContent.src;
    trilarContent.src = iframeSrc;
  }
});

shortLi.forEach((el) => {
  el.addEventListener("click", function (e) {
    shortLi.forEach((el) => {
      el.classList.remove("active");
    });
    filterSection.forEach((el) => {
      el.classList.add("hide");
      if (el.id == e.target.dataset.bar) {
        el.classList.remove("hide");
      }
    });
    e.target.classList.add("active");
  });
});

function getFormattedDate(date) {
  var date = new Date(date);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  month = date.toLocaleString("default", { month: "short" });

  return month + " " + day + ", " + year;
}
function getFormattedDateSeasons(date) {
  var date = new Date(date);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  month = date.toLocaleString("default", { month: "long" });

  return month + " " + day + ", " + year;
}
function getFormattedDateSimilar(date) {
  var date = new Date(date);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  let day = date.getDate().toString();
  month = date.toLocaleString("default", { month: "long" });

  return day + " " + month + " " + year;
}
function getYerar(date) {
  var date = new Date(date);
  let year = date.getFullYear();

  return year;
}

function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + "m";
}

function showAuthorPicture(src) {
  if (src != null) {
    src = src.slice(1);
    if (src.startsWith("http")) {
      return `${src}`;
    } else {
      return `https://www.themoviedb.org/t/p/original/${src}`;
    }
  } else {
    return `images/no-image.jpg`;
  }
}

function display(source) {
  video.style.display = "block";
  trilarContent.src = source;
}

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (url.includes("images")) {
    showSerieImage(data);
  }
  if (!url.includes("videos") && !url.includes("images")) {
    showSerieRecommendationsInfo(data);
  }
  if (!url.includes("images") && url.includes("videos")) {
    showSerieDetail(data);
    showSerieInformation(data);
    showSerieCast(data);
    showSerieVideos(data);
    showSerieReviews(data);
    showSerieRecommendations(data);
    showSerieSeasons(data);
  }
  if (url.includes("search")) {
    showSearch(data.results, url);
  }
}

function getRating(res) {
  for (let i = 0; i < res.length; i++) {
    if (res[i].iso_3166_1 == "US") {
      return res[i].rating;
    }
  }
  return null;
}

function getCategoryList(list) {
  var listCate = [];
  for (let i = 0; i < list.length; i++) {
    listCate.push(list[i].name);
  }
  return "<li>" + listCate.join("</li> <li>") + "</li>";
}

function getVideoTrailer(list) {
  var listTrailer = [];
  if (list.length != 0) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].type == "Trailer") {
        return list[i].key;
      }
    }
  }
  return null;
}

function getSerieNetwork(list) {
  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      return `<li><a href=""><img src="https://www.themoviedb.org/t/p/h30${list[i].logo_path}" alt="${list[i].name}"></a></li>`;
    }
  }
}

function getDirector(list) {
  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].job == "Director") {
        return list[i].name;
      }
    }
  }
  return null;
}
function getCasts(list) {
  var listCast = [];
  if (list.length > 0) {
    for (let i = 0; i < 3; i++) {
      listCast.push(list[i].name);
    }
    return "<a href='#'>" + listCast.join("</a> , <a href='#'>") + "</a>";
  }
  return null;
}
function getRatingAuthor(rating) {
  var ul = document.createElement("ul");
  console.log(rating);
  for (let i = 0; i < 10; i++) {
    var start = document.createElement("i");
    start.classList.add("bi");
    start.classList.add("bi-star-fill");
    if (i < rating) {
    } else {
      start.classList.add("last");
    }
    ul.append(start);
  }
  return ul;
}

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  var section = document.querySelector("section");
  var searchValue = searchSubmit.value;
  console.log(select.value);
  search.classList.remove("hide");
  info.classList.add("hide");
  movieDetail.classList.add("hide");
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
          "https://image.tmdb.org/t/p/original" + poster_path
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
            ? "single-page-serie.html?id=" + id
            : "single-page-movie.html?id=" + id
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
