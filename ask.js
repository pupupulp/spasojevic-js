let parsedQuestion = {
    words: []
};

const generateResponse = (knowledge) => {
    let previousWordIndex = 0;

    let response = {
        phrase: '',
        bestSequence: 0,
        currentSequence: 0
    };

    for (const topic in knowledge) {
        let topicWords = topic.split(" ");
        console.log(topicWords);
        
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

const ask = (question, knowledge) => {
    parsedQuestion.words = question.split(" ");
    return generateResponse(knowledge);
};

module.exports.ask = ask;