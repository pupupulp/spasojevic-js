const { Population } = require('./genetic-algorithm');

const target = {
    question: "beagle",
    answer: ""
};
const populationSize = 5;

let population = new Population(target, populationSize);
population.populate();