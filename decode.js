function imageToMatrix(id) {
    var image = document.getElementById(id);
    var w = image.width, h = image.height;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0,0);
    var matrix = context.getImageData(0, 0, w, h).data;
    return matrix;
}

setTimeout( ()=> {
    console.log(imageToMatrix("cat"));
    console.log(imageToMatrix("dog"));
},2000);

