const { data } = require('./data');
const { ask } = require('./ask');
const { tfidfDistance } = require('./tfidf');

class Person {
    constructor(config) {
        this.learningRate = config.mutationRate;
        this.credibility = this.fitness;
        this.knowledge = config.knowledge;
    }

    learn() {

    }

    crossover(partner) {

    }

    computeCredibility(target) {

        this.credibility += tfidfDistance(target.answer, target.answer);
    }
    
    ask(question) {
        return ask(question, this.knowledge);
    }
}

class Population {
    constructor(target, populationSize) {
        this.people = [];
        this.target = target;
        this.generationNo = 0;

        while (populationSize--) {
            let selector = Math.floor(Math.random() * data.length);

            const person = new Person({
                mutationRate: Math.random(),
                fitness: Math.floor(Math.random() * data[selector].knowledge.length),
                knowledge: data[selector].knowledge
            });

            this.people.push(person);
        }
    }

    sort() {
        this.people.sort((a, b) => {
            return b.credibility - a.credibility;
        })
    }

    showGeneration() {
        console.log("Generation: " + this.generationNo);
        this.people.map(person => {
            console.log("\n")
            console.log("Credibility: " + person.credibility);
            console.log("Knowledge: " + JSON.stringify(person.knowledge));
            console.log("\n")
        })
    }

    populate() {
        for (let i = 0; i < this.people.length; i++) {
            this.people[i].computeCredibility(this.target);
        }

        // this.sort();
        // this.showGeneration();
    }
}

module.exports.Population = Population;