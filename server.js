const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const soap = require('soap');
const axios = require('axios');

var url = 'http://localhost:8081/wsdl?wsdl';

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/src/html/index.html'));
});

router.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/src/html/login.html'));
});

router.get('/getHotels',function(req,res){

    var params = {

        rentalDate: req.query.rentalDate,
        numberOfNights: req.query.numberOfNights,
        numberOfRooms: req.query.numberOfRooms

    }

    soap.createClient(url,function(err,client) {
        client.getHotels(params, function(err, result){

            console.log(result);
            res.json(result);
    
        })
    });

});

router.post('/reserverHotel',function(req,res){

    var params = {

        idHotel: req.body.idHotel,
        rentalDate: req.body.rentalDate,
        numberOfNights: req.body.numberOfNights,
        numberOfRooms: req.body.numberOfRooms

    }

    var soapHeader = {

        token: req.headers.token

    };

    soap.createClient(url,function(err,client) {
        client.addSoapHeader(soapHeader);
        client.reserverHotel(params, function(err, result){
            
            res.json(result);

        })  
    });

});

router.post('/cancelReservation',function(req,res){

    var params = {

        idReservation: req.body.idReservation,

    }

    var soapHeader = {

        token: req.headers.token

    };

    soap.createClient(url,function(err,client) {
        client.addSoapHeader(soapHeader);
        client.cancelReservation(params, function(err, result){
            
            res.json(result);

        })  
    });

});

router.get('/getMyReservation',function(req,res){

    var params = {

        username: req.query.username

    }

    axios.get("http://localhost:8082/bookings",{params:params}).then(response => {
        
        res.json(response.data.data);

    }).catch(error => {
        console.log(error);
    })
    
});

app.use(express.json());

app.use('/public', express.static('public'));

//add the router
app.use('/', router);

app.listen(8080, function() {
    console.log(`Server listening on port 8080...`);
});