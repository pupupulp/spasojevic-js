
const computeTf = (tokenOccurence, tokenCount) => {
    let tf = [];

    for (const token in tokenOccurence) {
        tf.push(tokenOccurence[token] / tokenCount);
    }

    return tf;
};

const computeIdf = (tokenOccurence) => {
    const documentCount = 1;
    let idf = [];

    for (const token in tokenOccurence) {
        tf.push(documentCount / tokenOccurence[token]);
    }

    return idf;
}

const tfidfDistance = (source, target) => {
    const tokens = value.split(" ");
    const tokensSet = [...new Set(value.split(" "))];
    let tokenOccurence = [];
    
    tokensSet.forEach(token => {
        tokenOccurence[token] = tokens.filter(word => word == token).length;
    });

    let tf = computeTf(tokenOccurence, tokens.length);
    let idf = computeIdf(tokenOccurence);
}

module.exports.tfidfDistance = tfidfDistance;