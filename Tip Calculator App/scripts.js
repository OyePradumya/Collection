let totBill = 0;
function getValueBill() {
    var k = document.querySelector('#inputbilljs').value;
    totBill = Number(k);
    // console.log(totBill + " " + typeof totBill);
}

let ppl = 0;
function getValuePeople() {
    var k = document.querySelector('.inputpeoplejs').value;
    ppl = Number(k);
    // console.log(ppl + " " + typeof ppl);
}

let tipPercent = 0;
function tip(k) {
    tipPercent = Number(k);
    // console.log(tipPercent + " " + typeof tipPercent);
}

var hideButton = document.querySelector('.customPercent');
var showInputField = document.querySelector('#percentInput');
let tipAmtPerPerson = 0;
function resetFields() {
    var tipAmtPerPerson = totBill*tipPercent/ppl/100;
    // console.log(tipAmtPerPerson);
    var totalPerPerson = tipAmtPerPerson + totBill/ppl;
    // console.log(totalPerPerson);

    document.querySelector('.tipAmt').value = tipAmtPerPerson;
    document.querySelector('.totalAmt').value = totalPerPerson;

    document.querySelector('#inputbilljs').value = '';
    document.querySelector('.inputpeoplejs').value = '';
    document.querySelector('#percentInput').value = '';

    hideButton.style.display = 'block';
    showInputField.style.display = 'none';

    s1 = "";
    s2 = "";
    s3 = "";
    tipPercent = "";
    flag = 0;
}

function changeToInputField() {
    hideButton.style.display = 'none';
    showInputField.style.display = '';
}

function getValuePercent() {
    var k = document.querySelector("#percentInput").value;
    tipPercent = Number(k);
}