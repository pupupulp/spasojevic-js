const { Population } = require('./genetic');

const target = {
    question: "Hi, John!",
    answer: "Hello!"
};
const populationSize = 10;

let population = new Population(target, populationSize);
population.populate();