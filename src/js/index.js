import axios from 'axios';

var url = 'http://localhost:8081/wsdl?wsdl';

var token = localStorage.getItem("token");

if(token!=null){

    axios.post("http://localhost:8083/api/checkToken",{
        token:token
        }).then(response => {
            console.log("good")
        }).catch(error => {
            window.location.replace("/login");
        })

}else{
    window.location.replace("/login");
}

var disconnect = document.getElementById("disconnect");

disconnect.addEventListener("click",function(event){

    localStorage.removeItem("token");
    document.location.reload();

});

var getHotels = document.getElementById("getHotels");

getHotels.addEventListener("submit",function(event){

    event.preventDefault();
    var data = new FormData(event.target);
    var params = {

        rentalDate: data.get("rentalDate"),
        numberOfNights: data.get("numberOfNights"),
        numberOfRooms: data.get("numberOfRooms")

    }

    axios.get("/getHotels",{params:params}).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

})

var reserverHotel = document.getElementById("reserverHotel");

reserverHotel.addEventListener("submit",function(event){

    event.preventDefault();
    var data = new FormData(event.target);
    var params = {

        idHotel: data.get("idHotel"),
        rentalDate: data.get("rentalDate"),
        numberOfNights: data.get("numberOfNights"),
        numberOfRooms: data.get("numberOfRooms")

    }

    axios.post("/reserverHotel",params,{
        headers: {
            token : token
        }
    }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

})

var cancelReservation = document.getElementById("cancelReservation");

cancelReservation.addEventListener("submit",function(event){

    event.preventDefault();
    var data = new FormData(event.target);
    var params = {

        idReservation: data.get("idReservation"),

    }

    axios.post("/cancelReservation",params,{
        headers: {
            token : token
        }
    }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

})