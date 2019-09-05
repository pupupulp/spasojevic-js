const { Population } = require('./genetic');

const target = {
    question: "Hello there.",
    answer: "Oh hi."
};
const populationSize = 10;

let population = new Population(target, populationSize);
population.populate();