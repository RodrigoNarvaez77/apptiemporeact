import { Box, Container, TextField, Typography } from "@mui/material"; // Importa componentes de Material UI
import { LoadingButton } from "@mui/lab"; // Importa LoadingButton de Material UI Labs
import { useState } from "react"; // Importa useState de React

// Componente principal de la aplicación
export default function App() {
  const [city, setcity] = useState(""); // Estado para la ciudad ingresada
  const [loading, setloading] = useState(false); // Estado para controlar la carga
  const [weather, setweather] = useState({ // Estado para almacenar datos del clima
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`; // URL de la API del clima
  
  const onSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    console.log("submit"); 
    setloading(true); // Activa el estado de carga

    try {
      const response = await fetch(`${API_WEATHER}${city}`); // Llama a la API
      const data = await response.json(); // Convierte la respuesta en JSON
      console.log(data); // Muestra los datos en la consola

      // Actualiza el estado con los datos del clima
      setweather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      });
    } catch (error) {
      console.log(error); // Manejo de errores
    }
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ mt: 2 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Aplicacion del tiempo
        </Typography>
        <Box
          sx={{ display: "grid", gap: 2 }}
          component="form"
          autoComplete="off"
          onSubmit={onSubmit} // Asociar la función onSubmit al formulario
        >
          <TextField
            id="city"
            label="ciudad"
            variant="outlined"
            size="small"
            required
            value={city} // Valor del campo de texto
            onChange={(e) => setcity(e.target.value)} // Actualiza el estado al cambiar el texto
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading} // Controla el estado de carga del botón
            loadingIndicator="Cargando..."
          >
            Buscar
          </LoadingButton>
        </Box>

        {weather.city && ( // Muestra la información del clima si hay una ciudad
          <Box
            sx={{
              mt: 2,
              display: "grid",
              gap: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" component="h2">
              {weather.city}, {weather.country}
            </Typography>

            <Box component="img" alt={weather.conditionText} src={weather.icon} sx={{ margin: "0 auto" }} />

            <Typography variant="h5" component="h3">
              {weather.temp}ºC
            </Typography>

            <Typography variant="h6" component="h4">
              {weather.conditionText}
            </Typography>
          </Box>
        )}

        <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
          Powered by{" "}
          <a href="https://www.weatherapi.com/" title="Weather API">
            WeatherAPI.com
          </a>
        </Typography>
      </Container>
    </>
  );
}