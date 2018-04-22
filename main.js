var http = require('http');
var https = require("https");

var DUOoptions = {
    host: "www.duolingo.com"
};
var HABoptions = {
    host: "habitica.com",
    headers: {
        'x-api-user': 'f067d16f-b88f-47d5-a094-f50a36efffbe',
        'x-api-key': '992930e9-c1d7-4470-8548-da8e2612d8c3'
    },
    method: 'POST'

};

function getDuoUser(userID){
    return new Promise(function(fulfilled, rejected) {
        DUOoptions.path = "/users/" + userID;
        var request = https.get(DUOoptions, function(res) {
            var bodyChunks = [];
            res.on('data', function(chunk) {
                bodyChunks.push(chunk);
            }).on('end', function() {
                var body = Buffer.concat(bodyChunks);
                var jsonObject = JSON.parse(body);
                return fulfilled(jsonObject);
            });
        });

        request.on('error', function(e) {
            console.log('ERROR: ' + e.message);
            return rejected();
        });
    });
}

async function dailyCronDuolingo(userID){
    var user = await getDuoUser(userID);
    user.languages.forEach(function(entry) {
        switch(entry.language){
            case 'zs': if(entry.streak > 0){completeHabTask("ee6301f4-505f-454f-beb8-b3f4387e6e17");} break;
            case 'es': if(entry.streak > 0){completeHabTask("00e1f633-f6de-4d44-b662-c5b4ca6fe6d0");} break;
            case 'fr': if(entry.streak > 0){completeHabTask("f8650dbb-f31b-44c6-890c-791a21bff853");} break;
            case 'de': if(entry.streak > 0){completeHabTask("d41d0bbd-69f9-4b79-aec2-90774ceeb3cd");} break;
            case 'pt': if(entry.streak > 0){completeHabTask("038e278b-5aba-4e83-9f58-4b9dced8c711");} break;
        };
    });
}

function completeHabTask(taskID){
    return new Promise(function(fulfilled, rejected){
        HABoptions.path = "/api/v3/tasks/" + taskID + "/score/up";
        var request = https.get(HABoptions, function(res) {
            var bodyChunks = [];
            res.on('data', function(chunk) {
                bodyChunks.push(chunk);
            }).on('end', function() {
                var body = Buffer.concat(bodyChunks);
                var jsonObject = JSON.parse(body);
                console.log(jsonObject);
                return fulfilled(jsonObject);
            });
        });
        
        request.on('error', function(e) {
            console.log('ERROR: ' + e.message);
            return rejected();
        });
    });
}

dailyCronDuolingo("bassdewd");