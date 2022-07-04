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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { longitude, latitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Adding event listeners to get coordinates on click events
      // Using the on method that comes on the L library when we created the mal constant, it allows to set an event listener directly on the map

      map.on('click', function (mapEvent) {
        console.log(mapEvent);
        // latlng: v {lat: -2.085053707057894, lng: -79.86
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
    },
    function () {
      alert('could not get your position');
    }
  );
}

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude, longitude } = position.coords;

//       // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//       const map = L.map('map').setView([latitude, longitude], 14);
//       // console.log(map) // just to see how map works thanks to the library we are using
//       map.on('click', mapEvent => {
//         let { lat, lng } = mapEvent.latlng;
//         L.marker([lat, lng])
//           .addTo(map)
//           .bindPopup(
//             L.popup({
//               maxWidth: 250,
//               minWidth: 100,
//               autoClose: false,
//               closeOnClick: false,
//               className: 'runing-popup',
//             }).setContent('runing')
//           )
//           .openPopup();
//       });

//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       L.marker([latitude, longitude])
//         .addTo(map)
//         .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//         .openPopup();
//     },
//     function () {
//       alert('Could not get your possition');
//     }
//   );
// }

// let lat, long;
// const getLatLong = function () {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       lat = position.coords.latitude;
//       long = position.coords.longitude;
//     },
//     function () {
//       alert('this is an alert');
//     }
//   );
// };
// const map = L.map('map');
// const setView = function () {
//   map.setView([lat, long], 15);
// };
// L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);
// function addMarker(lat, long) {
//   L.marker([lat, long])
//     .addTo(map)
//     .bindPopup(`marker for coords ${lat}, ${long}.`)
//     .openPopup();
// }
// map.addEventListener('click', function (e) {
//   const coords = e.latlng;
//   console.log(coords);
//   addMarker(coords.lat, coords.lng);
// });
// const addMarker = function (e) {};
