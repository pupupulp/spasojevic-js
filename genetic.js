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

        const knowledgeLength = ((Object.keys(this.knowledge).length) + 1);

        this.credibility -= (questionMeanError + answerMeanError) / knowledgeLength;
    }
    
    ask(question) {
        return ask(question, this.knowledge);
    }

    learn(target) {
        const learningChance = 0.8 || Math.random();

        if (this.learningRate < learningChance) return;

        this.knowledge[target.question] = target.answer;
    }

    crossover(partner) {
        const parentKnowledge = {
            ...this.knowledge,
            ...partner.knowledge
        };
        const parentKnowledgeLength = (Object.keys(parentKnowledge).length) + 1;
        
        const parentsLearningRate = (this.learningRate + partner.learningRate) / 2;
        const offspring1LearningRate = (Math.random() + parentsLearningRate) / 2;
        const offspring2LearningRate = (Math.random() + parentsLearningRate) / 2;        
        
        let offspring1Knowledge = {};
        let offspring2Knowledge = {};
        
        let offspring1PivotLimit = Math.floor(Math.random() * parentKnowledgeLength);
        offspring1PivotLimit = offspring1PivotLimit > 0 ? offspring1PivotLimit : (parentKnowledgeLength / 2);
        
        let offspring2PivotLimit = Math.floor(Math.random() * parentKnowledgeLength);
        offspring2PivotLimit = offspring2PivotLimit > 0 ? offspring2PivotLimit : (parentKnowledgeLength / 2);
        
        let pivot = 0;
        
        for (const topic in parentKnowledge) {
            if (pivot < offspring1PivotLimit) {
                offspring1Knowledge[topic] = parentKnowledge[topic];
            }
            
            if (pivot < offspring2PivotLimit) {
                offspring2Knowledge[topic] = parentKnowledge[topic];
            }
            
            pivot++;
        }
        
        const parentsCredibility = Math.abs(this.credibility + partner.credibility) / 2;

        let offspring1Credibility = Math.floor(Math.random() * (Object.keys(offspring1Knowledge).length) + 1);
        offspring1Credibility = (offspring1Credibility + parentsCredibility) / 2;

        let offspring2Credibility = Math.floor(Math.random() * (Object.keys(offspring2Knowledge).length) + 1);
        offspring2Credibility = (offspring2Credibility + parentsCredibility) / 2;

        const offspring3LearningRate = (offspring1LearningRate + offspring2LearningRate);
        const offspring3Credibility = (offspring1Credibility + offspring2Credibility);
        const offspring3Knowledge = {
            ...offspring1Knowledge,
            ...offspring2Knowledge
        };

        const offspring1 = {
            learningRate: offspring1LearningRate,
            credibility: offspring1Credibility,
            knowledge: offspring1Knowledge
        };

        const offspring2 = {
            learningRate: offspring2LearningRate,
            credibility: offspring2Credibility,
            knowledge: offspring2Knowledge
        }

        const offspring3 = {
            learningRate: offspring3LearningRate,
            credibility: offspring3Credibility,
            knowledge: offspring3Knowledge
        }

        return [new Person(offspring1), new Person(offspring2), new Person(offspring3)];
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
            console.log("Credibility: " + person.credibility + " | Knowledge: " + JSON.stringify(person.knowledge));
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

        this.people.splice(this.people.length - 3, 3, offsprings[0], offsprings[1], offsprings[2]);

        let perfectGeneration = true;
        for (let i = 0; i < this.people.length; i++) {
            this.people[i].learn(this.target);
            this.people[i].computeCredibility(this.target);


            if(!this.people[i].knowledge.hasOwnProperty(this.target.question)) {
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
            }, 200);
        }
    }
}

module.exports.Population = Population;