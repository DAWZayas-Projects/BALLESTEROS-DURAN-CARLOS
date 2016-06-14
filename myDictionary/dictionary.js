const createDiv = divName => {
  removeOldDiv(divName);
  addNewDiv(divName);
}

const removeOldDiv = divName => {
  const oldDiv = document.getElementById(divName);
  if(oldDiv !== null) { oldDiv.parentElement.removeChild(oldDiv); }
}

const addNewDiv = divName => {
  const div = document.createElement('div');
  div.id = divName;
  document.getElementById('body').appendChild(div);
}

const addItemToDiv = (item, divName) => document.getElementById(divName).innerHTML += item + '<br/>';

const showResults = results => {
  const search = results.value[0];
  const interval = results.interval;
  const titles = results.value[1];
  const descriptions = results.value[2];
  const links = results.value[3];

  createDiv('results');
  addItemToDiv(search.toUpperCase() + ' (' + interval + ' ms):<br />', 'results');
  titles.forEach((item, index) => addItemToDiv("<a href='" + links[index] + "'>" + item + '</a>: ' + descriptions[index] + '<br />', 'results'));
}

const searchWikipedia = term => $.ajax({
  url: 'http://en.wikipedia.org/w/api.php',
  dataType: 'jsonp',
  data: {
    action: 'opensearch',
    format: 'json',
    search: term
  }
});

const wikiObservable = Rx.Observable
  .fromEvent(textInput, 'keyup')
  .map(e => e.target.value)
  .filter(text => text.length > 2)
  .debounce(250)
  .distinctUntilChanged()
  .map(text => searchWikipedia(text))
  .retry(3)
  .switchLatest() // Ensure no out of order results
  .timeInterval();

const emptyObservable = Rx.Observable
  .fromEvent(textInput, 'keyup')
  .map(e => e.target.value)
  .filter(text => text.length <= 2);

const autocomplete = () => {
  const wikiSubscription = wikiObservable
    .subscribe(results => showResults(results));

  const emptySubscriber = emptyObservable
    .subscribe(() => removeOldDiv('results'));
}

autocomplete();
