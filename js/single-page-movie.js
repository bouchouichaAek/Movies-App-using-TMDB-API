var movieDetail = document.querySelector(".movie-detail");
var poster = document.querySelector(".movie-detail img");
var Moviestitle = document.querySelector(
  ".movie-detail .info .box-title .title"
);
var year = document.querySelector(".movie-detail .info .box-title span");
var cert = document.querySelector(".movie-detail .info .text-box .cert");
var date = document.querySelector(".movie-detail .info .text-box .relaes-date");
var runTime = document.querySelector(".movie-detail .info .text-box .run-time");
var category = document.querySelector(
  ".movie-detail .info .text-box .category"
);
var description = document.querySelector(
  ".movie-detail .info .overview-box .description"
);
var rating = document.querySelector(
  ".movie-detail .info .rat-trailer .rating span"
);
var trilarContent = document.querySelector(".video-trailer iframe");

var director = document.querySelector(
  ".movie-detail .box-detail .overview-box .movie-over .director .dir-name"
);
var writers = document.querySelector(
  ".movie-detail .box-detail .overview-box .movie-over .writer .wri-name"
);

var movieLinkHomePage = document.querySelector(
  ".information .info-box .info-box-head ul .home-page a"
);
var movieFacebookPage = document.querySelector(
  ".information .info-box .info-box-head ul .facebook a"
);
var movieTwitterPage = document.querySelector(
  ".information .info-box .info-box-head ul .twitter a"
);
var movieInstgramPage = document.querySelector(
  ".information .info-box .info-box-head ul .instagram a"
);
var statusValue = document.querySelector(
  ".information .info-box .status .value"
);
var originalLanguageValue = document.querySelector(
  ".information .info-box .status.original-language .value"
);
var budgetValue = document.querySelector(
  ".information .info-box .status.budget .value"
);
var revenueValue = document.querySelector(
  ".information .info-box .status.revenue .value"
);
var casts = document.querySelector(".information .cast-box .casts");
var imagesMedia = document.querySelector(".information .media-box .images");
var videosMedia = document.querySelector(".information .media-box .videos");
var postersMedia = document.querySelector(".information .media-box .posters");
var rewiews = document.querySelector(".information .review-box .reviews");
var relatedMovies = document.querySelector(
  ".information .related-movies-box .related-movies"
);

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

var filterSection = document.querySelectorAll(".information .section .box");

var id = window.location.search.slice(4);

var shortLi = document.querySelectorAll(".shortcut-bar .container ul li");

var api_key = "ee9ddd028297c7c00ad6168b72365519";
var Moviesimage = "https://image.tmdb.org/t/p/original";
var moviesTrilar = "https://www.youtube.com/embed/";

var video = document.querySelector(".video-trailer");
var closVideo = document.querySelector(".video-trailer i");
var playTrilar = document.querySelector(".rat-trailer .trailer a");

var movies_api =
  "https://api.themoviedb.org/3/movie/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&append_to_response=release_dates,credits,external_ids,videos,reviews,similar,recommendations";

fetch(movies_api)
  .then((response) => response.json())
  .then(function (response) {
    response.backdrop_path != null
      ? (movieDetail.style.backgroundImage =
          "url(" + Moviesimage + response.backdrop_path + ")")
      : (movieDetail.style.backgroundImage =
          "url(../images/header-background.jpg)");

    if (response.release_dates.results.length > 0) {
      for (let i = 0; i < response.release_dates.results.length; i++) {
        if (response.release_dates.results[i].iso_3166_1 === "US") {
          for (
            let index = 0;
            index < response.release_dates.results[i].release_dates.length;
            index++
          ) {
            if (
              !response.release_dates.results[i].release_dates[index]
                .certification == ""
            ) {
              cert.textContent =
                response.release_dates.results[i].release_dates[
                  index
                ].certification;
            }
          }
        }
      }
    } else {
      cert.style.display = "none";
    }

    Moviestitle.textContent = response.title;
    poster.src = Moviesimage + response.poster_path;
    date.textContent = getFormattedDate(response.release_date);
    year.textContent = getYerar(response.release_date);
    runTime.textContent = timeConvert(response.runtime);
    response.overview != ""
      ? (description.textContent = response.overview)
      : (description.textContent =
          "We don't have an overview translated in English.");

    if (response.videos.results.length > 0) {
      var listTrilar = [];
      for (let i = 0; i < response.videos.results.length; i++) {
        if (response.videos.results[i].type == "Trailer") {
          listTrilar.push(response.videos.results[i]);
        }
      }
      playTrilar.onclick = function () {
        trilarContent.src =
          moviesTrilar +
          listTrilar[Math.floor(Math.random() * listTrilar.length)].key;
      };
    } else {
      playTrilar.style.display = "none";
    }

    rating.textContent = response.vote_average.toFixed(1);
    for (let i = 0; i < response.genres.length; i++) {
      var li = document.createElement("li");
      li.append(document.createTextNode(response.genres[i].name));
      category.append(li);
    }
    movieLinkHomePage.href = response.homepage;
    movieFacebookPage.href =
      "https://www.facebook.com/" + response.external_ids.facebook_id;
    movieTwitterPage.href =
      "https://twitter.com/" + response.external_ids.twitter_id;
    movieInstgramPage.href =
      "https://www.instagram.com/" + response.external_ids.instagram_id;
    statusValue.textContent = response.status;
    originalLanguageValue.textContent =
      response.spoken_languages[0].english_name;
    if (response.budget != 0) {
      budgetValue.textContent = formatter.format(response.budget);
    } else {
      budgetValue.textContent = "Unkown";
    }
    if (response.revenue != 0) {
      revenueValue.textContent = formatter.format(response.revenue);
    } else {
      revenueValue.textContent = "Unkown";
    }

    castTotal.textContent = response.credits.cast.length;
    if (response.credits.cast.length > 0) {
      var maxDisplay = 10;
      if (response.credits.cast.length < 10) {
        maxDisplay = response.credits.cast.length;
      }
      for (let i = 0; i < maxDisplay; i++) {
        var { name, profile_path, character } = response.credits.cast[i];
        var cast = document.createElement("div");
        cast.classList.add("cast");
        cast.innerHTML = `
        <img src="${
          "https://www.themoviedb.org/t/p/w66_and_h66_face" + profile_path
        }" alt="" srcset="">
        <p class="name">${name}</p>
        <p class="character">${character}</p>
        `;
        casts.append(cast);
      }
    } else {
      var cast = document.createElement("div");
      cast.classList.add("cast");
      cast.innerHTML = `<p>We don't have any cast added to this Movie</p>`;
      castInfo.append(cast);
    }

    var videosTotal = mediaTotal[1];
    videosTotal.textContent = response.videos.results.length;

    if (response.videos.results.length > 0) {
      var maxDisplayVideos = 6;
      if (response.videos.results.length < 6) {
        maxDisplayVideos = response.videos.results.length;
      }
      for (let i = 0; i < maxDisplayVideos; i++) {
        var { key, name } = response.videos.results[i];
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
      p.innerHTML = `<p>We don't have any videos added to this Movie</p>`;
      videosMedia.append(p);
    }

    rewiewsTotal.textContent = response.reviews.total_results;

    var maxDisplayReviews = 5;
    if (response.reviews.results.length < 5) {
      maxDisplayReviews = response.reviews.results.length;
    }
    if (response.reviews.results.length > 0) {
      for (let i = 0; i < maxDisplayReviews; i++) {
        var { author, content, author_details, created_at } =
          response.reviews.results[i];
        var rewiew = document.createElement("div");
        rewiew.classList.add("review");
        rewiew.innerHTML = `
            <div class="user-infor">
            <img src="${showAuthorPicture(author_details.avatar_path)}" alt="">
            <div>
                <h3>A review by ${author}</h3>
                <div class="no-star">
           
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill last"></i>
            
                </div>
                <p class="time">
                    Written on ${getFormattedDate(created_at)}
                </p>
            </div>
        </div>
        <p>${
          content.length < 400 ? content : content.substring(0, 400) + "..."
        }</p>
            `;
        rewiews.append(rewiew);
      }
    } else {
      var p = document.createElement("div");
      p.innerHTML = `<p>We don't have any rewiews added to this TV Show</p>`;
      rewiews.append(p);
    }

    relatedMoviesTotal.textContent = response.recommendations.results.length;
    var ids = [];
    for (let i = 0; i < 5; i++) {
      var { title, overview, poster_path, release_date, vote_average, id } =
        response.recommendations.results[i];
      ids.push(id);
      var relatedMovie = document.createElement("div");
      relatedMovie.classList.add("related-movie");
      relatedMovie.innerHTML = `
        <img src="${Moviesimage + poster_path}" alt="">
          <div class="mv-item-infor">
            <h6><a href="single-page.html?id=${id}" target="_blank">${title} <span>(${getYerar(
        release_date
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
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          ids[i] +
          "?api_key=ee9ddd028297c7c00ad6168b72365519&append_to_response=release_dates,credits"
      )
        .then((response) => response.json())
        .then(function (response) {
          var info = document.querySelectorAll(
            ".related-movies .related-movie .mv-item-infor div"
          );
          info.forEach((ele, index, array) => {
            var cert = "";
            var director = "";
            var stars = [];
            if (response.id == ele.id) {
              for (let i = 0; i < response.release_dates.results.length; i++) {
                if (response.release_dates.results[i].iso_3166_1 == "US") {
                  cert =
                    response.release_dates.results[i].release_dates[0]
                      .certification;
                }
              }
              for (let i = 0; i < response.credits.crew.length; i++) {
                if (response.credits.crew[i].job == "Director") {
                  director = response.credits.crew[i].name;
                }
              }
              for (let i = 0; i < 3; i++) {
                stars.push(response.credits.cast[i].name);
              }
              ele.innerHTML = `<p class="run-time"> Run Time: ${timeConvert(
                response.runtime
              )} . <span>MMPA: ${cert} </span> . <span>Release: ${getFormattedDateSimilar(
                response.release_date
              )}</span></p>
                <p>Director: <a href="#">${director}</a></p>
                <p>Stars: <a href="#">${stars[0]},</a> <a href="#">${
                stars[1]
              },</a> <a href="#">${stars[2]}</a></p>`;
            }
          });
        });
    }
  });

fetch(
  "https://api.themoviedb.org/3/movie/" +
    id +
    "/images?api_key=ee9ddd028297c7c00ad6168b72365519"
)
  .then((response) => response.json())
  .then(function (response) {
    var imageTotal = mediaTotal[0];
    imageTotal.textContent = response.backdrops.length;

    var posterTotal = mediaTotal[2];
    posterTotal.textContent = response.posters.length;

    var maxDisplaybackdrops = 9;
    if (response.backdrops.length < 9) {
      maxDisplaybackdrops = response.backdrops.length;
    }
    for (let i = 0; i < maxDisplaybackdrops; i++) {
      var img = document.createElement("img");
      var anchor = document.createElement("a");
      img.src = Moviesimage + response.backdrops[i].file_path;
      anchor.href = Moviesimage + response.backdrops[i].file_path;
      anchor.target = "_blank";
      anchor.append(img);
      imagesMedia.append(anchor);
    }
    for (let i = 0; i < 8; i++) {
      var poster = document.createElement("img");
      var anchor = document.createElement("a");
      poster.src = Moviesimage + response.posters[i].file_path;
      anchor.href = Moviesimage + response.posters[i].file_path;
      anchor.target = "_blank";
      anchor.append(poster);
      postersMedia.append(anchor);
    }
  });

playTrilar.addEventListener("click", function (e) {
  video.style.display = "block";
});

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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
