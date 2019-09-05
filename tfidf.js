const { dotMultiply, matrix, log10 } = require('mathjs');

const computeTf = (tokenOccurence, tokenCount) => {
    let tf = [];

    for (const token in tokenOccurence) {
        tf.push(tokenOccurence[token] / tokenCount);
    }

    tf.map(v => { return log10(v); });

    return matrix(tf);
};

const computeIdf = (tokenOccurence) => {
    const documentCount = 1;
    let idf = [];

    for (const token in tokenOccurence) {
        idf.push(documentCount / tokenOccurence[token]);
    }

    idf.map(v => { return log10(v); });

    return matrix(idf);
}

const tfidfDistance = (source) => {
    let tokens = source.split(" ");
    let tokensSet = [...new Set(source.split(" "))];
    let tokenOccurence = [];

    tokensSet.forEach(token => {
        tokenOccurence[token] = tokens.filter(word => word == token).length;
    });

    let tf = computeTf(tokenOccurence, tokens.length);
    let idf = computeIdf(tokenOccurence);

    return dotMultiply(tf, idf);
}

module.exports.tfidfDistance = tfidfDistance;