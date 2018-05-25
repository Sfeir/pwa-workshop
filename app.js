fetch('./players.json')
  .then(response => {
    return response.json()
  })
  .then(json => {
    return json.players
  })
  .then(players => {
    players.map(makePlayer)
  });

function makePlayer(player) {
  const WRAPPER = document.querySelector('.players');

  let element = document.createElement('div');
  element.classList.add('player');
  element.style.backgroundImage = `url("assets/players/${player.name.first}-${player.name.last}.jpeg")`;

  let name = document.createElement('span');
  name.classList.add('player__name');
  name.innerText = `${player.name.first[0]}.${player.name.last}`;

  element.appendChild(name);
  WRAPPER.appendChild(element);
}


/**
 * 
 * <div class="player" style="background-image: url('http://www.sofoot.com/IMG/img-hugo-lloris-1465292442_x600_articles-223529.jpg')"
      alt="Lloris" class="player__img">
      <span class="player__name">Lloris</span>
    </div>
 */