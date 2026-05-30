// if (
//     !listing.geometry ||
//     !listing.geometry.coordinates ||
//     listing.geometry.coordinates.length < 2
// ) {
//     document.getElementById("map").innerHTML =
//         "<h5>Location map unavailable</h5>";
// } else {
//     mapboxgl.accessToken = mapToken;

//     const map = new mapboxgl.Map({
//         container: "map",
//         style: "mapbox://styles/mapbox/streets-v12",
//         center: listing.geometry.coordinates,
//         zoom: 9,
//     });

//     new mapboxgl.Marker({ color: "red" })
//         .setLngLat(listing.geometry.coordinates)
//         .setPopup(
//             new mapboxgl.Popup({ offset: 25 }).setHTML(
//                 `<h4>${listing.title}</h4>
//                  <p>Exact Location will be provided after booking</p>`
//             )
//         )
//         .addTo(map);
// }

async function loadMap() {
    try {
        const locationText = `${listing.location}, ${listing.country}`;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}`
        );

        const data = await response.json();

        if (!data.length) {
            document.getElementById("map").innerHTML =
                "<h5>Location not found</h5>";
            return;
        }

        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        const map = L.map("map").setView([lat, lon], 10);

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors",
            }
        ).addTo(map);

        L.marker([lat, lon])
            .addTo(map)
            .bindPopup(
                `<b>${listing.title}</b><br>Exact location provided after booking`
            )
            .openPopup();

    } catch (err) {
        console.error("Map Error:", err);

        document.getElementById("map").innerHTML =
            "<h5>Unable to load map</h5>";
    }
}

loadMap();