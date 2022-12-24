fetch(
  "https://api.themoviedb.org/3/search/movie?api_key=ee9ddd028297c7c00ad6168b72365519&query='"
)
  .then((response) => response.json())
  .then(function (response) {
    console.log(response);
  });
