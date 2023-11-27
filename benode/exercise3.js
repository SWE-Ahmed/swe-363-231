// importing the required libraries
const prompt = require('prompt-sync')();

// creating the bank of questions and answers
const bank = [
    {
        "question": "What is your name?",
        "answer": "My name is Benode. Im your Node.js chatbot"
    },
    {
        "question": "What do you feel right now?",
        "answer": "A bit cold to be honest with you"
    },
    {
        "question": "Who is your creator?",
        "answer": "My creator is Ahmed Almohammed"
    },
    {
        "question": "Will human beings live past 2999 years?",
        "answer": "No"
    },
    {
        "question": "Tell me a joke",
        "answer": "Waiting for a joke..."
    },
    {
        "question": "What is 9 + 10?",
        "answer": "21"
    }
];

// storing in the question and providing the appropriate answer
let response = prompt('Ask away!: ');
let answer = "";
// putting the mechanism in a loop controlled by an exit keyword
while (response !== "exit"){
    for (let index = 0; index < bank.length; index++){
        if (bank[index]['question'] == response){
            answer = bank[index]['answer'];
            break;
        }
    }
    console.log(answer);
    response = prompt('Ask away!: ');
}