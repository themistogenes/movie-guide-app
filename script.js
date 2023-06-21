// Initial References
let movieNameRef = document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result');

// Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // If input field is empty
  if(movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name.</h3>`;
  }

  // If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {

        console.log(data);
        console.log(data.Poster);
        console.log(data.Title);
        console.log(data.imdbRating);
        console.log(data.Rated);
        console.log(data.Year);
        console.log(data.Runtime);
        console.log(data.Genre);
        console.log(data.Plot);
        console.log(data.Actors);

        // If movie exists in database
        if(data.Response == 'True'){
          result.innerHTML = `
            <div class="info">
              <img src=${data.Poster} class="poster">
              <div>
                <h2>${data.Title}</h2>
                <div class="rating">
                  <img src="star-icon.svg">
                  <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                  <span>${data.Rated}</span>
                  <span>${data.Year}</span>
                  <span>${data.Runtime}</span>
                </div>
                <div class="genre">
                  <div>${data.Genre.split(',').join('</div><div>')}</div>
                </div>
              </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast: </h3>
            <p>${data.Actors}</p>
          `
        }

        // If movie does NOT exist in database
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`
        }
      })
      
      // If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Sorry, but an error has occured.</h3>`
      })
  }
}

searchBtn.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);