let input = document.querySelector('input')
let btn = document.querySelector('.btn')
let ipAdress = document.querySelector('#ipAdress')
let timezone = document.querySelector('#timeZone')
let loc = document.querySelector('#location')
let isp = document.querySelector('#isp')
let obj = {}
let long
let lat

async function getlocation(ip) {
  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_QTVYm3qXHZFhy7YZKrsDLdTOxetSd&ipAddress=${ip}`,
  )
  const data = await res.json()
  return data
}
var map = L.map('map')
getlocation(0).then((data) => {
  map.setView([data.location.lat, data.location.lng], 13)
  timezone.innerHTML = data.location.timezone
  ipAdress.innerHTML = data.ip
  isp.innerHTML = data.isp
  loc.innerHTML = data.location.region

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)
  var marker = L.marker([data.location.lat, data.location.lng]).addTo(map)
})

btn.addEventListener('click', () => {
  ip = input.value

  getlocation(ip).then((data) => {
    map.setView([data.location.lat, data.location.lng], 13)
    timezone.innerHTML = data.location.timezone
    ipAdress.innerHTML = data.ip
    isp.innerHTML = data.isp
    loc.innerHTML = data.location.region

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    var marker = L.marker([data.location.lat, data.location.lng]).addTo(map)
  })
})
