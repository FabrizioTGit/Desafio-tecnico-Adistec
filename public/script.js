document.getElementById('forecast-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    //Ciudad ingresada en el input
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Por favor ingresa una ciudad.');
        return;
    }

    try {
        //Realiza la solicitud al back enviando la ciudad ingresada
        const response = await fetch(`/api/forecast?city=${city}`);
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        //Titulo con la ciudad y pais
        document.getElementById('forecast-city').textContent = `Pronostico para ${data.city}, ${data.country}`;

        const tableBody = document.getElementById('forecast-table-body');
        tableBody.innerHTML = '';

        //Recorre forecasts y los añade a la tabla
        data.forecasts.forEach(forecast => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${forecast.date}</td>
                <td>${forecast.temperature}°C</td>
                <td>${forecast.description}</td>
                <td>${forecast.humidity}%</td>
            `;
            tableBody.appendChild(row);
        });
        document.getElementById('forecast-result').classList.remove('d-none');
    } catch (error) {
        alert('No se pudo obtener el pronostico.')
    }
});

//Boton limpiar
document.getElementById('clear-button').addEventListener('click', function () {

    document.getElementById('city-input').value = '';

    document.getElementById('forecast-city').textContent = '';

    const tableBody = document.getElementById('forecast-table-body');
    tableBody.innerHTML = '';

    document.getElementById('forecast-result').classList.add('d-none');
});

//Boton dark mode
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const table = document.querySelector(".table");

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("bg-dark");
    body.classList.toggle("text-light");
    darkModeToggle.classList.toggle("btn-light");
    darkModeToggle.classList.toggle("btn-dark");
    table.classList.toggle("table-dark");

    if (body.classList.contains("bg-dark")) {
        darkModeToggle.innerText = "☀️ Modo Claro";
    } else {
        darkModeToggle.innerText = "🌙 Modo Oscuro";
    }
});