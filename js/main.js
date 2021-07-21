var initialized = false;
var tools = true;
var tool = 'draw';
var game;
var actualFrame = 0;
var countFrame = 0;
var countObject = 0;

var gambiarra = 0;
var gambiarraY = -74;

function charNum(i) {
    if (i === 10) {
        return 'a';
    } else if (i === 11) {
        return 'b';
    } else if (i === 12) {
        return 'c';
    } else if (i === 13) {
        return 'd';
    } else if (i === 14) {
        return 'e';
    } else if (i === 15) {
        return 'f';
    }
    return i;
}


function init() {
    countFrame = 0;
    actualFrame = 0;
    game = {
        title: $('[name=title]').val(),
        fps: $('[name=fps]').val(),
        block: $('[name=block]').val(),
        colors: [],
//        width: $('[name=width]').val(),
//        height: $('[name=height]').val(),
        //aqui é a mecânica do jogo
        levels: [
            {
                title: 'round one',
                intro: 0, //ID do objeto
                backgrounds: [
                    {
                        object: 1,
                        parallax: 0 //-10 ~10 ???
                    },
                    {
                        object: 2,
                        parallax: 3 //-10 ~10 ???
                    }
                ],
                events: [
                    {
                        x: 123,
                        y: 50,
                        object: 3 //personagem principal
                    },
                    {
                        x: 400,
                        y: 50,
                        object: 4 //inimigo
                    }
                ],
                game_over: 5 //ID do objeto
            }
        ],
        objects: [
            {
                type: $('[name=type]').val(),
                object: $('[name=object]').val(),
                frames: []
            }
        ]
    };
    updateColors();
    addFrame();
    $('[name=title]').keyup(function () {
        game['title'] = $(this).val();
        $('#save').val(str_replace(',null', '', JSON.stringify(game)));
    });

    $('[name=width]').keyup(function () {
//        game['width'] = $(this).val();
        game['objects'][countObject]['width'] = $(this).val();
        $('#save').val(str_replace(',null', '', JSON.stringify(game)));
    });
    $('[name=height]').keyup(function () {
//        game['height'] = $(this).val();
        game['objects'][countObject]['height'] = $(this).val();
        $('#save').val(str_replace(',null', '', JSON.stringify(game)));
    });
    $('[name=block]').keyup(function () {
        game['block'] = $(this).val();
        $('#save').val(str_replace(',null', '', JSON.stringify(game)));
    });
    $('[name=fps]').keyup(function () {
        game['fps'] = $(this).val();
        $('#save').val(str_replace(',null', '', JSON.stringify(game)));
    });

    $('[name=key]').change(function () {
        game['objects'][countObject]['frames'][actualFrame]['key'] = $(this).val();
        $('#keys').html('');
        if (typeof game['objects'][countObject] !== "undefined") {
            if (typeof game['objects'][countObject]['frames'] !== "undefined") {
                var ff = game['objects'][countObject]['frames'];
                if (ff) {
                    for (var i = 0; i < ff.length; i++) {
                        if (ff[i]['key'] !== '') {
                            $('#keys').append('<div>' + ff[i]['key'] + '</div>');
                        }
                    }
                }
            }
        }
    });
    $('[name=label]').keyup(function () {
        game['objects'][countObject]['frames'][actualFrame]['label'] = $(this).val();
    });
    $('[name=next_frame]').keyup(function () {
        game['objects'][countObject]['frames'][actualFrame]['next_frame'] = $(this).val();
    });
}
var countColor = 0;
function selectColor(c) {
    for (var i = 0; i < game['colors'].length; i++) {
        if (game['colors'][i] === c) {
            actualColor = i;
        }
    }
}
function updateColors() {
//        if (typeof game['colors'] === "undefined") {
    countColor = 0;
    $('#colors').html('');
            game['colors'] = new Array(999);
            addColor('000000');
            addColor('111111');
            addColor('222222');
            addColor('333333');
            addColor('444444');
            addColor('555555');
            addColor('666666');
            addColor('777777');
            addColor('888888');
            addColor('999999');
            addColor('aaaaaa');
            addColor('bbbbbb');
            addColor('cccccc');
            addColor('dddddd');
            addColor('eeeeee');
            addColor('ffffff');

            addColor('6bcae2');
            addColor('1abc9c');
            addColor('16a085');
            addColor('2ecc71');
            addColor('27ae60');
            addColor('3898db');
            addColor('2980b9');
            addColor('9b59b6');
            addColor('8e44ad');
            addColor('34495e');
            addColor('2c3e50');
            addColor('f1c40f');
            addColor('f39c12');
            addColor('e67322');
            addColor('d35400');
            addColor('e74c3c');
            addColor('c0392b');
            addColor('ecf0f1');
            addColor('bdc3c7');
            addColor('95a5a6');
            addColor('7f8c8d');

            addColor('e70000');
            addColor('ff8c00');
            addColor('ffef00');
            addColor('00811f');
            addColor('0044ff');
            addColor('760089');

            //                addColor('712580');
//                addColor('123456');
//                addColor('321456');
//                addColor('654321');
//                addColor('654123');
//                addColor('abcdef');
//                addColor('fedabc');
//                addColor('abcfed');
//                addColor('cbafed');
//                addColor('cbadef');
//                addColor('ffffff');
//                countObject++;
//                addColor('712580');
//                addColor('ffffff');
//                addColor('cccccc');
//                
//                for (var r = 0; r < 15; r++) {
//                    for (var g = 0; g < 15; g++) {
//                        for (var b = 0; b < 15; b++) {
//                            if (r % 5 === 0 && g % 5 === 0 && b % 5 === 0) {
//                                addColor(charNum(r) + '0' + charNum(g) + '0' + charNum(b) + '0');
////                                addColor(charNum(r) + '3' + charNum(g) + '3' + charNum(b) + '3');
////                                addColor(charNum(r) + '6' + charNum(g) + '6' + charNum(b) + '6');
////                                addColor(charNum(r) + '9' + charNum(g) + '9' + charNum(b) + '9');
////                                addColor(charNum(r) + 'c' + charNum(g) + 'c' + charNum(b) + 'c');
////                                addColor(charNum(r) + 'f' + charNum(g) + 'f' + charNum(b) + 'f');
//                            }
//
//                        }
//                    }
//                }
//    }


}
function addColor(c) {
    game['colors'][countColor] = c;
    $('#colors').append('<a style="display: block; width: 20px; height: 20px; float: left; margin: 1px; background-color: #' + c + ';" onclick="selectColor(\'' + c + '\')"></a>');
    countColor++;
}
function getColor(i) {
    return game['colors'][i];
}
function removePixel(i) {
    game['objects'][countObject]['frames'][actualFrame]['pixels'][i] = {};
}
function addFrame() {
    actualFrame = countFrame;
    var pixels = [];
    game['objects'][countObject]['frames'][countFrame] = {
        label: '',
        next_frame: '',
        key: '',
        key_type: '',
        hp: '',
        mp: '',
        atk: '',
        def: '',
        action: '', //jump, crouch, 
        pixels: pixels
    };
    $('#frames').append('<div id="frame-' + countFrame + '" class="frame" onclick="loadFrame(' + countFrame + ');"></div>');
    if (countFrame > 0) {
        //copia o último
        var pxs = game['objects'][countObject]['frames'][countFrame - 1]['pixels'];
//                    background(0);
        for (var i = 0; i < pxs.length; i++) {
            if (pxs[i]) {
                var x = Number(pxs[i].split(',')[0]);
                var y = Number(pxs[i].split(',')[1]);
                var c = Number(pxs[i].split(',')[2]);
                game['objects'][countObject]['frames'][actualFrame]['pixels'][i] = x + "," + y + "," + c;
            }
        }
    }
    countFrame++;
}

var copyActual;
function copyFrame() {
    copyActual = actualFrame;
}
function pasteFrame() {
    var pxs = game['objects'][countObject]['frames'][copyActual]['pixels'];
//                    background(0);
    for (var i = 0; i < pxs.length; i++) {
        if (pxs[i]) {
            var x = Number(pxs[i].split(',')[0]);
            var y = Number(pxs[i].split(',')[1]);
            var c = Number(pxs[i].split(',')[2]);
            game['objects'][countObject]['frames'][actualFrame]['pixels'][i] = x + "," + y + "," + c;
        }
    }
}
function clearFrame() {
    game['objects'][countObject]['frames'][actualFrame]['pixels'] = [];
}
function deleteFrame() {
//    game['objects'][countObject]['frames'][actualFrame]['pixels'] = [];
//    game['objects'][countObject]['frames'][actualFrame]['pixels'] = null;
}
function changeColor(from, to) {
    var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
    for (var i = 0; i < pxs.length; i++) {
        if (pxs[i]) {
            var x = Number(pxs[i].split(',')[0]);
            var y = Number(pxs[i].split(',')[1]);
            var c = Number(pxs[i].split(',')[2]);
            if (from === c) {
                c = to;
            }
            game['objects'][countObject]['frames'][actualFrame]['pixels'][i] = x + "," + y + "," + c;
        }
    }
}
function moveFrame(where) {
//    tool = 'move';
    var right = 0;
    var top = 0;
    if (where === 'left') {
        right = -1;
    } else if (where === 'right') {
        right = 1;
    } else if (where === 'up') {
        top = 1;
    } else if (where === 'down') {
        top = -1;
    }

    var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
//                    background(0);
    for (var i = 0; i < pxs.length; i++) {
        if (pxs[i]) {
            var x = Number(pxs[i].split(',')[0]);
            var y = Number(pxs[i].split(',')[1]);
            var c = Number(pxs[i].split(',')[2]);
            game['objects'][countObject]['frames'][actualFrame]['pixels'][i] = (x + right) + "," + (y + top) + "," + c;
        }
    }
}
function getPixelColor(xx, yy) {
    try {
        var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
        for (var i = 0; i < pxs.length; i++) {
            if (pxs[i]) {
                var x = Number(pxs[i].split(',')[0]);
                var y = Number(pxs[i].split(',')[1]);
                var c = Number(pxs[i].split(',')[2]);
                if (x === xx && y === yy) {
                    return c;
                }
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}
function getRandPixel() {
//    try {
//        var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
//        game['colors'];
//        for (var i = 0; i < pxs.length; i++) {
//            var l=Math.floor(Math.random()*pxs.length)-1;
            
            
            
//            if (pxs[i]) {
//                var x = Number(pxs[i].split(',')[0]);
//                var y = Number(pxs[i].split(',')[1]);
//                var c = Number(pxs[l].split(',')[2]);
//                game['colors'][Math.floor(Math.random()*game['colors'].length)-1];
//                return game['colors'][Math.floor(Math.random()*game['colors'].length)-1];
//                return game['colors'][Math.floor(Math.random()*25)];
//                return 2;
//                pxs.length
//                if (x === xx && y === yy) {
//                    return c;
//                }
//            }
//        }
//        return false;
//    } catch (e) {
//        return false;
//    }
}
function setPixelColor(xx, yy, c) {
    var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
    for (var i = 0; i < pxs.length; i++) {
        if (pxs[i]) {
            var x = Number(pxs[i].split(',')[0]);
            var y = Number(pxs[i].split(',')[1]);
            if (x === xx && y === yy) {
                game['objects'][countObject]['frames'][actualFrame]['pixels'][i] = x + "," + y + "," + actualColor;
            }
        }
    }

//                 var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
//                for (var i = 0; i < pxs.length; i++) {
//                    if (pxs[i]) {
//                        var x = Number(pxs[i].split(',')[0]);
//                        var y = Number(pxs[i].split(',')[1]);
//                        if (x===xx && y===yy) {
//                            pxs[i]=x+','+y+','+c;
//                        }
//                    }
//                }
}

function paintBackground() {


//    fps = Number($('[name=fps]').val());
//    s = Number($('[name=block]').val());
//    rows = s * Number($('[name=width]').val()) / s; //linha
//    cols = s * Number($('[name=height]').val()) / s; //coluna
//    w = rows * s;
//    h = cols * s;


//    var s = Number($('[name=block]').val());
//    var rows = s * Number($('[name=width]').val()) / s; //linha
//    var cols = s * Number($('[name=height]').val()) / s; //coluna

//    var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
//                    background(0);
//    for (var i = 0; i < pxs.length; i++) {
//        if (pxs[i]) {
//            var x = Number(pxs[i].split(',')[0]);
//            var y = Number(pxs[i].split(',')[1]);
//            var c = Number(pxs[i].split(',')[2]);
//            game['objects'][countObject]['frames'][actualFrame]['pixels'][i] = x + "," + y + "," + c;
//        }
//    }
    s = Number($('[name=block]').val());
    rows = s * Number($('[name=width]').val()) / s; //linha
    cols = s * Number($('[name=height]').val()) / s; //coluna
    w = rows * s;
    h = cols * s;


//    copyFrame();
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < cols; y++) {
////                setPixelColor(x , y, actualColor);
//                setPixelColor(x, y, actualColor);
//            } else 
//             if (typeof pixels[x][y] === "undefined") {
//            if (getPixelColor(x, y) === false) {
//            if (getRandPixel() === false) {
//                var c = getColor(actualColor);
//                var c = getRandPixel();
                var color=Math.floor(Math.random()*game['colors'].length)-1;
                var c = game['colors'][color];
                var r = Number(hexToRGB('#' + c)[0]);
                var g = Number(hexToRGB('#' + c)[1]);
                var b = Number(hexToRGB('#' + c)[2]);
                pixel(x, y, r, g, b, 255);
                pixels[x][y] = r + ',' + g + ',' + b;
                game['objects'][countObject]['frames'][actualFrame]['pixels'][countPixel] = x + "," + y + "," + color;
                countPixel++;
//            }
        }
    }
//    pasteFrame();
//    for (var i = 0; i < pxs.length; i++) {
//        if (pxs[i]) {
//            var x = Number(pxs[i].split(',')[0]);
//            var y = Number(pxs[i].split(',')[1]);
//            var c = Number(pxs[i].split(',')[2]);
//            game['objects'][countObject]['frames'][actualFrame]['pixels']=pxs;
//        }
//    }
}

function paintRound(x, y, from, to) {

//    if (typeof from==="undefined") {
//        from=null;
//    }

    if (to >= 0) {
        //pinta ao redor, função recursiva
        if (getPixelColor(x - 1, y + 1) === from) {
            setPixelColor(x - 1, y + 1, to);
            paintRound(x - 1, y + 1, from, to);
        }
        if (getPixelColor(x, y + 1) === from) {
            setPixelColor(x, y + 1, to);
            paintRound(x, y + 1, from, to);
        }
        if (getPixelColor(x + 1, y + 1) === from) {
            setPixelColor(x + 1, y + 1, to);
            paintRound(x + 1, y + 1, from, to);
        }
        if (getPixelColor(x - 1, y) === from) {
            setPixelColor(x - 1, y, to);
            paintRound(x - 1, y, from, to);
        }
        if (getPixelColor(x + 1, y) === from) {
            setPixelColor(x + 1, y, to);
            paintRound(x + 1, y, from, to);
        }
        if (getPixelColor(x - 1, y - 1) === from) {
            setPixelColor(x - 1, y - 1, to);
            paintRound(x - 1, y - 1, from, to);
        }
        if (getPixelColor(x, y - 1) === from) {
            setPixelColor(x, y - 1, to);
            paintRound(x, y - 1, from, to);
        }
        if (getPixelColor(x + 1, y - 1) === from) {
            setPixelColor(x + 1, y - 1, to);
            paintRound(x + 1, y - 1, from, to);
        }
    }
}


function paintInside(x, y) {
    paintRound(x, y, getPixelColor(x, y), actualColor);
    //aqui faz o preenchimento de cor
    //varre os pixels ao redor de onde clicou pra ver se é igual
    //se for, tinge e continua a busca recursiva até não encontrar mais pixels

}
function loadFrame(i) {
    //desenha o frame na tela
    actualFrame = i;
    $('[name=key]').val(game['objects'][countObject]['frames'][actualFrame]['key']);
    $('[name=label]').val(game['objects'][countObject]['frames'][actualFrame]['label']);
    $('[name=next_frame]').val(game['objects'][countObject]['frames'][actualFrame]['next_frame']);
    $('#save').val(JSON.stringify(game));
}
//            function removeFrame(i) {
//                game['objects'][countObject]['frames'][i] = null;
//                $('#frame-' + i).remove();
//                //quando remove um frame, precisa refazer todo array
//            }
var fps, s, rows, cols, w, h;
var cnv;
var pixels = new Array(999);
var lastPixels = new Array(999);
function pixel(x, y, r, g, b, a) {
    if (typeof pixels[x] === "undefined") {
        pixels[x] = new Array(999);
    }
    if (typeof pixels[x][y] === "undefined") {
        pixels[x][y] = new Array(999);
    }
    pixels[x][y] = r + ',' + g + ',' + b;

//                fill(r, g, b, a);
//                if (playing) {
//                    stroke(r, g, b);
//                } else {
//                    stroke(255, 255, 255);
//                }
//                rect(((x - 1 + 1) * s), h - ((y + 1) * s), s, s);
}
function setSize(xx, yy, b) {
    $('[name=width]').val(xx);
    $('[name=height]').val(yy);
    $('[name=block]').val(b);
    game['objects'][countObject]['width'] = xx;
    game['objects'][countObject]['height'] = yy;
//    game['objects'][countObject]['type'] =;
    $('#save').val(str_replace(',null', '', JSON.stringify(game)));
    gambiarraY = 0;
    gambiarra = 0;
    if (xx === 136) {
        gambiarraY = -74;
        gambiarra = 0;
    }
    
//    w = Number(game['objects'][countObject]['width']);
//    h = Number(game['objects'][countObject]['height']);
    s = Number($('[name=block]').val());
    
    rows = s * xx / s; //linha
    cols = s * yy / s; //coluna
    countFrame = game['objects'][countObject]['frames'].length;
    
    for (var x = 0; x < rows; x++) {
//        if (typeof pixels[x] === "undefined") {
        pixels[x] = new Array(9999);
        lastPixels[x] = new Array(9999);
//        }
        for (var y = 0; y < cols; y++) {
//            if (typeof pixels[x][y] === "undefined") {
            pixels[x][y] = new Array(9999);
            lastPixels[x][y] = new Array(9999);
//            }
        }
    }
    stage();
//    cnv = createCanvas(w, h);
}
function drawPixels() {
//                background(255);
    s = Number($('[name=block]').val());
//    stroke(255,255,255);
strokeWeight(1); // Default
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < cols; y++) {
            var r = 255;
            var g = 255;
            var b = 255;
            if (typeof pixels[x][y] !== "undefined" && pixels[x][y] !== lastPixels[x][y]) {
                lastPixels[x][y] = pixels[x][y];
                var sp = pixels[x][y].split(',');
                r = sp[0];
                g = sp[1];
                b = sp[2];
//                stroke(255,255,255);
                stroke(r, g, b);
                fill(r, g, b, 255);
                if (playing) {
//                    stroke(r, g, b);
                } else {
//                    stroke(255, 255, 255);
                }
                rect(((x - 1 + 1) * s), h - ((y + 1) * s), s, s);
            } else if (lastPixels[x][y] !== pixels[x][y]) {
//                        } else {
                pixels[x][y] = r + ',' + g + ',' + b;
                lastPixels[x][y] = pixels[x][y];
//                stroke(255,255,255);
                stroke(r, g, b);
                fill(r, g, b, 255);
                if (playing) {
//                    stroke(r, g, b);
                } else {
//                    stroke(255, 255, 255);
                }
                rect(((x - 1 + 1) * s), h - ((y + 1) * s), s, s);

            }

        }
    }
}
var playing = false;
var framePlay = 0;
function play() {
    playing = true;
    $('#playPause').html('Pausar');
}
function pause() {
    playing = false;
    $('#playPause').html('Jogar');
}
function playPause() {
    if (playing) {
        pause();
    } else {
        play();
    }
}
function stop() {
    actualFrame = 0;
    playing = false;
    $('#playPause').html('Play');
}
function loadMe() {



//                fps =$('[name=title]').val();
//                fps = Number($('[name=fps]').val());
//                s = Number($('[name=block]').val());
//                rows = s * Number($('[name=width]').val()) / s; //linha
//                cols = s * Number($('[name=height]').val()) / s; //coluna
//                w = rows * s;
//                h = cols * s;
//                $('#colors').html('');
    $('#frames').html('');
//                frameRate(10);
//                frameRate(fps);

//                w=Number($('[name=width]').val())*s;
//                h=Number($('[name=height]').val())*s;
//                
//                cnv = createCanvas(w, h);
//                cnv = createCanvas(400, 200);

//                cnv.position(($(window).width() - w) / 2, ($(window).height() - h) / 2);
//                background(0);
//                setup();
    var json = $('#save').val();
    if (json !== '') {
        game = JSON.parse(json);
    }

    $('[name=title]').val(game['title']);
    $('[name=fps]').val(game['fps']);
    $('[name=block]').val(game['block']);
//    $('[name=height]').val(game['height']);
//alert(game['objects'][0]);
    $('[name=width]').val(Number(game['objects'][0]['width']));
    $('[name=height]').val(Number(game['objects'][0]['height']));
    $('[name=type]').val(game['objects'][0]['type']);
    
//    $('[name=type]').val(game['objects'][countObject]['type']);

    w = Number(game['objects'][0]['width']);
    h = Number(game['objects'][0]['height']);
    s = Number($('[name=block]').val());
    
    rows = s * w / s; //linha
    cols = s * h / s; //coluna
    countFrame = game['objects'][countObject]['frames'].length;
    
    setSize(w, h, s);

    $('#keys').html('');
    if (typeof game['objects'][countObject] !== "undefined") {
        if (typeof game['objects'][countObject]['frames'] !== "undefined") {
            var ff = game['objects'][countObject]['frames'];
            if (ff) {
                for (var i = 0; i < ff.length; i++) {
                    if (ff[i]['key'] !== '') {
                        $('#keys').append('<div>' + ff[i]['key'] + '</div>');
                    }
                }
            }
        }
    }
    $('#frames').html('');
    countPixel = 0;
    for (var i = 0; i < countFrame; i++) {

        var pxs = game['objects'][countObject]['frames'][i]['pixels'];
        for (var ii = 0; ii < pxs.length; ii++) {
            if (pxs[ii]) {
                countPixel++;
            }
        }
        $('#frames').append('<div id="frame-' + i + '" class="frame" onclick="loadFrame(' + i + ');"></div>');
    }
    $('[name=object]').html('');
    for (var i = 0; i < game['objects'].length; i++) {
        $('[name=object]').append('<option value="' + i + '">' + game['objects'][i]['object'] + '</option>');
    }

//    $('[name=object]').html('');
//    for (var i = 0; i < game['objects'].length; i++) {
//        $('[name=object]').append('<option>'+game['objects'][i]['object']+'</option>');
//    }
}
var lastDraw = 0;
function draw() {
    var i = actualFrame;
    if (playing) {
        if (framePlay >= countFrame) {
            framePlay = 0;
        }
        i = actualFrame = framePlay;
//                    console.log(framePlay);
        framePlay++;
    }
    if (typeof game['objects'][countObject] !== "undefined") {
        if (typeof game['objects'][countObject]['frames'] !== "undefined") {
            var ff = game['objects'][countObject]['frames'];
            if (typeof ff[i]['next_frame'] !== "undefined") {
                if (ff[i]['next_frame'] !== '') {
                    for (var j = 0; j < ff.length; j++) {
                        if (ff[i]['next_frame'] === ff[j]['label']) {
                            framePlay = j;
                        }
                    }
                }
            }


            if (lastDraw !== i) {
                lastDraw = i;
                loadFrame(i);
            }
            $('.frame').css({backgroundColor: '#ccc'});
            $('#frame-' + i).css({backgroundColor: '#999'});
            var pxs = game['objects'][countObject]['frames'][i]['pixels'];


//GAMBIARRA
//if (initialized) {

//                }

            var c1 = 244;
            var c2 = 200;
            var col = c1;
            if (playing) {
                c1 = c2 = 255;
            }

            //renderizar somente os pixels alterados

//                background(0);
            for (var x = 0; x < rows; x++) {
                col = (col === c1) ? c2 : c1;
                for (var y = 0; y < cols; y++) {
                    col = (col === c1) ? c2 : c1;
                    pixel(x, y, col, col, col, 255);
                }
            }

            for (var i = 0; i < pxs.length; i++) {
                if (pxs[i]) {
                    var x = Number(pxs[i].split(',')[0]);
                    var y = Number(pxs[i].split(',')[1]);
                    var c = getColor(pxs[i].split(',')[2]);
                    var r = Number(hexToRGB('#' + c)[0]);
                    var g = Number(hexToRGB('#' + c)[1]);
                    var b = Number(hexToRGB('#' + c)[2]);
                    pixel(x, y, r, g, b, 255);
                }
            }

            s = Number($('[name=block]').val());
            w = Number($('[name=width]').val()) * s;
            h = Number($('[name=height]').val()) * s;
            var w_ = ($(window).width() - w) / 2;
            var h_ = ($(window).height() - h) / 2;
            var x = Math.floor(((-w_ + posX) / s)) + gambiarra; //gambiarra
            var y = Math.floor(((w / s) - ((-h_ + posY) / s))) + gambiarraY;


            if (!playing) {

                var c = game['colors'][actualColor];

                var r = Number(hexToRGB('#' + c)[0]);
                var g = Number(hexToRGB('#' + c)[1]);
                var b = Number(hexToRGB('#' + c)[2]);

                pixel(x, y, r, g, b, 255);
                var size = 0;

                if (size === 1) {

                    pixel(x, y - 1, 0, 0, 0, 255);
                    pixel(x + 1, y, 0, 0, 0, 255);
                    pixel(x + 1, y - 1, 0, 0, 0, 255);

                } else if (size === 2) {

                    pixel(x - 1, y - 1, 0, 0, 0, 255);
                    pixel(x - 1, y, 0, 0, 0, 255);
                    pixel(x - 1, y + 1, 0, 0, 0, 255);
                    pixel(x, y - 1, 0, 0, 0, 255);
                    pixel(x, y, 0, 0, 0, 255);
                    pixel(x, y + 1, 0, 0, 0, 255);
                    pixel(x + 1, y - 1, 0, 0, 0, 255);
                    pixel(x + 1, y, 0, 0, 0, 255);
                    pixel(x + 1, y + 1, 0, 0, 0, 255);

                } else if (size === 3) {

                    pixel(x - 2, y - 2, 0, 0, 0, 255);
                    pixel(x - 2, y - 1, 0, 0, 0, 255);
                    pixel(x - 2, y, 0, 0, 0, 255);
                    pixel(x - 2, y + 1, 0, 0, 0, 255);
                    pixel(x - 2, y + 2, 0, 0, 0, 255);

                    pixel(x - 1, y - 2, 0, 0, 0, 255);
                    pixel(x - 1, y - 1, 0, 0, 0, 255);
                    pixel(x - 1, y, 0, 0, 0, 255);
                    pixel(x - 1, y + 1, 0, 0, 0, 255);
                    pixel(x - 1, y + 2, 0, 0, 0, 255);

                    pixel(x, y - 2, 0, 0, 0, 255);
                    pixel(x, y - 1, 0, 0, 0, 255);
                    pixel(x, y, 0, 0, 0, 255);
                    pixel(x, y + 1, 0, 0, 0, 255);
                    pixel(x, y + 2, 0, 0, 0, 255);

                    pixel(x + 1, y - 2, 0, 0, 0, 255);
                    pixel(x + 1, y - 1, 0, 0, 0, 255);
                    pixel(x + 1, y, 0, 0, 0, 255);
                    pixel(x + 1, y + 1, 0, 0, 0, 255);
                    pixel(x + 1, y + 2, 0, 0, 0, 255);

                    pixel(x + 2, y - 2, 0, 0, 0, 255);
                    pixel(x + 2, y - 1, 0, 0, 0, 255);
                    pixel(x + 2, y, 0, 0, 0, 255);
                    pixel(x + 2, y + 1, 0, 0, 0, 255);
                    pixel(x + 2, y + 2, 0, 0, 0, 255);

                }
            }

            drawPixels();
        }
    }

}
function stage() {
    fps = Number($('[name=fps]').val());
    s = Number($('[name=block]').val());
//    $('#colors').html('');
//    $('#frames').html('');
//    for (var i = 0; i < game['objects'][countObject]['frames'].length; i++) {
//        $('#frames').append('<div id="frame-' + i + '" class="frame" onclick="loadFrame(' + i + ');"></div>');
//    }
    frameRate(fps);
    w = Number($('[name=width]').val()) * s;
    h = Number($('[name=height]').val()) * s;
    cnv = createCanvas(w, h);
    cnv.position(($(window).width() - w) / 2, ($(window).height() - h) / 2);
}
function setup() {
    s = Number($('[name=block]').val());
    rows = s * Number($('[name=width]').val()) / s; //linha
    cols = s * Number($('[name=height]').val()) / s; //coluna
    for (var x = 0; x < rows; x++) {
        if (typeof pixels[x] === "undefined") {
            pixels[x] = new Array(9999);
            lastPixels[x] = new Array(9999);
        }
        for (var y = 0; y < cols; y++) {
            if (typeof pixels[x][y] === "undefined") {
                pixels[x][y] = new Array(9999);
                lastPixels[x][y] = new Array(9999);
            }
        }
    }
    stage();
    init();
    loadMe();
    play();
    initialized = true;
    updateColors();
}
function windowResized() {
    cnv.position(($(window).width() - w) / 2, ($(window).height() - h) / 2);
}

function selectTool(t) {
    $('#tool-draw').css({color: '#999', backgroundColor: '#eeeeee'});
    $('#tool-paint').css({color: '#999', backgroundColor: '#eeeeee'});
    $('#tool-fill').css({color: '#999', backgroundColor: '#eeeeee'});
    $('#tool-dropper').css({color: '#999', backgroundColor: '#eeeeee'});
    tool = t;
    $('#tool-' + t).css({color: '#fff', backgroundColor: '#2ecc71'});
}

$(document).ready(function () {
    selectTool('draw');
    $('.tools').hide();
    tools = false;
    $('#save').keyup(function () {
        loadMe();
        play();
    });

//    $('[name=object]').html('');
//    for (var i = 0; i < game['objects'].length; i++) {
//        $('[name=object]').append('<option>'+game['objects'][i]['object']+'</option>');
//    }

    $('[name=object]').change(function () {
        countObject = Number($(this).val());
        setSize(
            game['objects'][countObject]['width'],
            game['objects'][countObject]['height'],
            game['block'],
        );
        $('[name=type]').val(game['objects'][countObject]['type']);
        actualFrame = 0;
        countFrame = game['objects'][countObject]['frames'].length;
        $('#frames').html('');
        for (var i = 0; i < countFrame; i++) {
            $('#frames').append('<div id="frame-' + i + '" class="frame" onclick="loadFrame(' + i + ');"></div>');
        }
        updateColors();
    });
//    $('[name=width],[name=height],[name=block],[name=fps]').keyup(function () {
//        setup();
//    });
    $('[name=block]').keyup(function () {
        s = Number($('[name=block]').val());
        game['block'] = Number($('[name=block]').val());
         setSize(
            game['objects'][countObject]['width'],
            game['objects'][countObject]['height'],
            game['block'],
        );
    });
    $('[name=type]').change(function () {
        game['objects'][countObject]['type']=$('[name=type]').val();
    });
});


$(window).resize(function () {
    windowResized();
});
function windowResized() {
    w = $('#defaultCanvas0').width();
    h = $('#defaultCanvas0').height();
    cnv.position(($(window).width() - w) / 2, ($(window).height() - h) / 2);
}
window.setInterval(function () {
    windowResized();
}, 100);
var posX = 0;
var posY = 0;
$(document).mousemove(function (event) {
    posX = event.pageX;
    posY = event.pageY;
});
var countPixel = 0;
var actualColor = 0;
$(window).click(function (event) {
    if (!playing) {
        s = Number($('[name=block]').val());
        w = Number($('[name=width]').val()) * s;
        h = Number($('[name=height]').val()) * s;
        var w_ = ($(window).width() - w) / 2;
        var h_ = ($(window).height() - h) / 2;
        var x = Math.floor(((-w_ + posX) / s)) + gambiarra; //gambiarra
        var y = Math.floor(((w / s) - ((-h_ + posY) / s))) + gambiarraY;
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
            if (tool === 'draw') {
                var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
                var insertPixel = true;
                for (var i = 0; i < pxs.length; i++) {
                    if (pxs[i]) {
                        var xx = Number(pxs[i].split(',')[0]);
                        var yy = Number(pxs[i].split(',')[1]);
                        var color_ = pxs[i].split(',')[2];
                        if (xx === x && yy === y) {
                            insertPixel = false;
                            if (actualColor !== color_) {
                                game['objects'][countObject]['frames'][actualFrame]['pixels'][i] = null;
                            }
                        }
                    }
                }
                if (insertPixel) {
                    game['objects'][countObject]['frames'][actualFrame]['pixels'][countPixel] = x + "," + y + "," + actualColor;
                    countPixel++;
                    $('#save').val(str_replace(',null', '', JSON.stringify(game)));
                }
            } else if (tool === 'select') {
                if (clickStep === 0) {
                    //primeiro clique. seleciona o ponto de origem
                    clickStep++;
                } else if (clickStep === 1) {
                    //segundo clique. seleciona o ponto de destino
                    clickStep = 0;
                }
            } else if (tool === 'copy') {
                //copiar objeto, cor ou geral
            } else if (tool === 'move') {

            } else if (tool === 'fill') {
                paintInside(x, y);
            } else if (tool === 'paint') {
                //pintar elemento ou fundo
                var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
                for (var i = 0; i < pxs.length; i++) {
                    if (pxs[i]) {
                        var xx = Number(pxs[i].split(',')[0]);
                        var yy = Number(pxs[i].split(',')[1]);
                        var color_ = Number(pxs[i].split(',')[2]);
                        if (xx === x && yy === y) {
                            //tinge os pixels da mesma cor

                            //##############
                            changeColor(color_, actualColor);

                        }
                    }
                }
            } else if (tool === 'dropper') {
                var pxs = game['objects'][countObject]['frames'][actualFrame]['pixels'];
                for (var i = 0; i < pxs.length; i++) {
                    if (pxs[i]) {
                        var xx = Number(pxs[i].split(',')[0]);
                        var yy = Number(pxs[i].split(',')[1]);
                        var color_ = Number(pxs[i].split(',')[2]);
                        if (xx === x && yy === y) {
                            //tinge os pixels da mesma cor
                            actualColor = color_;
                            tool = 'draw';
                            $('#tool-draw').css({color: '#fff', backgroundColor: '#2ecc71'});
                            $('#tool-paint').css({backgroundColor: '#eeeeee', color: '#999'});
                            $('#tool-fill').css({backgroundColor: '#eeeeee', color: '#999'});
                            $('#tool-dropper').css({backgroundColor: '#eeeeee', color: '#999'});
                        }
                    }
                }
            }
        }
    }
}).keydown(function (e) {
    if (e.keyCode === 27) {
        tools = !tools;
        if (tools) {
            $('.tools').show();
            if (playing) {
                playPause();
            }
        } else {
            $('.tools').hide();
//                        if (!playing) {
//                             playPause();
//                        }
        }
    }
    if (!playing) {
        if (e.keyCode === 13) {
//            playPause();
        }
//                    if (e.keyCode === 80) {
//                        //letra p
//                        playPause();
//                        if (playing) {
//                            tools=false;
//                            $('.tools').hide();
//                        } else {
//                            tools=true;
//                            $('.tools').show();
//                        }
//                    }
        if (e.keyCode === 37) {
            //seta pra esquerda - frame anterior
            if (actualFrame > 0) {
                actualFrame--;
                loadFrame(actualFrame);
            } else {
                loadFrame(countFrame - 1);
            }
        }
        if (e.keyCode === 39) {
            //seta pra direita - próximo frame
            if (actualFrame === countFrame - 1) {
                actualFrame = 0;
                loadFrame(0);
            } else {
                actualFrame++;
                loadFrame(actualFrame);
            }
        }
    }

    if (playing) {
        if (typeof game['objects'][countObject] !== "undefined") {
            if (typeof game['objects'][countObject]['frames'] !== "undefined") {
                var ff = game['objects'][countObject]['frames'];
                for (var i = 0; i < ff.length; i++) {
                    if (
                            ff[i]['key'] && e.keyCode === Number(ff[i]['key']) ||
                            e.keyCode === 65 && ff[i]['key'] && (ff[i]['key'] === 'a') ||
                            e.keyCode === 66 && ff[i]['key'] && (ff[i]['key'] === 'b') ||
                            e.keyCode === 67 && ff[i]['key'] && (ff[i]['key'] === 'c') ||
                            e.keyCode === 68 && ff[i]['key'] && (ff[i]['key'] === 'd') ||
                            e.keyCode === 69 && ff[i]['key'] && (ff[i]['key'] === 'e') ||
                            e.keyCode === 70 && ff[i]['key'] && (ff[i]['key'] === 'f') ||
                            e.keyCode === 71 && ff[i]['key'] && (ff[i]['key'] === 'g') ||
                            e.keyCode === 72 && ff[i]['key'] && (ff[i]['key'] === 'h') ||
                            e.keyCode === 73 && ff[i]['key'] && (ff[i]['key'] === 'i') ||
                            e.keyCode === 74 && ff[i]['key'] && (ff[i]['key'] === 'j') ||
                            e.keyCode === 75 && ff[i]['key'] && (ff[i]['key'] === 'k') ||
                            e.keyCode === 76 && ff[i]['key'] && (ff[i]['key'] === 'l') ||
                            e.keyCode === 77 && ff[i]['key'] && (ff[i]['key'] === 'm') ||
                            e.keyCode === 78 && ff[i]['key'] && (ff[i]['key'] === 'n') ||
                            e.keyCode === 79 && ff[i]['key'] && (ff[i]['key'] === 'o') ||
                            e.keyCode === 80 && ff[i]['key'] && (ff[i]['key'] === 'p') ||
                            e.keyCode === 81 && ff[i]['key'] && (ff[i]['key'] === 'q') ||
                            e.keyCode === 82 && ff[i]['key'] && (ff[i]['key'] === 'r') ||
                            e.keyCode === 83 && ff[i]['key'] && (ff[i]['key'] === 's') ||
                            e.keyCode === 84 && ff[i]['key'] && (ff[i]['key'] === 't') ||
                            e.keyCode === 85 && ff[i]['key'] && (ff[i]['key'] === 'u') ||
                            e.keyCode === 86 && ff[i]['key'] && (ff[i]['key'] === 'v') ||
                            e.keyCode === 87 && ff[i]['key'] && (ff[i]['key'] === 'w') ||
                            e.keyCode === 88 && ff[i]['key'] && (ff[i]['key'] === 'x') ||
                            e.keyCode === 89 && ff[i]['key'] && (ff[i]['key'] === 'y') ||
                            e.keyCode === 90 && ff[i]['key'] && (ff[i]['key'] === 'z')
                            ) {
                        framePlay = i;
                        loadFrame(i);
                    }
                }
            }
        }
    }
});

//////////////////////////////////////////////////
// STAGE
//////////////////////////////////////////////////

function addObject() {
    //aqui vai adicionar o objeto ao stage



}