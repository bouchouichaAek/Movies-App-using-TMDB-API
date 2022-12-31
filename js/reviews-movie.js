var home = document.querySelector("header .movie-text-title");
var reviewsSection = document.querySelector(".credits-section .review-box ");
var reviewsTotal = document.querySelector(
  ".credits-section .search .total span"
);
var id = window.location.search.slice(4);
var movies_api =
  "https://api.themoviedb.org/3/movie/" +
  id +
  "?api_key=ee9ddd028297c7c00ad6168b72365519&language=en-US&append_to_response=reviews";

getData(movies_api);

function showMovieInfo(results, url) {
  var { id, name, title, poster_path, release_date } = results;
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
    }" >
        <h1>${title} <span>(${getYerar(release_date)})</span></h1>
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

function showMovieReviews(results) {
  reviewsTotal.textContent = results.reviews.results.length + " reviews";
  for (let i = 0; i < results.reviews.results.length; i++) {
    var { author, content, created_at, author_details, url } =
      results.reviews.results[i];
    var review = document.createElement("div");
    review.classList.add("review");
    review.innerHTML = `
    <div class="user-infor">
        <img src="${showAuthorPicture(author_details.avatar_path)}" alt="">
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
    reviewsSection.append(review);
  }
}

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovieInfo(data, url);
  showMovieReviews(data);
}

function getFormattedDate(date) {
  var date = new Date(date);
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  month = date.toLocaleString("default", { month: "short" });

  return month + " " + day + ", " + year;
}

function getRatingAuthor(rating) {
  var ul = document.createElement("ul");
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

function getYerar(date) {
  var date = new Date(date);
  let year = date.getFullYear();

  return year;
}
