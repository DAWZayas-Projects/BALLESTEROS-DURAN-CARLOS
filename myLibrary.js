///////////////HELPER METHODS///////////////////////////////////////////////////////////////////////////

const divArray = ['div_left', 'div_up', 'div_down', 'div_right', 'points', 'score', 'extra'];

const addArrowImageToDiv = imageName => document.getElementById('div_' + imageName).innerHTML = "<img class='arrowImage' src='../media/" + imageName + ".png' /><br/>";

const addItemToTopOfDiv = (item, divName) => {
  let div = document.getElementById(divName);
  div.innerHTML = item + '<br/>' + div.innerHTML;
};

const addItemToDiv = (item, divName) => document.getElementById(divName).innerHTML += item + '<br/>';

const putItemInDiv = (item, divName) => document.getElementById(divName).innerHTML = item;

const addRecordToDiv = (name, record) => addItemToDiv("<span class='name'>" + name + '</span>' + "<span class='middle'>" + ' : ' + "</span>" + "<span class='record'>" + record + '</span>', 'ranking')

const addDivToPage = divName => {
  const div = document.createElement('div');
  div.id = divName;
  document.getElementById('body').appendChild(div);
};

const addAllDivs = arrayOfDivs => arrayOfDivs.forEach(divName => addDivToPage(divName));

const removeDiv = divName => {
  const div = document.getElementById(divName);
  div.parentElement.removeChild(div);
};

const removeAllDivs = arrayOfDivs => arrayOfDivs.forEach(divName => {
	if(document.getElementById(divName) !== null) { removeDiv(divName) }
});

const prepareMain = () => {
	removeAllDivs(divArray);
  addDivToPage('ranking');
  addItemToDiv("<strong class='big'>TOP 5</strong>", 'ranking');
  addDivToPage('playButton');
  putItemInDiv("<input type='button' id='startClick' value='Start Playing'></input>", 'playButton');
}

const preparePlay = () => {
	removeDiv('ranking');
  removeDiv('playButton');
  addAllDivs(divArray);
  putItemInDiv("<strong>You can do it!!!  :)</strong>", 'extra');
}

const prepareResults = () => {
	putItemInDiv("<label for='nameInput'>Tell me your name: </label><input id='nameInput' placeholder='Your name here' /> <input type='button' id='nameClick' value='Enter name'></input><br/>", 'extra');
}
