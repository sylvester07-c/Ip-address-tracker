 let map;
 let marker;
 const API_KEY = 'at_Et1xKgn6RyvRpjLSWNNzcoWVBQnl2';

 //Initialize map
function initMap(lat = 34.0522, lng = -118.2437) {
    if (map) {
        map.remove();
    }
    map = L.map('map', {
        center: [lat, lng],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true
    });
}

//Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

//Custom icon
const customIcon = L.divIcon({
    html: 
    `<div style = "
        background: linear-gradient(135deg, #667eea 0%, #111013ff 100%);
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        position: relative; 
        
    ">
      <div style = "
        position: absolute;
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    
      "></div>

    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: 'custom-marker'
});

//Add marker
marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

//Fetch IP data
async function getIPData(query = ''){
    showLoading(true);
    hideError();

    try {
        let url = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=8.8.8.8`;

        if(query) {
            //Check if it is an IP address or domain
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (ipRegex.text(query)) {
                url += `&ipAddress=${query}`;
            } else {
                url += `&domain=${query}`
            }
        }

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error('Failed to fetch IP data');

        }

        const data = await response.json();
        updateUI(data);
        updateMap(data.location.lat, data.location.lng);

    } catch (error) {
        console.error('Error:', error);
        showError('Failed to fetch IP data. please check your input and try again.');
    } finally {
        showLoading(false);
    }

}

// Update UI with IP data
function updateUI(data) {
    
}

