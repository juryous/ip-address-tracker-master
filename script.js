const API_KEY = 'at_v9QK2rR4UMlL6BELhqzSlCPL3U2KG';
const map = L.map('map');
const form = document.getElementById('form');
const ipEl = document.getElementById('ip-adress');
const locationEl = document.getElementById('location');
const timezoneEl = document.getElementById('timezone');
const ispEl = document.getElementById('isp');
const input = document.querySelector('.input');

async function showIpData(e) {
  if (input.value) e.preventDefault();
  const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&domain=${input.value}`;
  const res = await fetch(URL);
  const data = await res.json();

  updateData(data);
  loadMap(data);
}

function updateData(data) {
  ipEl.textContent = data.ip;
  locationEl.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  timezoneEl.textContent = data.location.timezone;
  ispEl.textContent = data.isp;
}

function loadMap(data) {
  const { lat } = data.location;
  const { lng } = data.location;
  const coords = [lat, lng];
  const icon = L.icon({
    iconUrl: 'images/icon-location.svg',
  });

  map.setView(coords, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords, { icon: icon }).addTo(map);
}

form.addEventListener('submit', showIpData);

showIpData();
