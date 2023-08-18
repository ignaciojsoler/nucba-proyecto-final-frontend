export const getLocation = () => {
  if ("geolocation" in navigator) {
    // Obtener la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Latitud:", latitude);
        console.log("Longitud:", longitude);
        return {
          lat: latitude,
          long: longitude,
        };
      },
      function (error) {
        alert(`Error al obtener la ubicación: ${error.message}`);
      }
    );
  } else {
    alert("La geolocalización no está disponible en este navegador.");
  }
};
