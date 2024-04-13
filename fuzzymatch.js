import {gettingDist} from './str_comp.js';

function tokenize(string) {
    return string.toLowerCase().split(/\s+/);
}

function weightedSearch(tokens, targetTokens, tokenWeights, threshold) {
    let score = 0;
    tokens.forEach((token, index) => {
        let weight = tokenWeights[index] || 1;  // regular weight
        let minDistance = Math.min(...targetTokens.map(targetToken => gettingDist(token, targetToken)));
        score += (minDistance <= threhold ? weight : 0);
    });
    return score / tokens.length; // weighted average
}