'use strict';

//1min
function printReceipt(inputs) {
    var allItem=getAllItems(inputs);
    var boughtItems=getBoughtItems(allItem);
    console.log(getItemInfoAfterSale(boughtItems));
}

//1h
function getAllItems(inputs){
    var barcode;
    var count;
    var itemNames = inputs.reduce(function(allItemNames,name) {
        const splitIndex = name.indexOf('-');
        if(splitIndex < 0){
            barcode = name;
            count = 1;
        }else{
            barcode = name.substring(0,splitIndex);
            count = Number(name.substring(splitIndex+1));
        }
        if(!allItemNames[barcode]){
            allItemNames[barcode] = count;
        }else{
        allItemNames[barcode]+=count;
        }
        return allItemNames;
    },{});

    return itemNames;
}

//1h
function getBoughtItems(allItem){
    var orderArr=[];
    var allOrderItems = loadAllItems(); 
    var allPromotion = loadPromotions()[0].barcodes;
    allOrderItems.map(item=>{
        if(item.barcode in allItem){
            var obj = {};
            var count = allItem[item.barcode];
            if(allPromotion.includes(item.barcode)){
                obj.item = item;
                obj.number=count;
                if(count >= 2){
                    [obj.moneyAfterSale,obj.moneyBeforeSale] = [(item.price*count-(item.price)).toFixed(2),(item.price*count).toFixed(2)];
                }else{
                    [obj.moneyAfterSale,obj.moneyBeforeSale] = [(item.price*count).toFixed(2),(item.price*count).toFixed(2)];
                }
                orderArr.push(obj)
            }else{
                obj.item = item;
                obj.number=count;
                [obj.moneyAfterSale,obj.moneyBeforeSale] = [(item.price*count).toFixed(2),(item.price*count).toFixed(2)];
                orderArr.push(obj)
            }
        }
    });
    return orderArr;
}

//40min
function getItemInfoAfterSale(orderArr){
    var itemPrice = ``; 
    var moneyAfterSale=0;
    var moneyBeforeSale = 0;
    orderArr.forEach(element => {
        moneyAfterSale+=Number.parseFloat(element.moneyAfterSale);
        moneyBeforeSale+=Number.parseFloat(element.moneyBeforeSale);
        itemPrice+=`\n名称：${element.item.name}，数量：${element.number}${element.item.unit}，单价：${element.item.price.toFixed(2)}(元)，小计：${element.moneyAfterSale}(元)`;
    });
    return `***<没钱赚商店>收据***${itemPrice}
----------------------
总计：${moneyAfterSale.toFixed(2)}(元)
节省：${(moneyBeforeSale-moneyAfterSale).toFixed(2)}(元)
**********************`;
}
