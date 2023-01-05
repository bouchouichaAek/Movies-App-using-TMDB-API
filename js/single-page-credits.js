var person_id = window.location.search.slice(1);
var shortLi = document.querySelectorAll(".shortcut-bar  ul li");
var filterSection = document.querySelectorAll(
  "section .container .credit-feature .box"
);
var shortLi = document.querySelectorAll(".shortcut-bar  ul li");
var filterSection = document.querySelectorAll(
  "section .container .credit-feature .box"
);
var creditsInfo = document.querySelector(
  "section .container .credits .credit-info"
);
var creditsFeature = document.querySelector(
  "section .container .credits .credit-feature"
);
var creditsImages = document.querySelector(
  "section .container .credits .credit-feature .images"
);
var creditsMovies = document.querySelector(
  "section .container .credits .credit-feature .movies-container"
);
var selectFilterType = document.querySelector(
  "section .container .credits .credit-feature form .type"
);

var CreditsAPI = `https://api.themoviedb.org/3/person/${person_id}?api_key=ee9ddd028297c7c00ad6168b72365519&append_to_response=movie_credits,tv_credits,images,external_ids`;

getData(CreditsAPI);

function showCreditInforamtion(results) {
  console.log(results);
  var {
    profile_path,
    external_ids,
    homepage,
    known_for_department,
    movie_credits,
    tv_credits,
    gender,
    birthday,
    place_of_birth,
    name,
    biography,
    images,
  } = results;
  creditsInfo.innerHTML = `
  <img src="${
    profile_path != null
      ? "https://image.tmdb.org/t/p/original" + profile_path
      : "images/no-image.jpg"
  }" alt="" class="picture">
  <div class="info">
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
      <h1>Personal Info</h1>
      <div class="info-text">
          <div class="known job">
              <p class="lable">Known For</p>
              <p class="value">${known_for_department}</p>
          </div>
          <div class="known Credits">
              <p class="lable">Known Credits</p>
              <p class="value">${
                movie_credits.cast.length +
                movie_credits.crew.length +
                tv_credits.cast.length +
                tv_credits.crew.length
              }</p>
          </div>
          <div class="known Gender">
              <p class="lable">Gender</p>
              <p class="value">${getGender(gender)}</p>
          </div>
          <div class="known Birthday">
              <p class="lable">Birthday</p>
              <p class="value">${birthday} <span>(${getAge(
    birthday
  )} years old)</span></p>
          </div>
          <div class="known Place">
              <p class="lable">Place of Birth</p>
              <p class="value">${place_of_birth} UK</p>
          </div>
      </div>
  </div>
  `;

  var nameActor = document.createElement("h1");
  nameActor.classList.add("name");
  nameActor.textContent = name;
  var bio = document.createElement("bio");
  var bioTitle = document.createElement("h2");
  var bioContent = document.createElement("p");
  bio.classList.add("bio");
  bioContent.classList.add("content");
  bioTitle.textContent = "Biography";
  bioContent.textContent = biography;
  bio.append(bioTitle);
  bio.append(bioContent);

  for (let i = 0; i < images.profiles.length; i++) {
    var { file_path } = images.profiles[i];
    var img = document.createElement("img");
    if (file_path != null) {
      img.src = "https://image.tmdb.org/t/p/original" + file_path;
      creditsImages.append(img);
    }
  }

  creditsFeature.insertBefore(nameActor, creditsFeature.children[0]);
  creditsFeature.insertBefore(bio, creditsFeature.children[1]);
  getAll(movie_credits, tv_credits);
  filteringType(movie_credits, tv_credits);
}

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showCreditInforamtion(data);
}
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

function getGender(gender) {
  if (gender == 1) {
    return "Female";
  }
  if (gender == 2) {
    return "Male";
  }
  if (gender == 3) {
    return "unknown";
  }
  if (gender == 0) {
    return "unknown";
  }
  if (gender == null) {
    return "unknown";
  }
}
function getAge(birthday) {
  var birthday = new Date(birthday);
  var diff_ms = Date.now() - birthday.getTime();
  var age = new Date(diff_ms);
  age = Math.abs(age.getUTCFullYear() - 1970);

  return age;
}

function getImages(imgs) {
  for (var i = 0; i < imgs.length; i++) {
    var { file_path } = imgs[i];
    var img = document.createElement("img");
    img.src = `https://www.themoviedb.org/t/p/original${file_path}`;

    return img.outerHTML;
  }
}

function getAll(mvis, tvs) {
  var listMovies = [];

  for (let i = 0; i < mvis.cast.length; i++) {
    listMovies.push(mvis.cast[i]);
  }
  for (let i = 0; i < mvis.crew.length; i++) {
    listMovies.push(mvis.crew[i]);
  }
  for (let i = 0; i < tvs.cast.length; i++) {
    listMovies.push(tvs.cast[i]);
  }
  for (let i = 0; i < tvs.crew.length; i++) {
    listMovies.push(tvs.crew[i]);
  }
  $(".pagination").pagination({
    dataSource: listMovies,
    className: "paginationjs-theme-red",
    pageSize: 8,
    callback: function (data) {
      creditsMovies.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        var { id, vote_average, title, name, poster_path } = data[i];
        var movie = document.createElement("div");
        movie.classList.add("movie");
        movie.innerHTML = `
        <div class="img">
          <img src="${
            poster_path != null
              ? "https://image.tmdb.org/t/p/original" + poster_path
              : "images/No-Image-Placeholder.svg"
          }" alt="">
          <div class="info">
              <h2 class="title">${
                data[i].hasOwnProperty("name") ? name : title
              }</h2>
              <p class="rating">
                  <i class="bi bi-star-fill star"></i>
                  <span>${vote_average.toFixed(1)}</span>/10
              </p>
          </div>
          <a href="${
            data[i].hasOwnProperty("name")
              ? "single-page-serie.html?id=" +
                id +
                "-" +
                name
                  .replaceAll(/[(\s)]/g, "-")
                  .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
              : "single-page-movie.html?id=" +
                id +
                "-" +
                title
                  .replaceAll(/[(\s)]/g, "-")
                  .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
          }" target="_blank">Read more
              <i class="bi bi-caret-right-fill"></i>
          </a>
        </div>
        `;
        creditsMovies.append(movie);
      }
    },
  });
}

function getMoviesAll(mvis) {
  var listMovies = [];

  for (let i = 0; i < mvis.cast.length; i++) {
    listMovies.push(mvis.cast[i]);
  }
  for (let i = 0; i < mvis.crew.length; i++) {
    listMovies.push(mvis.crew[i]);
  }

  $(".pagination").pagination({
    dataSource: listMovies,
    className: "paginationjs-theme-red",
    pageSize: 8,
    callback: function (data) {
      creditsMovies.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        var { id, vote_average, title, name, poster_path } = data[i];
        var movie = document.createElement("div");
        movie.classList.add("movie");
        movie.innerHTML = `
        <div class="img">
          <img src="${
            poster_path != null
              ? "https://image.tmdb.org/t/p/original" + poster_path
              : "images/No-Image-Placeholder.svg"
          }" alt="">
          <div class="info">
              <h2 class="title">${
                data[i].hasOwnProperty("name") ? name : title
              }</h2>
              <p class="rating">
                  <i class="bi bi-star-fill star"></i>
                  <span>${vote_average.toFixed(1)}</span>/10
              </p>
          </div>
          <a href="${
            data[i].hasOwnProperty("name")
              ? "single-page-serie.html?id=" +
                id +
                "-" +
                name
                  .replaceAll(/[(\s)]/g, "-")
                  .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
              : "single-page-movie.html?id=" +
                id +
                "-" +
                title
                  .replaceAll(/[(\s)]/g, "-")
                  .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
          }" target="_blank">Read more
              <i class="bi bi-caret-right-fill"></i>
          </a>
        </div>
        `;
        creditsMovies.append(movie);
      }
    },
  });
}

function getSeriesAll(tvs) {
  var listMovies = [];

  for (let i = 0; i < tvs.cast.length; i++) {
    listMovies.push(tvs.cast[i]);
  }
  for (let i = 0; i < tvs.crew.length; i++) {
    listMovies.push(tvs.crew[i]);
  }

  $(".pagination").pagination({
    dataSource: listMovies,
    className: "paginationjs-theme-red",
    pageSize: 8,
    callback: function (data) {
      creditsMovies.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        var { id, vote_average, title, name, poster_path } = data[i];
        var movie = document.createElement("div");
        movie.classList.add("movie");
        movie.innerHTML = `
        <div class="img">
          <img src="${
            poster_path != null
              ? "https://image.tmdb.org/t/p/original" + poster_path
              : "images/No-Image-Placeholder.svg"
          }" alt="">
          <div class="info">
              <h2 class="title">${
                data[i].hasOwnProperty("name") ? name : title
              }</h2>
              <p class="rating">
                  <i class="bi bi-star-fill star"></i>
                  <span>${vote_average.toFixed(1)}</span>/10
              </p>
          </div>
          <a href="${
            data[i].hasOwnProperty("name")
              ? "single-page-serie.html?id=" +
                id +
                "-" +
                name
                  .replaceAll(/[(\s)]/g, "-")
                  .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
              : "single-page-movie.html?id=" +
                id +
                "-" +
                title
                  .replaceAll(/[(\s)]/g, "-")
                  .replaceAll(/[(:?=\s)|(,?=\s)]/g, "")
          }" target="_blank">Read more
              <i class="bi bi-caret-right-fill"></i>
          </a>
        </div>
        `;
        creditsMovies.append(movie);
      }
    },
  });
}

function filteringType(listMovies, listTv) {
  selectFilterType.addEventListener("click", (e) => {
    e.preventDefault();

    if (selectFilterType.value == "all") {
      getAll(listMovies, listTv);
    }
    if (selectFilterType.value == "movies") {
      creditsMovies.innerHTML = "";
      getMoviesAll(listMovies);
    }
    if (selectFilterType.value == "tv") {
      creditsMovies.innerHTML = "";
      getSeriesAll(listTv);
    }
  });
}
