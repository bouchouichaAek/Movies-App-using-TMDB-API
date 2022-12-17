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
  ".cast-info .cast-box .casts .cast img"
);
var actorName = document.querySelectorAll(
  ".cast-info .cast-box .casts .cast .name"
);
var actorCharacter = document.querySelectorAll(
  ".cast-info .cast-box .casts .cast .character"
);
var movieLinkHomePage = document.querySelector(
  ".cast-info .info-box .info-box-head ul .home-page a"
);
var movieFacebookPage = document.querySelector(
  ".cast-info .info-box .info-box-head ul .facebook a"
);
var movieTwitterPage = document.querySelector(
  ".cast-info .info-box .info-box-head ul .twitter a"
);
var movieInstgramPage = document.querySelector(
  ".cast-info .info-box .info-box-head ul .instagram a"
);
var statusValue = document.querySelector(".cast-info .info-box .status .value");
var originalLanguageValue = document.querySelector(
  ".cast-info .info-box .status.original-language .value"
);
var budgetValue = document.querySelector(
  ".cast-info .info-box .status.budget .value"
);
var revenueValue = document.querySelector(
  ".cast-info .info-box .status.revenue .value"
);

var id = window.location.search.slice(4);

var api_key = "ee9ddd028297c7c00ad6168b72365519";
var Moviesimage = "https://image.tmdb.org/t/p/original";
var moviesTrilar = "https://www.youtube.com/embed/";
var catImage = "https://www.themoviedb.org/t/p/w66_and_h66_face";

var video = document.querySelector(".video-trailer");
var closVideo = document.querySelector(".video-trailer i");
var playTrilar = document.querySelector(".rat-trailer .trailer a");

var movies_api =
  "https://api.themoviedb.org/3/movie/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&append_to_response=external_ids,videos,reviews";

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
    console.log(response);
    console.log(revenueValue);
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
    var listTrilar = [];
    for (let i = 0; i < response.results.length; i++) {
      if (response.results[i].type == "Trailer") {
        listTrilar.push(response.results[i]);
      }
    }
    trilarContent.src =
      moviesTrilar +
      listTrilar[Math.floor(Math.random() * listTrilar.length)].key;
    // console.log(listTrilar);
  });
fetch(
  "https://api.themoviedb.org/3/movie/" +
    id +
    "/credits?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US"
)
  .then((response) => response.json())
  .then(function (response) {
    var actImage = [];
    var actName = [];
    var actCharacter = [];
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

// fetch(
//   "https://api.themoviedb.org/3/movie/" +
//     id +
//     "/external_ids?api_key=ee9ddd028297c7c00ad6168b72365519"
// )
//   .then((response) => response.json())
//   .then(function (response) {
//     // console.log(response);
//   });

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

function getFormattedDate(date) {
  var date = new Date(date);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  month = date.toLocaleString("default", { month: "short" });

  return month + " " + day + ", " + year;
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
