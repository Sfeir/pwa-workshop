let PLAYERS = [];
const WRAPPER = document.querySelector('.players');

fetch('./players.json')
  .then(response => {
    return response.json()
  })
  .then(json => {
    PLAYERS = json.players
  })
  .then(players => {
    makePlayer(['gk', 'df', 'ml', 'fw']);
  });

function makePlayer(filters) {

  WRAPPER.innerHTML = '';

  PLAYERS
    .filter(player => {
      return filters.indexOf(player.position) > -1
    })
    .map(player => {
      let element = document.createElement('div');
      element.classList.add('player');
      element.style.backgroundImage = `url("assets/players/${player.name.first}-${player.name.last}.jpeg")`;

      let name = document.createElement('span');
      name.classList.add('player__name');
      name.innerText = `${player.name.first[0]}.${player.name.last}`;

      element.appendChild(name);
      WRAPPER.appendChild(element);
    });
}

let form = document.querySelector('#filters');
form.addEventListener('change', (e) => {
  e.preventDefault();

  let inputs = document.forms[0].querySelectorAll('input');
  let filters = [];
  for (let input of inputs) {
    if (input.checked) {
      filters.push(input.name);
    }
  }

  makePlayer(filters);
});