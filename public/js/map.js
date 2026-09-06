// mapToken, coordinates, and Location are globals set inline in show.ejs
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // [lng, lat] array from listing.geometry.coordinates
    zoom: 9
});

new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates) // coordinates is already [lng, lat] — no extra brackets
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${Location}</h3><p>Exact location provided after booking</p>`)
    )
    .addTo(map);
