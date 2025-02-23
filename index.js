let nav = document.getElementsByTagName('nav')[0];
let navList = document.getElementsByClassName('nav-list')[0];
let header = document.getElementsByTagName('header')[0];
let navButton = document.getElementById('nav-btn');

navButton.addEventListener('click', () => {
    if(navList.style.display == "none") {
        navList.style.display = "block";
        nav.style.height = "170px";
        header.style.marginTop = "170px";
    } else {
        navList.style.display = "none";
        nav.style.height = "100px";
        header.style.marginTop = "100px";
    }
});

let options = {
    componentRestrictions: { country: "MZ" } // Apenas Moçambique
};

let input1 = document.getElementById('from');
let autocomplete1 = new google.maps.places.Autocomplete(input1, options);

let input2 = document.getElementById('to');
let autocomplete2 = new google.maps.places.Autocomplete(input2, options);

const myLating = { lat: -25.9692, lng: 32.5732 };
const mapOptions = {
    center: myLating,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

const map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

const directionsService = new google.maps.DirectionsService();

const displayDirections = new google.maps.DirectionsRenderer();

displayDirections.setMap(map);

let distance, price;

function calcRoute() {

    const request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    directionsService.route(request, (result, status) => {

        const output = document.getElementsByClassName('output')[0];

        if(status == google.maps.DirectionsStatus.OK) {

            const dist = result.routes[0].legs[0].distance.text;
            let distN = '';

            for(let i = 0; i < dist.length; i++) {
                if(dist[i] == '0' || dist[i] == '1' || dist[i] == '2' || dist[i] == '3' || dist[i] == '4' || dist[i] == '5' || dist[i] == '6' || dist[i] == '7' || dist[i] == '8' || dist[i] == '9') {
                    distN += dist[i];
                }
            }

            distance = Math.floor(Number(distN) * 1.6);
            const travelTime = result.routes[0].legs[0].duration.text;
            price = Math.floor(5 * distance);
            output.innerHTML = `<ul>
                        <li><span>Distance: </span>${distance} Km</li>
                        <li><span>Time: </span>${travelTime}</li>
                        <li><span>Price: ${price} Meticais</span></li>
                        <li><a href="" onclick="callDelivery(this)" target="_blank"><button class="call-btn" type="button">Call Delivery
                        </button></a></li>
            </ul>`;

            displayDirections.setDirections(result);
        } else {
            displayDirections.setDirections({ routes: []});

            map.setCenter(myLating);
            output.innerHTML = `<h1>There was an error defining the points or the distance cannot be calculated, try again</h1>`;
        }
    });
}

function callDelivery(a) {
     const response = confirm('Calling delivery');
    if(response) {
        alert('Delivery guy arriving in 10 minutes');

        const message = `*Delivery*%0A*From:* ${document.getElementById("from").value}%0A*To:* ${document.getElementById("to").value}%0A*Price:* ${price} meticais%0A*Distance:* ${distance} km`;

        
        a.href = `https://wa.me/258876494529?text=${message}`;
    } else {
        alert('Delivery canceled');
    }
}