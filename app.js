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
    document.body.classList.remove('loading')
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
      // element.style.backgroundImage = `url("assets/players/${player.name.first}-${player.name.last}.jpeg")`;
      element.innerHTML = `<img src="assets/players/${player.name.first}-${player.name.last}.jpeg">`;
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


const applicationServerPublicKey = 'AAAA5w_3nMg:APA91bGdGoRNLF2d0S9HNfA5-s5TT71OCdTeK2T6ahY6fgFPQfjTozeknw7ulmEhUEIWryi4l94NwXXNh-MhGLglmOfYJZ4NnMt83ZgTLocaXHgxenOZ5QDfqr9InbfDpeTRU2m4_hxn';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function (subscription) {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateBtn();
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();
    });
}

function initializeUI() {
  pushButton.addEventListener('click', function () {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      isSubscribed = !(subscription === null);

      updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('service-worker.js')
    .then(function (swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      initializeUI();
    })
    .catch(function (error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}