const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// listen for log in event
eventEmitter.on('LogIn', () => {
    const timeStamp = new Date(Date.now()).toUTCString();
    console.log("New Log in: ", timeStamp);
});

// listen for log out event
eventEmitter.on('LogOut', () => {
    const timeStamp = new Date(Date.now()).toUTCString();
    console.log("New Log Out: ", timeStamp);
});

// create the loop responsible for imitating events
async function mainLoop(){
    let count = 0
    while (count < 10){;
        eventEmitter.emit('LogIn');
        await new Promise(r => setTimeout(r, 2000));
        eventEmitter.emit('LogOut');
        await new Promise(r => setTimeout(r, 2000));``
        count = count + 1;
    }
}

// run the main loop
mainLoop()