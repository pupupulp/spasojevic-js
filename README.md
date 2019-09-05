# spasojevic-js

![contributors](https://badgen.net/github/contributors/pupupulp/spasojevic-js)
![stars](https://badgen.net/github/stars/pupupulp/spasojevic-js)
![commits](https://badgen.net/github/commits/pupupulp/spasojevic-js)
![last commit](https://badgen.net/github/last-commit/pupupulp/spasojevic-js)
[![License](https://badgen.net/github/license/pupupulp/spasojevic-js)](https://github.com/pupupulp/spasojevic-js/blob/master/LICENSE)

A simulation of knowledge transfer through generations

## Quickstart

+ To use please run the either of the following code on terminal:

```cli
$   npm start
$   node index.js
```

## Features

+ Data are categorized separately under **/data** folder.

+ Population creation using specified number.

+ Implemented version of **TF-IDF** based on understanding, for checking similarity of strings.

+ Devised an implementation of **Genetic Algorithm** concepts.

    - Defined **learn()** function that acts as a mutation function, it uses the **learningRate** property as a mutation rate.
    - Defined **crossover()** function that creates 3 offsprings, 2 of them are based on the parents average and crossover chance to acquire their parents knowledge, and 3rd one is a wildcard that used combined result of the first 2 offspring. A default parent is set to the best possible candidate and a default **crossoverChance** of 0.5 is defined which triggers whether a random or the second best candidate is selected as a partner parent.
    - Defined **credibility** property which acts as a fitness value. Credibility is computed using **computeCredibility()** function which then uses that implementation of the **TF-IDF** approach to check whether a member of the population has a knowledge regarding the target specified on **index.js**. Each knowledge contained by the person is resized accordingly to fit the size TF-IDF matrix of the target which is the subtracted after to get the error distance, which is then summed up and averaged before applying the adjustment to the credibility.


## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/pupupulp/spasojevic-js/issues/new).

### Contributors

### Author

**Eagan Martin**
- [Github](https://github.com/pupupulp)
- [LinkedIn]()

### License

Copyright © 2019, [Eagan Martin](https://github.com/pupupulp). Release under the [MIT License](https://github.com/pupupulp/spasojevic-js/blob/master/LICENSE)