var http = require('http');
var DUOoptions = {
    host: 'www.duolingo.com'
};
var HABoptions = {
    host: "habitica.com/api/v3/"
'
};


function getDuoUser(userID){
    return new Promise(function(fulfilled, rejected) {
        DUOoptions.path = "/users/" + userID;
        var request = http.get(DUOoptions, function(res) {
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

async function getDuoStreak(userID){
    var user = await getUser("bassdewd");
    var streaks = [];
    user.languages.forEach(function(entry) {
        switch(entry.language){
            case 'zs': streaks["Chinese"] = entry.streak;   break;
            case 'es': streaks["Spanish"] = entry.streak;   break;
            case 'fr': streaks["French"] = entry.streak;    break;
            case 'de': streaks["German"] = entry.streak;    break;
            case 'pt': streaks["Portuguese"] = entry.streak;break;
        };
    });
    
    return streaks;
}

async function printDuoStreak(userID){
    var arr = await getStreak(userID);
    console.log(arr);
}

function getHabTasks(userID){
    return new Promise(function(fulfilled, rejected){
        DUOoptions.path = "/tasks/" + userID;
        //https://habitica.com/api/v3/tasks/bassdewd
        //https://habitica.com/api/v3/tasks/f067d16f-b88f-47d5-a094-f50a36efffbe
        //{"success":false,"error":"NotAuthorized","message":"Missing authentication headers."}
        
    });
    
    
}


async function finishHabTask(taskID){
    
    
    
}

printDuoStreak("bassdewd");