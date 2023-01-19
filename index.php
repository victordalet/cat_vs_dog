<html>
<head>
    <title>TEST</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<h1>Data</h1>
<div class="container-data">
    <?php

        for ($i=1 ; $i<20 ; $i++) {
            echo "<img id='cat".$i."' src='assets/chat".$i.".png'>";
        }
        for ($i=1 ; $i<20 ; $i++) {
            echo "<img id='dog".$i."' src='assets/chien".$i.".png'>";
        }
    ?>
</div>
<br>
<h1>Prediction : </h1>
<img id="predict" src="assets/chat8.png">
<h2>Cette image est <span id="write"></span></h2>
<h3>Présition : <span id="write2"></span>%</h3>
</body>
<script src="script.js"></script>
<script src="decode.js"></script>
</html>


