const { mean, subtract } = require('mathjs');

const { data } = require('./data');
const { ask } = require('./ask');
const { tfidfDistance } = require('./tfidf');

class Person {
    constructor(config) {
        this.learningRate = config.learningRate;
        this.credibility = config.credibility;
        this.knowledge = config.knowledge;
    }

    learn() {

    }

    crossover(partner) {

    }

    computeCredibility(target) {
        let questionMeanError = 0;
        let answerMeanError = 0;

        const targetQuestionTfidf = tfidfDistance(target.question);
        const targetAnswerTfidf = tfidfDistance(target.answer);

        for (const topic in this.knowledge) {
            const questionTfidf = tfidfDistance(topic);
            const answerTfidf = tfidfDistance(this.knowledge[topic]);

            const questionError = subtract(targetQuestionTfidf, questionTfidf.resize(targetQuestionTfidf.size()));
            const answerError = subtract(targetAnswerTfidf, answerTfidf.resize(targetAnswerTfidf.size()));
            
            questionMeanError += mean(questionError);
            answerMeanError += mean(answerError);

        }
        console.log(questionMeanError + answerMeanError)
        this.credibility -= (questionMeanError + answerMeanError);
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
                learningRate: Math.random(),
                credibility: Math.floor(Math.random() * (Object.keys(data[selector].knowledge).length) + 1),
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

        this.sort();
        this.showGeneration();
    }
}

module.exports.Population = Population;