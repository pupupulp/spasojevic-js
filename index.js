const { Population } = require('./genetic-algorithm');

const target = {
    question: "Hi there!",
    answer: "Hello!"
};
const populationSize = 5;

let population = new Population(target, populationSize);
population.populate();