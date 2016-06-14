///////////////////////OBSERVER////////////////////////////////////////////////////////////////////////

const arrowObserver = {
  onNext: item => addArrowImageToDiv(arrowStringArray[item - 37]),
  onError: error => console.log('Error: ' + error),
  onCompleted: () => putItemInDiv('<strong>Finished! Try to keep up....</strong>', 'extra')
}

///////////////DDRx v4.0//////////////////////////////////////////////////////////////////

const records = {
  ALEJANDRO: 250,
  ALBERTO: -100000,
  JAVIER: 27500,
};

const arrowIntArray = [37, 38, 39, 40];

const arrowStringArray = ['left', 'up', 'right', 'down'];

DDRx();

function DDRx() {
  if(JSON.parse(localStorage.getItem('records')) === null) {
    localStorage.setItem('records', JSON.stringify(records));
  }
  main();
}

function main() {
  prepareMain();

  const mainRecords = JSON.parse(localStorage.getItem('records'));

  Object.keys(mainRecords)
    .sort((a, b) => mainRecords[b] - mainRecords[a])
    .slice(0, 5)
    .forEach(item => addRecordToDiv(item, mainRecords[item]));

  const startButton = document.getElementById('startClick');

  const startObservable = Rx.Observable
    .fromEvent(startButton, 'click')
    .first();

  const inputSubscription = startObservable
    .subscribe(name => play());
}

function play() {
  preparePlay();

  const arrowDisplayObservable = Rx.Observable
    .generateWithRelativeTime(
      1,                      //start
      x => x > 0.5,           //while
      x => x / 1.02,          //change
      x => arrowFunction(),   //result
      x => 1000 * x           //interval
    )
    .share();

  const arrowInputObservable = Rx.Observable
    .fromEvent(document.body, 'keyup', event => event.keyCode)
    .filter(x => arrowIntArray.indexOf(x) !== -1);

  const arrowZipObservable = Rx.Observable
    .zip(
      arrowDisplayObservable,
      arrowInputObservable,
      (s1, s2) => s1 === s2 ? 1000 : -250
    )
    .do(points => addItemToTopOfDiv(points + ' points', 'points'))
    .scan((accumulator, item) => accumulator + item, 0)
    .do(score => putItemInDiv('TOTAL SCORE: ' + score, 'score'))
    .last();

  const arrowDisplaySubscription = arrowDisplayObservable
    .subscribe(arrowObserver);

  const arrowZipSubscription = arrowZipObservable
    .subscribe(score => result(score));
}

function result(score) {
  prepareResults();

  const button = document.getElementById('nameClick');

  const inputObservable = Rx.Observable
    .fromEvent(button, 'click')
    .map(event => document.getElementById('nameInput').value.toUpperCase())
    .filter(name => name != '')
    .do(name => saveScore(name, score))
    .first();

  const inputSubscription = inputObservable
    .subscribe(() => main());
}

function saveScore(name, score) {
  let newRecords = JSON.parse(localStorage.getItem('records'));
  if(newRecords[name] === undefined || score > newRecords[name]) { newRecords[name] = score; }
  localStorage.setItem('records', JSON.stringify(newRecords));
}

function arrowFunction() {
 const value = parseInt(Math.random() * 4);
 console.log(arrowStringArray[value]);
 return arrowIntArray[value];
}
