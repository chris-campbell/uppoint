// Returns geo coors for given user
export let getLocationPromise = new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      resolve({ latitude: lat, longitude: lng });
    });
  } else {
    resolve("Your browser doesnt support geolocation api");
  }
});
