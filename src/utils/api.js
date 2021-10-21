import axios from "axios";

export const obtenerVehiculos = async (setvehiculos, setEjecutarConsulta) => {
  const options = { method: "GET", url: "http://localhost:5000/vehiculos" };

  await axios
    .request(options)
    .then(function (response) {
      setvehiculos(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};
