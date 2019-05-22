var https = require('https');

function getRecentNodeVersion(callback) {
    console.log(2);                                             ///////0
    https.get('https://nodejs.org/dist/index.json', function (response) {
        console.log(12);                                         ///////1

        var rawData = '',
            parsedData;

        response.setEncoding('utf8');
        //when is this called
        response.on('data', function(chunk) {
            rawData += chunk;
        });
        //when is this called
        response.on('end', function() {
            try {
                parsedData = JSON.parse(rawData);
            } catch (e) {
                console.error(e.message);
            }
                        
            //this is weird for a callback to return a value, just think about it
            var words = callback(null, parsedData[0].version);
            console.log(words);
            console.log(16);                                     //////////2
            
            //where does this string go?
            return "more words things";
        });
        
        console.log(13);                                     //////////3
        //where does this string go?
        return "more words";

    }).on('error', function(e) {
        //when would this be executed
        callback(e);

        // if this returned a value where would it go?
        return "this is in the error"
    });

    console.log(3);                                         //////////////4

    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return "return";
}

function addNumbers(a, b, callback) {
    console.log(5);
    var notANumber = callback(null, a + b);
    console.log(notANumber);
    console.log(7);                                              ////////6
    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return 500;
}


function start() {
    var text, number;

    console.log(1)                                              ////////7
    text = getRecentNodeVersion(function (err, nodeVersion) {
        console.log(14 );                                             /////////8

        if (err) {
            console.log(err);
            // if this returned a value where would it go?
            return;
        }

        console.log("Current Node Version:", nodeVersion);
        console.log(15);                                            //////////9

        //this return is also weird, just want you to think about it
        return "this is weird";
    })

    console.log(4);                                                 //////////10
    number = addNumbers(2, 3, function (err, sum) {
        if (err) {
            console.log(err);
            //if this returned a value where would it go?
            // also, why do we need a return here?
            return;
        }
        console.log(6);                                         //////////11
        console.log(sum);
        //this return is also weird, just want you to think about it
        return "not a number";
    });

    console.log(8);                                     /////////12
    console.log(number);
    console.log(9);                                     /////////13
    console.log(text);
    console.log(10);                                         /////////14
}

console.log(0);                                           ///////15
start();
console.log(11);                                             ///////16
