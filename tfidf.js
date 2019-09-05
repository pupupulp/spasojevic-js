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

const cleanSource = (source) => {
    const stopwords = [
        'i', 'me', 'my', 'myself',
        'we', 'our', 'ours', 'ourselves',
        'you', 'your', 'yours', 'yourself',
        'yourselves', 'he', 'him', 'his', 
        'himself', 'she', 'her', 'hers', 
        'herself', 'it', 'its','itself',
        'they', 'them', 'their', 'theirs',
        'themselves', 'what', 'which', 'who',
        'whom', 'this', 'that', 'these',
        'those', 'am', 'is', 'are',
        'was', 'were', 'be', 'been',
        'being', 'have', 'has', 'had',
        'having', 'do', 'does', 'did',
        'doing', 'a', 'an', 'the',
        'and', 'but', 'if', 'or',
        'because', 'as', 'until', 'while',
        'of', 'at', 'by', 'for',
        'with', 'about', 'against', 'between',
        'into', 'through', 'during', 'before',
        'after', 'above', 'below', 'to',
        'from', 'up', 'down', 'in',
        'out', 'on', 'off', 'over',
        'under', 'again', 'further', 'then',
        'once', 'here', 'there', 'when',
        'where', 'why', 'how', 'all',
        'any', 'both', 'each', 'few',
        'more', 'most', 'other', 'some',
        'such', 'no', 'nor', 'not',
        'only', 'own', 'same', 'so',
        'than', 'too', 'very', 's',
        't', 'can', 'will', 'just',
        'don', 'should', 'now'];
    
    source = source.toLowerCase();
    source = source.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

    const tokens = source.split(' ');
    let trimmed = [];

    // for (let i = 0; tokens.length; i++) {
    //     if (!stopwords.includes(tokens[i])) {
    //         trimmed.push(tokens[i]);
    //     }
    // }

    // source = trimmed.join(' ');

    return source;
}

const tfidfDistance = (source) => {
    source = cleanSource(source);

    let tokens = source.split(' ');
    let tokensSet = [...new Set(source.split(' '))];
    let tokenOccurence = [];

    tokensSet.forEach(token => {
        tokenOccurence[token] = tokens.filter(word => word == token).length;
    });

    let tf = computeTf(tokenOccurence, tokens.length);
    let idf = computeIdf(tokenOccurence);

    return dotMultiply(tf, idf);
}

module.exports.tfidfDistance = tfidfDistance;