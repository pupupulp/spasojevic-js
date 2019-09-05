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

    learn(target) {
        const learningChance = 0.5 || Math.random();

        if (this.learningRate < learningChance) return;

        this.knowledge[target.question] = target.question;
    }

    crossover(partner) {
        const parentKnowledge = {
            ...this.knowledge,
            ...partner.knowledge
        };
        const parentKnowledgeLength = (Object.keys(parentKnowledge).length) + 1;
        const knowledgeOptimizer = Math.floor(Math.random() * parentKnowledgeLength);

        const parentsLearningRate = (this.learningRate + partner.learningRate) / 2;
        const offspring1LearningRate = (Math.random() + parentsLearningRate) / 2;
        const offspring2LearningRate = (Math.random() + parentsLearningRate) / 2;        
        
        let offspring1Knowledge = {};
        let offspring2Knowledge = {};
        
        for (const topic in parentKnowledge) {
            if (offspring1LearningRate < (Math.random() + knowledgeOptimizer)) {
                offspring1Knowledge[topic] = parentKnowledge[topic];
            }
            
            if (offspring2LearningRate < (Math.random() + knowledgeOptimizer)) {
                offspring2Knowledge[topic] = parentKnowledge[topic];
            }
        }
        
        const parentsCredibility = (this.credibility + partner.credibility) / 2;
        const offspring1Credibility = Math.floor(Math.random() * (Object.keys(offspring1Knowledge).length) + 1);
        const offspring2Credibility = Math.floor(Math.random() * (Object.keys(offspring2Knowledge).length) + 1);

        const offspring1 = {
            learningRate: offspring1LearningRate,
            credibility: (offspring1Credibility + parentsCredibility) / 2,
            knowledge: offspring1Knowledge
        };

        const offspring2 = {
            learningRate: offspring2LearningRate,
            credibility: (offspring2Credibility + parentsCredibility) / 2,
            knowledge: offspring2Knowledge
        }

        return [new Person(offspring1), new Person(offspring2)];
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

        const crossoverChance = 0.5 || Math.random();
        const bestParent = 0;
        let randomParent = Math.floor(Math.random() * this.people.length);
        randomParent = randomParent > 0 && Math.random() > crossoverChance ? randomParent : 1;

        const offsprings = this.people[bestParent].crossover(this.people[randomParent]);

        this.people.splice(this.people.length - 2, 2, offsprings[0], offsprings[1]);

        let perfectGeneration = true;
        for (let i = 0; i < this.people.length; i++) {
            this.people[i].learn();
            this.people[i].computeCredibility(this.target);

            if(!this.people[i].knowledge.hasOwnProperty(this.target)) {
                perfectGeneration = false;
            }
        }

        if (perfectGeneration) {
            this.sort();
            this.showGeneration();
        } else {
            this.generationNo++;
            
            const self = this;
            setTimeout(function() {
                self.populate();
            }, 20);
        }
    }
}

module.exports.Population = Population;