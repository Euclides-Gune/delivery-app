// Set map options

var myLating = { lat: -25.9692, lng: 32.5732 };
var mapOptions = {
    center: myLating,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//Create Map

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

//Create a Directions service object to use the route method and get a result for our request

var directionsService = new google.maps.DirectionsService();

//Create a DirectionsRenderer object wich we wil use to display

var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the directionsRenderer to the map

directionsDisplay.setMap(map);

//function

function calcRoute() {
    //Create a request 
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //Past the request to the route method
    directionsService.route(request, (result, status) => {
        if(status === google.maps.DirectionsStatus.OK) {
            //get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = `<div>
            from: ${document.getElementById('from').value}. <br />To:  ${document.getElementById('to').value}. <br />
            Driving distance: ${result.routes[0].legs[0].distance.text}. <br />
            Duration: ${result.routes[0].legs[0].duration.text}
            </div>`;

            //Display the routes
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: []});

            //center mapin spain

            map.setCenter(myLating);

            //show error message
            output.innerHTML = `<div class="alert-danger">
            Could not retrieve driving distance.
            </div>`;
        }
    });
}

//create auto complete object for all inputs

var input1 = document.getElementById('from');
var autocomplete1 = new google.maps.places.Autocomplete(input1, {});

var input2 = document.getElementById('to');
var autocomplete2 = new google.maps.places.Autocomplete(input2, {});
