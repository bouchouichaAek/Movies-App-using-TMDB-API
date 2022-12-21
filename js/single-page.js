var movieDetail = document.querySelector(".movie-detail");
var poster = document.querySelector(".movie-detail img");
var title = document.querySelector(".movie-detail .info .box-title .title");
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
var actorPhoto = document.querySelectorAll(
  ".information .cast-box .casts .cast img"
);
var actorName = document.querySelectorAll(
  ".information .cast-box .casts .cast .name"
);
var actorCharacter = document.querySelectorAll(
  ".information .cast-box .casts .cast .character"
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
var catImage = "https://www.themoviedb.org/t/p/w66_and_h66_face";
// var imageVideo = "https://i.ytimg.com/vi/o-0hcF97wy0/hqdefault.jpg";

var video = document.querySelector(".video-trailer");
var closVideo = document.querySelector(".video-trailer i");
var playTrilar = document.querySelector(".rat-trailer .trailer a");

var movies_api =
  "https://api.themoviedb.org/3/movie/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&append_to_response=external_ids,videos,reviews,similar,recommendations";

fetch(movies_api)
  .then((response) => response.json())
  .then(function (response) {
    movieDetail.style.backgroundImage =
      "url(" + Moviesimage + response.backdrop_path + ")";
    title.textContent = response.title;
    poster.src = Moviesimage + response.poster_path;
    date.textContent = getFormattedDate(response.release_date);
    year.textContent = getYerar(response.release_date);
    runTime.textContent = timeConvert(response.runtime);
    description.textContent = response.overview;
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
    // console.log(response.videos.results.length);

    var maxDisplayVideos = 6;
    if (response.videos.results.length < 6) {
      maxDisplayVideos = response.videos.results.length;
    }
    // console.log(response.videos.results.length);
    // console.log(maxDisplayVideos);
    for (let i = 0; i < maxDisplayVideos; i++) {
      // console.log(response.videos.results[i].key);
      // console.log(response.videos.results[i].name);
      var { key, name } = response.videos.results[i];
      var v_item = document.createElement("div");
      v_item.classList.add("vd-item");
      v_item.innerHTML = `
      <div class="vd-it">
        <img class="vd-img" src="${
          "https://i.ytimg.com/vi/" + key + "/hqdefault.jpg"
        }" alt="">
        <a class="fancybox-media hvr-grow" href="${
          "https://www.youtube.com/embed/" + key
        }"
          rel="playlist"><img src="images/play-vd.png" alt=""></a>
      </div>
      <div class="vd-infor">
        <h6> <a href="#">${name}</a></h6>
        <!--  <p class="time"> 1: 31</p> -->
      </div>
  `;
      videosMedia.append(v_item);
    }
    rewiewsTotal.textContent = response.reviews.total_results;
    // console.log(response);

    var maxDisplayReviews = 5;
    if (response.reviews.results.length < 5) {
      maxDisplayReviews = response.reviews.results.length;
    }
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
  <p>${content.length < 400 ? content : content.substring(0, 400) + "..."}</p>
      `;
      rewiews.append(rewiew);
    }

    relatedMoviesTotal.textContent = response.similar.results.length;
    var ids = [];
    for (let i = 0; i < 5; i++) {
      var {
        original_title,
        overview,
        poster_path,
        release_date,
        vote_average,
        id,
      } = response.similar.results[i];
      ids.push(id);
      var relatedMovie = document.createElement("div");
      relatedMovie.classList.add("related-movie");
      relatedMovie.innerHTML = `
        <img src="${Moviesimage + poster_path}" alt="">
          <div class="mv-item-infor">
            <h6><a href="single-page.html?id=${id}" target="_blank">${original_title} <span>(${getYerar(
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
      // console.log(ids[i]);
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
                console.log();
                stars.push(response.credits.cast[i].name);
              }
              console.log(stars);

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

          // console.log(info);
        });
    }
    // console.log(response);
  });
fetch(
  "https://api.themoviedb.org/3/movie/" +
    id +
    "/release_dates?api_key=ee9ddd028297c7c00ad6168b72365519"
)
  .then((response) => response.json())
  .then(function (response) {
    for (let i = 0; i < response.results.length; i++) {
      if (response.results[i].iso_3166_1 === "US") {
        for (
          let index = 0;
          index < response.results[i].release_dates.length;
          index++
        ) {
          if (!response.results[i].release_dates[index].certification == "") {
            cert.textContent =
              response.results[i].release_dates[index].certification;
          }
        }
      }
    }
  });
fetch(
  "https://api.themoviedb.org/3/movie/" +
    id +
    "/videos?api_key=ee9ddd028297c7c00ad6168b72365519"
)
  .then((response) => response.json())
  .then(function (response) {
    var videosTotal = mediaTotal[1];
    videosTotal.textContent = response.results.length;
    if (response.results.length > 0) {
      var listTrilar = [];
      for (let i = 0; i < response.results.length; i++) {
        if (response.results[i].type == "Trailer") {
          listTrilar.push(response.results[i]);
        }
      }
      trilarContent.src =
        moviesTrilar +
        listTrilar[Math.floor(Math.random() * listTrilar.length)].key;
    } else {
      playTrilar.style.display = "none";
      console.log();
    }
  });
fetch(
  "https://api.themoviedb.org/3/movie/" +
    id +
    "/credits?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US"
)
  .then((response) => response.json())
  .then(function (response) {
    castTotal.textContent = response.cast.length;
    var actImage = [];
    var actName = [];
    var actCharacter = [];

    // console.log(response.cast.length);
    // console.log(castTotal.textContent);

    for (let i = 0; i < response.crew.length; i++) {
      if (response.crew[i].job == "Director") {
        director.textContent = response.crew[i].name;
      }
    }
    for (let i = 0; i < response.crew.length; i++) {
      if (response.crew[i].job == "Writer") {
        var li = document.createElement("li");
        li.append(document.createTextNode(response.crew[i].name));

        writers.append(li);
        // console.log(response.crew[i].name);
      }
    }
    for (let i = 0; i < response.cast.length; i++) {
      actImage.push(catImage + response.cast[i].profile_path);
      actName.push(response.cast[i].name);
      actCharacter.push(response.cast[i].character);
    }
    actorPhoto.forEach((el, index, array) => {
      el.src = actImage[index];
    });
    actorName.forEach((el, index, array) => {
      el.textContent = actName[index];
    });
    actorCharacter.forEach((el, index, array) => {
      el.textContent = actCharacter[index];
    });
    // console.log(response);
  });

fetch(
  "https://api.themoviedb.org/3/movie/" +
    id +
    "/images?api_key=ee9ddd028297c7c00ad6168b72365519"
)
  .then((response) => response.json())
  .then(function (response) {
    // console.log(response.backdrops.length);
    var imageTotal = mediaTotal[0];
    imageTotal.textContent = response.backdrops.length;

    // console.log(response.posters.length);
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
    // console.log(postersMedia);
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
