document.getElementById('forecast-form').addEventListener('submit', async function(event){
    event.preventDefault();

    const city = document.getElementById('city-input').value;    
    if(!city){
        alert('Por favor ingresa una ciudad.');
        return;
    }

    try{
        const response = await fetch(`/api/forecast?city=${city}`);
        const data = await response.json();

        if(data.error){
            alert(data.error);
            return;
        }
        
        document.getElementById('forecast-city').textContent = `Pronostico para ${data.city}`;

        const tableBody = document.getElementById('forecast-table-body');
        tableBody.innerHTML = '';

        data.forecasts.forEach(forecast =>{
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${forecast.date}</td>
                <td>${forecast.temperature}</td>
                <td>${forecast.description}</td>
                <td>${forecast.humidity}</td>
            `;
            tableBody.appendChild(row);
        });
        document.getElementById('forecast-result').classList.remove('d-none');
    }catch (error){
        alert('No se pudo obtener el pronostico.')
    }
});