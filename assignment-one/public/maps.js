/*
    Functions needed to display map and places of interest using the Google Maps JavaScript API.
    Documentation: https://developers.google.com/maps/documentation/javascript/places
    Code is adapted from this example: https://developers.google.com/maps/documentation/javascript/examples/place-search-pagination
*/

export function initMap(lat, lon, type) {
  const locationCoordinates = { lat: lat, lng: lon };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: locationCoordinates,
    zoom: 15,
  });

  const service = new google.maps.places.PlacesService(map);

  service.nearbySearch(
    { location: locationCoordinates, radius: 400, type: type },
    (results, status) => {
      if (status !== "OK" || !results) return;

      addPlaces(results, map);
    }
  );
}

function addPlaces(places, map) {
  const placesList = document.getElementById("places");
  placesList.innerHTML = "";

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      const image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create an info window to share between markers.
      const infoWindow = new google.maps.InfoWindow();

      const marker = new google.maps.Marker({
        map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
        vicinity: place.vicinity,
      });

      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle() + "<br>" + marker.vicinity);
        infoWindow.open(marker.getMap(), marker);
        console.log(place);
      });

      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.classList.add("hover");

      li.textContent = place.name;
      placesList.appendChild(li);
      li.addEventListener("click", () => {
        map.setCenter(place.geometry.location);
        infoWindow.close();
        infoWindow.setContent(marker.getTitle() + "<br>" + marker.vicinity);
        infoWindow.open(marker.getMap(), marker);
      });
    }
  }
}
