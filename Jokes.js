let jokes = [];
let index = -1;
nextJoke();

function prevJoke() {
  /* if current joke is the first joke -> do nothing */
  if (index == 0) return;

  let prevJoke = jokes[index - 1];
  document.getElementById('text').innerText = prevJoke; // update UI
  index--;
}

function nextJoke() {
  /* if user is not on a new joke -> show next joke of stored jokes */
  if (index < jokes.length - 1) {
    let nextJoke = jokes[index + 1];
    document.getElementById('text').innerText = nextJoke;
    index++;
    return;
  }

  /* gets a new joke from api */
  fetch('https://sv443.net/jokeapi/v2/joke/Any?safe-mode&type=single')
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      currentJoke = json.joke;
      document.getElementById('text').innerText = currentJoke; // update UI
      jokes.push(currentJoke);
      index++;

      let scaleBox = (() => {
        let height = document
          .getElementById('text')
          .getBoundingClientRect().height;
        let attr = (3 * height).toString() + '%';
        document.getElementsByClassName('container')[0].style.height = attr;
      })();
    })
    .catch((err) => {
      console.log(err);
    });
}
