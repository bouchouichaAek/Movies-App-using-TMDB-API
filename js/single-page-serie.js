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

// var videoContent = document.querySelector(".video-media iframe");

var director = document.querySelector(
  ".movie-detail .box-detail .overview-box .movie-over .director .dir-name"
);
var writers = document.querySelector(
  ".movie-detail .box-detail .overview-box .movie-over .writer .wri-name"
);
var castInfo = document.querySelector(".information .cast-box .casts");

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

var originalName = document.querySelector(
  ".information .info-box .original-name .value"
);
var statusInfo = document.querySelector(
  ".information .info-box .status-status .value"
);
var networksInfo = document.querySelector(
  ".information .info-box .networks .value"
);
var typeInfo = document.querySelector(".information .info-box .type .value");

var originalLanguage = document.querySelector(
  ".information .info-box .original-language .value"
);
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
var Moviesimage = "https://image.tmdb.org/t/p/original";
var moviesTrilar = "https://www.youtube.com/embed/";
var catImage = "https://www.themoviedb.org/t/p/w66_and_h66_face";
// var imageVideo = "https://i.ytimg.com/vi/o-0hcF97wy0/hqdefault.jpg";

var video = document.querySelector(".video-trailer");
var closVideo = document.querySelector(".video-trailer i");
var playTrilar = document.querySelector(".rat-trailer .trailer a");

var movies_api =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&append_to_response=external_ids,videos,images,reviews,recommendations,credits,content_ratings";

fetch(movies_api)
  .then((response) => response.json())
  .then(function (response) {
    response.backdrop_path != null
      ? (movieDetail.style.backgroundImage =
          "url(" + Moviesimage + response.backdrop_path + ")")
      : (movieDetail.style.backgroundImage =
          "url(./images/header-background.jpg)");
    if (response.content_ratings.results.length > 0) {
      for (let i = 0; i < response.content_ratings.results.length; i++) {
        if (response.content_ratings.results[i].iso_3166_1 === "US") {
          cert.textContent = response.content_ratings.results[i].rating;
        }
      }
    } else {
      cert.style.display = "none";
    }
    title.textContent = response.name;
    poster.src = Moviesimage + response.poster_path;
    date.textContent = getFormattedDate(response.first_air_date);
    if (response.in_production) {
      year.textContent = `${getYerar(response.first_air_date)} - CURRENT`;
    } else {
      year.textContent = `${getYerar(response.first_air_date)} - ${getYerar(
        response.last_air_date
      )}`;
    }
    runTime.textContent = response.number_of_episodes + " Episodes";
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
    originalName.textContent = response.original_name;
    statusInfo.textContent = response.status;
    for (let i = 0; i < response.networks.length; i++) {
      var { name, logo_path } = response.networks[i];
      var liLogo = document.createElement("li");
      var anchor = document.createElement("a");
      var logo = document.createElement("img");
      logo.src = "https://www.themoviedb.org/t/p/h30" + logo_path;
      logo.alt = name;
      anchor.href = "#";
      liLogo.append(anchor);
      anchor.append(logo);
      networksInfo.append(liLogo);
    }
    typeInfo.textContent = response.type;
    for (let i = 0; i < response.spoken_languages.length; i++) {
      originalLanguage.textContent = response.spoken_languages[i].english_name;
    }

    castTotal.textContent = response.credits.cast.length;

    if (response.credits.cast.length != 0) {
      var displayCast = 10;
      if (response.credits.cast.length < 10) {
        displayCast = response.credits.cast.length;
      }
      console.log(response.credits.cast[i]);
      for (let i = 0; i < displayCast; i++) {
        var { name, profile_path, character } = response.credits.cast[i];
        var cast = document.createElement("div");
        cast.classList.add("cast");
        cast.innerHTML = `
                <img src="${
                  profile_path != null
                    ? catImage + profile_path
                    : "images/no-image.jpg"
                }" alt="${name}">
                <p class="name">${name}</p>
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
      p.innerHTML = `<p>We don't have any videos added to this TV Show</p>`;
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
      var { name, overview, poster_path, first_air_date, vote_average, id } =
        response.recommendations.results[i];
      ids.push(id);
      var relatedMovie = document.createElement("div");
      relatedMovie.classList.add("related-movie");
      relatedMovie.innerHTML = `
        <img src="${Moviesimage + poster_path}" alt="">
          <div class="mv-item-infor">
            <h6><a href="single-page-serie.html?id=${id}" target="_blank">${name} <span>(${getYerar(
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
      fetch(
        "https://api.themoviedb.org/3/tv/" +
          ids[i] +
          "?api_key=ee9ddd028297c7c00ad6168b72365519&append_to_response=content_ratings,credits"
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
              for (
                let i = 0;
                i < response.content_ratings.results.length;
                i++
              ) {
                if (response.content_ratings.results[i].iso_3166_1 == "US") {
                  cert = response.content_ratings.results[i].rating;
                }
              }

              for (let i = 0; i < response.credits.crew.length; i++) {
                if (
                  response.credits.crew[i].known_for_department == "Directing"
                ) {
                  director = response.credits.crew[i].name;
                }
              }

              if (response.credits.cast.length != 0) {
                for (let i = 0; i < 3; i++) {
                  stars.push(
                    "<a href='#'>" + response.credits.cast[i].name + "</a>"
                  );
                }
              }

              ele.innerHTML = `<p class="run-time"> Number Of Episodes: ${
                response.number_of_episodes
              } . <span>MMPA: ${cert} </span> . <span>Release: ${getFormattedDateSimilar(
                response.first_air_date
              )}</span></p>
                <p>Director: ${
                  director != ""
                    ? "<a href='#'>" + director + "</a>"
                    : "Unknow Name Director "
                }</p>
                <p>Stars: ${
                  stars.length != 0 ? stars.join(" , ") : "Unknow Name Stars"
                } `;
            }
          });
        });
    }
    seasonTotal.textContent = response.number_of_seasons;

    var maxDisplaySeason = 11;
    if (response.seasons.length < 11) {
      maxDisplaySeason = response.seasons.length;
    }
    // No-Image-Placeholder.svg
    for (let i = 0; i < maxDisplaySeason; i++) {
      console.log(response.seasons[i]);
      var { name, episode_count, poster_path, air_date } = response.seasons[i];
      if (response.seasons[i].name != "Specials") {
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
            <p>${name} of ${response.name} 
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
  });

fetch(
  "https://api.themoviedb.org/3/tv/" +
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
    if (response.backdrops.length > 0) {
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
    } else {
      var p = document.createElement("div");
      //   cast.classList.add("cast");
      //   class="name"
      p.innerHTML = `<p class="name">We don't have any image added to this TV Show</p>`;
      imagesMedia.append(p);
    }

    if (response.posters.length > 0) {
      var maxDisplayPoster = 9;
      if (response.posters.length < 9) {
        maxDisplayPoster = response.posters.length;
      }
      for (let i = 0; i < maxDisplayPoster; i++) {
        var poster = document.createElement("img");
        var anchor = document.createElement("a");
        poster.src = Moviesimage + response.posters[i].file_path;
        anchor.href = Moviesimage + response.posters[i].file_path;
        anchor.target = "_blank";
        anchor.append(poster);
        postersMedia.append(anchor);
      }
    } else {
      var p = document.createElement("div");

      p.innerHTML = `<p>We don't have any poster added to this TV Show</p>`;
      postersMedia.append(p);
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
