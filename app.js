const button = document.querySelector(".search-button");
const input = document.querySelector("#input");
const locationText = document.querySelector(".location");
const temp = document.querySelector(".temp h4");
const weatherText = document.querySelector(".temp p");
const iconText = document.querySelector(".icon");

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
});

button.addEventListener("click", () => {
  city = input.value;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f53c7a49758eb70ecb42a32e31eb1515`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == undefined) {
        const { main, weather } = data;
        locationText.textContent = input.value;
        weatherText.textContent = weather[0].description;
        weatherText.style.marginTop = "1rem";
        console.log(weather[0].description);
        temp.textContent = main.temp + " °C";
        iconText.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png">`;
      } else {
        locationText.textContent = data.message.toUpperCase();
        temp.textContent = "loading...";
        weatherText.textContent = "";

        iconText.innerHTML = "";
      }

      input.value = "";
    });
});
