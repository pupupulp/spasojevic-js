const { Population } = require('./genetic');

const target = {
    question: "Hi, how are you?",
    answer: "I'm fine."
};
const populationSize = 10;

let population = new Population(target, populationSize);
