 mapboxgl.accessToken = mapToken;
 const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 2  // starting zoom
});

// Create a default Marker

// const marker = new mapboxgl.Marker({ color: 'red'})
//     .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
//     .setPopup(
//         new mapboxgl.Popup({offset: 25}).setHTML(
//         `<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`
//         )
//     )
//     .addTo(map);
const el = document.createElement('div');
el.className = 'custom-marker';
el.style.backgroundImage = 'url(https://cdn-icons-png.flaticon.com/512/25/25694.png)';
el.style.width = '25px';
el.style.height = '25px';
el.style.backgroundSize = '100%';
new mapboxgl.Marker(el)
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${listing.location}</h4><p>Exact Location will be provided after booking</p>`
        )
    )
    .addTo(map);


