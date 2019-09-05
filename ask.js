let parsedQuestion = {
    words: []
};

let response = {
    phrase: '',
    bestSequence: 0,
    currentSequence: 0
};

const generateResponse = (knowledge) {
    let previousWordIndex = 0;

    for (const topic in knowledge) {
        let topicWords = topic.split(" ");

        for (const word in parsedQuestion.words) {
            let parsedWord = parsedQuestion.words[word];

            switch(true) {
                case topicWords.indexOf(parsedWord) > previousWordIndex:
                    response.currentSequence += 1;
                    previousWordIndex = topicWords.indexOf(parsedWord);
                    break;
                case response.currentSequence > response.bestSequence:
                    response.bestSequence = response.currentSequence;
                    response.phrase = knowledge[topic];
                    break;
                case !topicWords.includes(parsedWord):
                    response.currentSequence -= 2;
                    break;
                case topicWords.indexOf(parsedWord) < previousWordIndex:
                    response.currentSequence -= 1;
                    break;
            }
        }
    }


};

const ask = (question, knowledge) {
    parsedQuestion.words = question.split(" ");
    generateResponse(knowledge);
    
    return response.phrase;
};

module.exports.ask = ask;