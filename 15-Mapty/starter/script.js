'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { longitude, latitude } = position.coords;
      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Adding event listeners to get coordinates on click events
      // Using the on method that comes on the L library when we created the mal constant, it allows to set an event listener directly on the map

      // this will hanlde all clicks on map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        // show form by toggling its hidden class
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('could not get your position');
    }
  );
}

form.addEventListener('submit', function (e) {
  // will display the marker
  console.log(mapEvent);
  e.preventDefault();

  const { lat, lng } = mapEvent.latlng;
  const popup = L.popup({
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
  });

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(popup)
    .setPopupContent('workout')
    .openPopup();
});
