import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [currLocation, setCurrLocation] = useState({});
  const [currLocationJs, setCurrLocationJs] = useState({});

  useEffect(() => {
    // Проверяем, сохранены ли уже координаты в переменных окружения
    const storedLatitude = process.env.REACT_APP_STORED_LATITUDE;
    const storedLongitude = process.env.REACT_APP_STORED_LONGITUDE;

    if (storedLatitude && storedLongitude) {
      setCurrLocationJs({
        latitude: parseFloat(storedLatitude),
        longitude: parseFloat(storedLongitude),
      });
    } else {
      getLocation();
      getLocationJs();
    }
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location.data);
  };

  const getLocationJs = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;

      process.env.REACT_APP_STORED_LATITUDE = latitude;
      process.env.REACT_APP_STORED_LONGITUDE = longitude;

      setCurrLocationJs({ latitude, longitude });
    });
  };

  return (
    <div>
      <h1>Текущее местоположение</h1>
      <p>Широта: {currLocation.latitude}</p>
      <p>Долгота: {currLocation.longitude}</p>
      <p>Город: {currLocation.city}</p>

      <h1>Текущее местоположение с использованием JS</h1>
      <p>Широта: {currLocationJs.latitude}</p>
      <p>Долгота: {currLocationJs.longitude}</p>
    </div>
  );
}

export default App;
