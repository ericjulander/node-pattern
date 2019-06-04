var https = require('https');

function getRecentNodeVersion(callback) {
    console.log(2);
    // it skips this because it is asynchronus and will be run on the next pass
    https.get('https://nodejs.org/dist/index.json', function (response) {
        // yay finially off of the shelf!
        console.log(12);

        var rawData = '',
            parsedData;

        response.setEncoding('utf8');
        //when is this called
        response.on('data', function (chunk) {
            rawData += chunk;
        });
        //when is this called
        response.on('end', function () {
            try {
                parsedData = JSON.parse(rawData);
            } catch (e) {
                console.error(e.message);
            }

            //this is weird for a callback to return a value, just think about it
            // WOAH THERE! We need to handle this call back first 😭😭😭😭😭
            var words = callback(null, parsedData[0].version);
            console.log(words, 4);

            // at long last this event listener is called! 🤪🤪🤪🤪🤪
            console.log(16);

            //where does this string go?
            return "more words things";
        });
        // this is called before the event listeners because he is special 😬😬😬
        console.log(13);
        //where does this string go?
        return "more words";

    }).on('error', function (e) {
        //when would this be executed
        callback(e);

        // if this returned a value where would it go?
        return "this is in the error"
    });

    // this is called next because the aforementioned function is currenly on hold.
    console.log(3);

    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return "return";
}

function addNumbers(a, b, callback) {
    //moving down the call stack....
    console.log(5);
    // your normall scheduled stack has been temporarly interupted to take care of this callback
    var notANumber = callback(null, a + b);
    console.log(notANumber);
    //we are back in business!
    console.log(7);
    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return 500;
}


function start() {
    var text, number;

    console.log(1)
    text = getRecentNodeVersion(function (err, nodeVersion) {
        // coming back on the second pass
        console.log(14);

        if (err) {
            console.log(err);
            // if this returned a value where would it go?
            return;
        }

        console.log("Current Node Version:", nodeVersion);
        console.log(15);
        // YAY we finially get to go back to that on end thinggy!
        //this return is also weird, just want you to think about it
        return "this is weird";
    })
    //it has taken care of all the junk neccesary for this pass. Lets continue!
    console.log(4);
    number = addNumbers(2, 3, function (err, sum) {
        if (err) {
            console.log(err);
            //if this returned a value where would it go?
            // also, why do we need a return here?
            return;
        }
        console.log(6);
        console.log(sum);
        //this return is also weird, just want you to think about it
        return "not a number";
    });
    //continuing down the stack
    console.log(8);
    console.log(number);
    console.log(9);
    console.log(text);
    console.log(10);
}

console.log(0);
start();
// start stack has been run through for the first time, moving on...
console.log(11);
// start the second run through back at that http request on the shelf.