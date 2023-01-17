function initialization(dimensions) {
    let parametres = {};
    let C = dimensions.length;

    for (let c = 1; c < C; c++) {
        parametres['W' + c] = Array.from({length: dimensions[c]}, () => Array.from({length: dimensions[c-1]}, () => Math.random()));
        parametres['b' + c] = Array.from({length: dimensions[c]}, () => Array.from({length: 1}, () => Math.random()));
    }
    return parametres;
}

function forward_propagation(X, parametres) {
    let activations = {'A0':X};
    let C = Object.keys(parametres).length / 2;
    for (let c = 1; c <= C; c++) {
        let Z = math.add(math.multiply(parametres['W' + c], activations['A' + (c-1)]), parametres['b' + c]);
        activations['A' + c] = math.divide(1, math.add(1, math.exp(math.unaryMinus(Z))));
    }
    return activations;
}

function back_propagation(y, parametres, activations) {
    let m = y[0].length;
    let C = Object.keys(parametres).length / 2;
    let dZ = math.subtract(activations['A' + C], y);
    let gradients = {};
    for (let c = C; c >= 1; c--) {
        gradients['dW' + c] = math.divide(math.multiply(dZ, math.transpose(activations['A' + (c - 1)])), m);
        gradients['db' + c] = math.divide(math.sum(dZ, 1), m);
        if (c > 1) {
            dZ = math.multiply(math.multiply(math.dot(math.transpose(parametres['W' + c]), dZ), math.subtract(1, activations['A' + (c - 1)])), activations['A' + (c - 1)]);
        }
    }
    return gradients;
}

function update(gradients, parametres, learning_rate) {
    let C = Object.keys(parametres).length / 2;
    for (let c = 1; c <= C; c++) {
        parametres['W' + c] = math.subtract(parametres['W' + c], math.multiply(gradients['dW' + c], learning_rate));
        parametres['b' + c] = math.subtract(parametres['b' + c], math.multiply(gradients['db' + c], learning_rate));
    }
    return parametres;
}

function predict(X, parametres) {
    let activations = forward_propagation(X, parametres);
    let C = Object.keys(parametres).length / 2;
    let Af = activations['A' + C];
    return math.largerEq(Af, 0.5);
}

function logLoss(yTrue, yPred) {
    var epsilon = 1e-15;
    var loss = 0;
    for (var i = 0; i < yTrue.length; i++) {
        var p = Math.max(epsilon, Math.min(1-epsilon, yPred[i]));
        loss -= yTrue[i] * Math.log(p) + (1 - yTrue[i]) * Math.log(1 - p);
    }
    return loss / yTrue.length;
}

function accuracyScore(yTrue, yPred) {
    var correct = 0;
    for (var i = 0; i < yTrue.length; i++) {
        if (yTrue[i] === yPred[i]) {
            correct++;
        }
    }
    return correct / yTrue.length;
}


function deepNeuralNetwork(X, y, hiddenLayers = [16, 16, 16], learningRate = 0.001, nIter = 3000) {
    // Initialize parameters
    var dimensions = hiddenLayers.slice();
    dimensions.unshift(X.shape[0]);
    dimensions.push(y.shape[0]);
    Math.seedrandom(1);
    var parameters = initialization(dimensions);

    // Create an array for future accuracy and log_loss
    var trainingHistory = new Array(nIter);

    var C = parameters.length / 2;

    // Gradient descent
    for (var i = 0; i < nIter; i++) {
        var activations = forward_propagation(X, parameters);
        var gradients = back_propagation(y, parameters, activations);
        parameters = update(gradients, parameters, learningRate);
        var Af = activations['A' + C];

        // Calculate log_loss and accuracy
        trainingHistory[i][0] = logLoss(y.flatten(), Af.flatten());
        var yPred = predict(X, parameters);
        trainingHistory[i][1] = accuracyScore(y.flatten(), yPred.flatten());
    }

    return trainingHistory;
}