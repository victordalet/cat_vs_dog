var n = 175*175*4; // w*h*(rgba)

let weights = [];
for (let i = 0; i < n; i++) {
    weights.push(Math.random());
}

function sigmoid (x) {
    return 1 / (1 + Math.exp(-x));
}

function predict(inputs) {
    let output = 0;
    for (let i = 0; i < inputs.length; i++) {
        output += weights[i] * inputs[i];
    }
    return sigmoid(output);
}

function train(inputs, target) {
    let output = predict(inputs);
    let error = target - output;
    for (let i = 0; i < inputs.length; i++) {
        weights[i] += error * inputs[i] * 0.1;
    }
}

setTimeout(() => {
    for (let i = 0 ; i < 200 ; i++) {
        for (let j = 1 ; j < 20 ; j++) {
            train(imageToMatrix("cat"+j), 1);
        }
        for (let j = 1 ; j < 20 ; j++) {
            train(imageToMatrix("dog"+j), 0);
        }
        for (let j = 1 ; j < 20 ; j++) {
            train(imageToMatrix("pero"+j), 0);
        }
    }


    var p = predict(imageToMatrix("predict"));
    console.log(p);

    if (p === 0) {
        console.log("C'est un chien ou  un perroquet");
        document.getElementById("write").innerHTML = "un chien ou un perroquet.";
        document.getElementById("write2").innerHTML = p*100;

        weights = [];
        for (let i = 0; i < n; i++) {
            weights.push(Math.random());
        }

        for (let i = 0 ; i < 200 ; i++) {
            for (let j = 1 ; j < 20 ; j++) {
                train(imageToMatrix("dog"+j), 0);
            }
            for (let j = 1 ; j < 20 ; j++) {
                train(imageToMatrix("pero"+j), 1);
            }
        }

        p = predict(imageToMatrix("predict"));
        console.log(p);

        if (p === 0) {
            console.log("C'est un chien");
            document.getElementById("write").innerHTML = "un chien.";
            document.getElementById("write2").innerHTML = 100 - p*100;
        }

        if (p === 1) {
            console.log("C'est un pero");
            document.getElementById("write").innerHTML = "un perroquet.";
            document.getElementById("write2").innerHTML = p*100;
        }



    }
    else if (p === 1) {
        console.log("C'est un chat");
        document.getElementById("write").innerHTML = "un chat.";
        document.getElementById("write2").innerHTML = p*100;
    }


},500);

