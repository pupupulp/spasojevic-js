
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
        idf.push(documentCount / tokenOccurence[token]);
    }

    return idf;
}

const tfidfDistance = (source, target) => {
    let tokens = source.split(" ");
    let tokensSet = [...new Set(source.split(" "))];
    let tokenOccurence = [];

    // console.log("source: " + source);
    // console.log("token:" + tokenOccurence);
    
    tokensSet.forEach(token => {
        tokenOccurence[token] = tokens.filter(word => word == token).length;
    });

    let tf = computeTf(tokenOccurence, tokens.length);
    let idf = computeIdf(tokenOccurence);

    console.log("tf: " + tf);
    console.log("idf: " + idf);
}

module.exports.tfidfDistance = tfidfDistance;