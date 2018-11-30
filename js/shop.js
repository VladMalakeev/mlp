//блок отображает единицу товара в большом окне
function viewInfo(link) {
   var image = document.getElementById('current_image');
   image.innerHTML ='';
   image.style.background="url("+link.src+")";
   image.style.backgroundSize='cover';
   h3 = document.createElement('h3');
   var count = link.getAttribute('data-count');
   if(link.getAttribute('data-count')==null)
       count = 0;
   h3.innerHTML = 'Количество '+ count;
   image.appendChild(h3)
}



// товары которых нет в наличии
var wishCounter = 0;
var wishMax;
var wishArray = [];
function getWish(type) {
    $.ajax({
        type: "POST",
        url: "php/shopData.php",
        data: {
            getWish:true,
            type:type
        },
        success: function (response) {
            var json = JSON.parse(response);
            var maxLenght = 8;
            wishMax = Math.ceil(json.length/maxLenght);
            var tempArray =[];
            var k = 0;
            for(var i=0;i<json.length;i++) {
                if (i!=0 && i % maxLenght == 0) {
                    wishArray.push(tempArray);
                    tempArray = [];
                    k = i;
                }
                tempArray[i - k] = json[i];
            }
            wishArray.push(tempArray);
            renderWish(wishArray[0]);
            wishButtons();
        }
    })
}

// отображение одной единици товара
function renderWish(data) {
  var wishBlock = document.getElementById('wish');
  wishBlock.innerHTML = '';
    for(var i=0; i<data.length; i++){
        var image = document.createElement('img');
        image.width = '128';
        image.height = '72';
        image.dataset.id = data[i].id;
        image.src = 'supplies/'+data[i].image;
        image.addEventListener("click", function () {
			viewInfo(this);
            btnOrder.style.background = 'url(images/order_bg.png)';
            
            btnOrder.disabled = false;
			orderStatus = 'wish';
			activeElement = this;
			});
        wishBlock.appendChild(image);
    }
}


// обработчик кнопки next
function nextButtonWish() {
    wishCounter++;
    console.log(wishCounter);
    renderWish(wishArray[wishCounter]);
    wishButtons();

}
// обработчик кнопки prev
function prevButtonWish() {
    wishCounter--;
    console.log(wishCounter);
    renderWish(wishArray[wishCounter]);
    wishButtons();
}
//состояния кнопок
function wishButtons() {
    if( wishCounter == 0){
        document.getElementById('wishPrev').disabled = true;
		document.getElementById('wishPrev').style.backgroundImage = "url('images/up_off.png')";
    }
    else {
        document.getElementById('wishPrev').disabled = false;
		document.getElementById('wishPrev').style.backgroundImage = "url('images/up.png')";
    }
    if (wishCounter == wishMax-1){
        document.getElementById('wishNext').disabled = true;
		document.getElementById('wishNext').style.backgroundImage = "url('images/down_off.png')";
    }
    else {
        document.getElementById('wishNext').disabled = false;
		document.getElementById('wishNext').style.backgroundImage = "url('images/down.png')";
    }
}

// товары в наличии
var inStockCounter = 0;
var inStockMax;
var inStockArray = [];
function getInStock(type) {
    $.ajax({
        type: "POST",
        url: "php/shopData.php",
        data: {
            getInStock:true,
            type:type
        },
        success: function (response) {
            var json = JSON.parse(response);
            var maxLenght = 10;
            inStockMax = Math.ceil(json.length/maxLenght);
            var tempArray =[];
            var k = 0;
            for(var i=0;i<json.length;i++) {
                if (i!=0 && i % maxLenght == 0) {
                    inStockArray.push(tempArray);
                    tempArray = [];
                    k = i;
                }
                tempArray[i - k] = json[i];
            }
            inStockArray.push(tempArray);
            renderInStock(inStockArray[0]);
            inStockButtons();
        }
    })
}

//отобрадение единици товара
function renderInStock(data) {
    var inStockBlock = document.getElementById('inStock');
    inStockBlock.innerHTML = '';
    for(var i=0; i<data.length; i++){
        var image = document.createElement('img');
        image.width = '128';
        image.height = '72';
        image.src = 'supplies/'+data[i].image;
        image.dataset.id = data[i].id;
        image.dataset.count = data[i].count_item;
        image.addEventListener("click", function () {
			viewInfo(this)
            btnOrder.style.background = 'url(images/cart_add.png)';
            btnOrder.innerHTML = '';
            btnOrder.disabled = false;
			orderStatus = 'instock';
			activeElement = this;
			});
        inStockBlock.appendChild(image);
    }
}

// обработчик кнопки next
function nextButtonInStock() {
    inStockCounter++;
    renderInStock(inStockArray[inStockCounter]);
    inStockButtons();

}

// обработчик кнопки prev
function prevButtonInStock() {
    inStockCounter--;
    renderInStock(inStockArray[inStockCounter]);
    inStockButtons();
}

// осостояния кнопок
function inStockButtons() {
    if( inStockCounter == 0){
        document.getElementById('inStockPrev').disabled = true;
		document.getElementById('inStockPrev').style.backgroundImage = "url('images/left_off.png')";
    }
    else {
        document.getElementById('inStockPrev').disabled = false;
		document.getElementById('inStockPrev').style.backgroundImage = "url('images/left.png')";
    }
    if (inStockCounter == inStockMax-1){
        document.getElementById('inStockNext').disabled = true;
		document.getElementById('inStockNext').style.backgroundImage = "url('images/right_off.png')";
    }
    else {
        document.getElementById('inStockNext').disabled = false;
		document.getElementById('inStockNext').style.backgroundImage = "url('images/right.png')";
    }
}




