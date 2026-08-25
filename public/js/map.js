   let mapToken =  mapToken;
   console.log(mapToken);
   mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN',
        container: 'map',
        center: [77.209, 28.6139], // Default center coordinates (longitude, latitude)
        zoom: 9
    });
 