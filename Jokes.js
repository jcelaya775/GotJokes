let jokes = [];
let currentJoke = '';
getJoke();

function prevJoke() {
  let n = jokes.length;
  /* if there are less than 2 jokes or current joke is first joke -> return nothing */
  if (n < 2) return;
  if (currentJoke == jokes[0]) return;

  let prevIndex = jokes.indexOf(currentJoke) - 1; //the index of the previous joke

  document.getElementById('text').innerText = jokes[prevIndex];
  currentJoke = jokes[prevIndex];
  console.log(jokes);
}

function getJoke() {
  /* if user is not on a new joke and has seen 
       at least 2 jokes -> show next joke of stored jokes */
  if (jokes.length >= 2 && jokes.indexOf(currentJoke) != jokes.length - 1) {
    currentJoke = jokes[jokes.indexOf(currentJoke) + 1];
    document.getElementById('text').innerText = currentJoke;
    return;
  }
  /* gets a new joke from api */
  fetch('https://sv443.net/jokeapi/v2/joke/Any?type=single')
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      currentJoke = json.joke;
      document.getElementById('text').innerText = currentJoke;
      jokes.push(currentJoke);

      let scaleBox = (() => {
        let height = document.getElementById('text').getBoundingClientRect()
          .height;
        let attr = (3 * height).toString() + '%';
        document.getElementsByClassName('joke')[0].style.height = attr;
      })();
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(jokes);
}
