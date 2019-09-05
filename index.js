const { Population } = require('./genetic');

const target = {
    question: "Hi there!",
    answer: "Hello!"
};
const populationSize = 5;

let population = new Population(target, populationSize);
population.populate();