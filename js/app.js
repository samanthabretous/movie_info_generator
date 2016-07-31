function ready(fn) {
  if (document.readyState != 'loading') {
    console.log("Page did not load");
  } else {
    document.addEventListener('DOMContentLoaded', function (){
      var html = render(data, window.innerWidth > 500);
      document.body.innerHTML = html;
    });
  }
};
ready();


function render(movieArray, displayWide) {

  //Bonus question of readme
  //sort movies in alphabetical order by title
  function sortByName(obj) {
    return obj.sort(function(a,b){
      return a.name > b.name;
    })
  } 
  sortByName(movieArray)

  // add all the movies together in one long string that will be return and displayed
  var allMovies = ""

  function displayAllMovies(display) {
    return movieArray.forEach(function (a) {
      allMovies += display(a)
    })
  }

  // based on screen width display either the moblie or desktop view
  if (displayWide) {
    allMovies += '<div class="big">'
    displayAllMovies(renderMovie) 
    allMovies += '</div>'
  } else { 
    allMovies += '<div class="small"><ul>'
    displayAllMovies(renderMovieCompact)
    allMovies += '</ul></div>'
  }

  return allMovies;
}

//step 2 of readme
function renderMovie(movie) {

  // generate a list of class member in the repsective html tag
  function cast(object){
    var castStr = ''
    for(var i = 0; i < object.cast.length; i++) {
      castStr += '<li class="cast">' + object.cast[i] + '</li>';
    }
    return '<div> Starring: <ul>' + castStr + '</ul> </div>';
  }

  // wrap movie title within a h3 tag
  var movieTitle = '<h3 class="name">' + movie.name + '</h3>';

  // wrap the release date and genre in a paragraph.
  // span tag is wrapped around the render infomation from object
  var movieInfo = '<p> Release date: <span class="year">' + movie.year + '</span>, Genre: <span class="genre">' + movie.genre + '</span>.' + '</p>'
  
  // wrap the movie description in sp
  var movieDescription = '<p class="description">' + movie.description + '</p>'

  return '<div class="movie animation">' + movieTitle + movieInfo + cast(movie) + movieDescription + '</div>'
}

//step 3 of readme
//create compact version of movie info
function renderMovieCompact(movie) {
  var title = '<span class="name">' + movie.name + '</span> '
  var year = '<span class="year">' + movie.year + '</span> '
  var genre = '<span class="genre">' + movie.genre + '</span> '
  var cast = "starring: "
  movie.cast.forEach(function (i) {
    if (i !== movie.cast.length -1) {
      cast += movie.cast[i] + ", ";
    } else {
      cast += movie.cast[i] 
    }
  })

  return '<li class="movie animation">' + title + year + genre + cast + '</li>'
}