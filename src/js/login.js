import axios from 'axios';

var token = localStorage.getItem("token");

if(token!=null){

    axios.post("http://localhost:8083/api/checkToken",{
        token:token
        }).then(response => {
            window.location.replace("/");
        }).catch(error => {
            console.log("unauthorized")
        })

}


var form = document.getElementById("loginForm");

form.addEventListener("submit", function(event){

    event.preventDefault();
    var data = new FormData(event.target);
    axios.post("http://localhost:8083/api/login",{
        login: data.get('login'),
        mdp: data.get('mdp')
        }).then(response => {
            localStorage.setItem("token",response.data.token);
            window.location.replace("/");
        }).catch(error => {
            window.alert("mauvais logins")
        })

})