   let mapToken =  mapToken;
   console.log(mapToken);
   mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN',
        container: 'map',
        center: coordinates, // Default center coordinates (longitude, latitude)
        zoom: 9
    });
 
    const marker = new mapboxgl.Marker({color: 'red'})
        .setLngLat([coordinates]) // Default marker coordinates (longitude, latitude)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h3>${listing.title}</h3><p>Location may vary</p>`))
        .addTo(map);
