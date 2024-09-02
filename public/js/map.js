const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 2500,
        }
    );
}


const map = L.map("map").setView([-75.5, 40], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([22.3039,  70.8022] ,style={color:"black"}).addTo(map)
.bindPopup('<h3> Welcome to Airlust! </h3>')
.openPopup();


socket.on("recieve-location", (data) => {
    const { id, latitude, longitude } = data;
    
    // Correcting the argument for setView to an array instead of an object
    map.setView([latitude, longitude], 15);
    
    if (markers[id]) {
        // Correcting the method name from setLatLong to setLatLng
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})
