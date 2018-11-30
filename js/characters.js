
//Персонажи

var charCounter = 0;
var charMax;
var charArray = [];

function getChar() {
    $.ajax({
        type: "POST",
        url: "php/charactersData.php",
        data: {
            getChar:true
        },
        success: function (response) {
            var json = JSON.parse(response);
            var maxLenght = 10;
            charMax = Math.ceil(json.length/maxLenght);
            var tempArray =[];
            var k = 0;
            for(var i=0;i<json.length;i++) {
                if (i!=0 && i % maxLenght == 0) {
                    charArray.push(tempArray);
                    tempArray = [];
                    k = i;
                }
                tempArray[i - k] = json[i];
            }
            charArray.push(tempArray);
            renderChar(charArray[0]);
            charButtons();
        }
    })
}


function renderChar(data) {
    var charBlock = document.getElementById('data_content');
    charBlock.innerHTML = '';
    for(var i=0; i<data.length; i++){
        var div = document.createElement('div');
        var h1 = document.createElement('h1');
        var a = document.createElement('a');
        var image = document.createElement('img');
        div.className = 'data_char';
        image.width = '128';
        image.height = '72';
        image.src = 'database_char/'+data[i].image;
        h1.innerHTML = data[i].name;
        a.innerHTML = 'Подробнее';
        a.href = "datashow.php?character="+data[i].id;
        div.appendChild(image);
        div.appendChild(h1);
        div.appendChild(a);
        charBlock.appendChild(div);
    }
}


function nextButtonChar() {
    charCounter++;
    console.log(charCounter);
    renderChar(charArray[charCounter]);
    charButtons();

}

function prevButtonChar() {
    charCounter--;
    console.log(charCounter);
    renderChar(charArray[charCounter]);
    charButtons();
}

function charButtons() {
    if( charCounter == 0){
        document.getElementById('charPrev').disabled = true;
        document.getElementById('charPrev').style.backgroundImage = "url('images/left_off.png')";
    }
    else {
        document.getElementById('charPrev').disabled = false;
        document.getElementById('charPrev').style.backgroundImage = "url('images/left.png')";
    }
    if (charCounter == charMax-1){
        document.getElementById('charNext').disabled = true;
        document.getElementById('charNext').style.backgroundImage = "url('images/right_off.png')";
    }
    else {
        document.getElementById('charNext').disabled = false;
        document.getElementById('charNext').style.backgroundImage = "url('images/right.png')";
    }
}
