const { ask } = require('./ask');

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
        this.ask(target.question);
    }
    
    ask(question) {
        ask(question, this.knowledge);
    }
}