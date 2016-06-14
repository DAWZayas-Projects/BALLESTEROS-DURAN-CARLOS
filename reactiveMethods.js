///////////////HELPER METHODS///////////////////////////////////////////////////////////////////////////

const addItemToPage = item => document.write(item + '<br/>');

///////////////A BASIC OBSERVER////////////////////////////////////////////////////////////////////////

const observer = {
	onNext: item => addItemToPage('Next: ' + item),
	onError: error => addItemToPage('Error: ' + error),
	onCompleted: () => addItemToPage('Completed')
}

const observer2 = {
  onNext: item => console.log('Next: ' + item),
  onError: error => console.log('Error: ' + error),
  onCompleted: () => console.log('Completed')
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////CREATE//////////////////////////////////////////////////////////////////////////////////
function createMethod() {
  const createObservable = Rx.Observable.create(observer => {
    observer.onNext(41);
    observer.onNext(42);
    observer.onCompleted();

    return () => console.log('observable disposed'); //optional
  });
  const createSubscription = createObservable.subscribe(observer);
  createSubscription.dispose();
}

///////////////EMPTY///////////////////////////////////////////////////////////////////////////////////
function emptyMethod() {
  const emptyObservable = Rx.Observable.empty(/*Rx.Scheduler.immediate*/);
  const emptySubscription = emptyObservable.subscribe(observer);
}

///////////////FOR/////////////////////////////////////////////////////////////////////////////////////
function forMethod() {
  const forArray = [1, 2, 3, 4, 5];
  const forObservable = Rx.Observable.for(forArray, arrayItem => Rx.Observable.return(arrayItem));
  const forSubscription = forObservable.subscribe(observer);
}

///////////////FROMEVENT///////////////////////////////////////////////////////////////////////////////
function fromEventMethod() {
  const fromEventObservable = Rx.Observable.fromEvent(document.body, 'keyup', event => event.keyCode);
  const fromEventSubscription = fromEventObservable.subscribe(observer);
}

///////////////FROMPROMISE/////////////////////////////////////////////////////////////////////////////
function fromPromiseMethod() {
  const promise = Promise.resolve(42);
  const fromPromiseObservable = Rx.Observable.fromPromise(promise);
  const fromPromiseSubscription = fromPromiseObservable.subscribe(observer);
}

///////////////INTERVAL////////////////////////////////////////////////////////////////////////////////
function intervalMethod() {
  const intervalObservable = Rx.Observable.interval(500);
  const intervalSubscription = intervalObservable.subscribe(observer);
}

///////////////RETURN//////////////////////////////////////////////////////////////////////////////////
function returnMethod() {
  const returnObservable = Rx.Observable.return(50);
  const returnSubscription = returnObservable.subscribe(observer);
}

///////////////NEVER///////////////////////////////////////////////////////////////////////////////////
function neverMethod() {
  const neverObservable = Rx.Observable.never();
  const neverSubscription = neverObservable.subscribe(observer);
}

///////////////OF//////////////////////////////////////////////////////////////////////////////////////
function ofMethod() {
  const ofObservable = Rx.Observable.of(1, 'text', {key: 0});
  const ofSubscription = ofObservable.subscribe(observer);
}

///////////////RANGE///////////////////////////////////////////////////////////////////////////////////
function rangeMethod() {
  const rangeObserable = Rx.Observable.range(11, 5);
  const rangeSubscription = rangeObserable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////FOREACH/////////////////////////////////////////////////////////////////////////////////
function forEachMethod() {
  const forEachObservable = Rx.Observable.return(42);
  const forEachSubscription = forEachObservable.forEach(observer);
}

///////////////STARTWITH///////////////////////////////////////////////////////////////////////////////
function startWithMethod() {
  const startWithObservable = Rx.Observable.return(4).startWith(1, 2, 3);
  const startWithSubscription = startWithObservable.subscribe(observer);
}

///////////////DO//////////////////////////////////////////////////////////////////////////////////////
function doMethod() {
  const doObservable = Rx.Observable.range(0, 10).do(next => console.log('Do Next:', next));
  const doSubscription = doObservable.subscribe(observer);
}

///////////////FINALLY/////////////////////////////////////////////////////////////////////////////////
//finallyAction for browsers < IE9
function finallyMethod() {
  const finallyObservable = Rx.Observable.return(0).finally(() => console.log('Done'));
  const finallySubscription = finallyObservable.subscribe(observer);
}

///////////////DEBOUNCE////////////////////////////////////////////////////////////////////////////////
function debounceMethod() {
  const debounceObservable = Rx.Observable.fromEvent(document, 'click').debounce(400);
  const debounceSubscription = debounceObservable.subscribe(observer);
}

///////////////TIMEINTERVAL////////////////////////////////////////////////////////////////////////////
function timeIntervalMethod() {
  const timeIntervalObservable =
    Rx.Observable.interval(100).timeInterval().map(x => x.value + ':' + x.interval).take(20);
  const timeIntervalSubscription = timeIntervalObservable.subscribe(observer);
}

///////////////TIMESTAMP///////////////////////////////////////////////////////////////////////////////
function timestampMethod() {
  const timestampObservable =
    Rx.Observable.interval(100).timestamp().map(x => x.value + ':' + x.timestamp).take(20);
  const timestampSubscription = timestampObservable.subscribe(observer);
}

///////////////RETRY///////////////////////////////////////////////////////////////////////////////////
function retryMethod() {
  let retryCounter = 0;
  const retryObservable = Rx.Observable.interval(200).flatMap(x => {
    if(retryCounter++ < 8)
      return Rx.Observable.throw(new Error('error'));
    return Rx.Observable.return(x);
  }).retry(10).take(20);
  const retrySubscription = retryObservable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////EVERY///////////////////////////////////////////////////////////////////////////////////
function everyMethod() {
  const everyObservable = Rx.Observable.from([1,2,3,4]).every(x => x % 2 === 0);
  const everySubscription = everyObservable.subscribe(observer);
}

///////////////SOME////////////////////////////////////////////////////////////////////////////////////
function someMethod() {
  const someObservable = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8).some(x => x > 8);
  const someSubscription = someObservable.subscribe(observer);
}

///////////////INCLUDES////////////////////////////////////////////////////////////////////////////////
function includesMethod() {
  const includesObservable = Rx.Observable.of(2, 4, 6, 8).includes(4, 2);
  const includesSubscription = includesObservable.subscribe(observer);
}

///////////////ISEMPTY/////////////////////////////////////////////////////////////////////////////////
function isEmptyMethod() {
  const isEmptyObservable = Rx.Observable.empty().isEmpty();
  const isEmptySubscription = isEmptyObservable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////AVERAGE/////////////////////////////////////////////////////////////////////////////////
function averageMethod() {
  const averageObservable = Rx.Observable.of(1, 3, 4, 6, 6).average();
  const averageSubscription = averageObservable.subscribe(observer);
}

///////////////SUM/////////////////////////////////////////////////////////////////////////////////////
function sumMethod() {
  const sumObservable = Rx.Observable.range(0, 10).sum();
  const sumSubscription = sumObservable.subscribe(observer);
}

///////////////COUNT///////////////////////////////////////////////////////////////////////////////////
function countMethod() {
  const countObservable = Rx.Observable.range(0, 10).count(x => x >= 2);
  const countSubscription = countObservable.subscribe(observer);
}

///////////////REDUCE//////////////////////////////////////////////////////////////////////////////////
function reduceMethod() {
  const reduceObservable = Rx.Observable.range(1, 3).reduce(
    (accumulator, item, index, source) => accumulator * item,
    2
  );
  const reduceSubscription = reduceObservable.subscribe(observer);
}

///////////////SCAN////////////////////////////////////////////////////////////////////////////////////
function scanMethod() {
  const scanObservable = Rx.Observable.range(1, 3).scan(
    (accumulator, item, index, source) => accumulator * item,
    2
  );
  const scanSubscription = scanObservable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////FILTER//////////////////////////////////////////////////////////////////////////////////
function filterMethod() {
  const filterObservable = Rx.Observable.range(0, 10).filter(x => x % 2 === 0);
  const filterSubscription = filterObservable.subscribe(observer);
}

///////////////SLICE///////////////////////////////////////////////////////////////////////////////////
function sliceMethod() {
  const sliceObservable = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8).slice(2, 6);
  const sliceSubscription = sliceObservable.subscribe(observer);
}

///////////////TAKE////////////////////////////////////////////////////////////////////////////////////
function takeMethod() {
  const takeObservable = Rx.Observable.interval(100).take(10);
  const takeSubscription = takeObservable.subscribe(observer);
}

///////////////TAKELAST////////////////////////////////////////////////////////////////////////////////
function takeLastMethod() {
  const takeLastObservable = Rx.Observable.range(0, 10).takeLast(4);
  const takeLastSubscription = takeLastObservable.subscribe(observer);
}

///////////////FIRST///////////////////////////////////////////////////////////////////////////////////
function firstMethod() {
  const firstObservable = Rx.Observable.range(5, 5).first();
  const firstSubscription = firstObservable.subscribe(observer);
}

///////////////LAST////////////////////////////////////////////////////////////////////////////////////
function lastMethod() {
  const lastObservable = Rx.Observable.range(5, 5).last();
  const lastSubscription = lastObservable.subscribe(observer);
}

///////////////SKIP////////////////////////////////////////////////////////////////////////////////////
function skipMethod() {
  const skipObservable = Rx.Observable.range(0, 10).skip(3);
  const skipSubscription = skipObservable.subscribe(observer);
}

///////////////SKIPLAST////////////////////////////////////////////////////////////////////////////////
function skipLastMethod() {
  const skipLastObservable = Rx.Observable.range(0, 10).skipLast(3);
  const skipLastSubscription = skipLastObservable.subscribe(observer);
}

///////////////DISTINCT////////////////////////////////////////////////////////////////////////////////
function distinctMethod() {
  const distinctObservable = Rx.Observable.of(1, 2, 2, 3, 1, 2).distinct();
  const distinctSubscription = distinctObservable.subscribe(observer);
}

///////////////DISTINCTUNTILCHANGED////////////////////////////////////////////////////////////////////
function distinctUntilChangedMethod() {
  const distinctUntilChangedObservable = Rx.Observable.of(1, 2, 2, 1, 1, 2).distinctUntilChanged();
  const distinctUntilChangedSubscription = distinctUntilChangedObservable.subscribe(observer);
}

///////////////TAKEWHILE///////////////////////////////////////////////////////////////////////////////
function takeWhileMethod() {
  const takeWhileObservable = Rx.Observable.interval(100).takeWhile(x => x < 5);
  const takeWhileSubscription = takeWhileObservable.subscribe(observer);
}

///////////////TAKEUNTIL///////////////////////////////////////////////////////////////////////////////
function takeUntilMethod() {
  const intervalObservable = Rx.Observable.interval(1000);
  const takeUntilObservable = Rx.Observable.interval(100).takeUntil(intervalObservable);
  const takeUntilSubscription = takeUntilObservable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////MAP/////////////////////////////////////////////////////////////////////////////////////
function mapMethod() {
  const mapObservable = Rx.Observable.range(0, 10).map(x => x + '0').map(x => 'New Entry: ' + x);
  const mapSubscription = mapObservable.subscribe(observer);
}

///////////////TOARRAY/////////////////////////////////////////////////////////////////////////////////
function toArrayMethod() {
  const toArrayObservable = Rx.Observable.interval(250).take(5).toArray();
  const toArraySubscription = toArrayObservable.subscribe(observer);
}

///////////////DEFAULTIFEMPTY//////////////////////////////////////////////////////////////////////////
function defaultIfEmptyMethod() {
  const defaultIfEmptyObservable = Rx.Observable.empty().defaultIfEmpty('default');
  const defaultIfEmptySubscription = defaultIfEmptyObservable.subscribe(observer);
}

///////////////GROUPBY/////////////////////////////////////////////////////////////////////////////////
function groupByMethod() {
  const groupByObservable = Rx.Observable.range(0, 10).groupBy(x => x % 3).count();
  const groupBySubscription = groupByObservable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////CONCAT//////////////////////////////////////////////////////////////////////////////////
function concatMethod() {
  const concat1Observable = Rx.Observable.return('first');
  const concat2Observable = concat1Observable.concat(Rx.Observable.return('second'));
  const concat3Observable = concat2Observable.concat(Rx.Observable.return('third'));
  const concat3Subscription = concat3Observable.subscribe(observer);
}

///////////////MERGE///////////////////////////////////////////////////////////////////////////////////
function mergeMethod() {
  const merge1Observable = Rx.Observable.interval(100).take(8);
  const merge2Observable = Rx.Observable.interval(250).take(4);
  const mergeObservable = merge1Observable.merge(merge2Observable);
  const mergeSubscription = mergeObservable.subscribe(observer);
}

///////////////COMBINELATEST//////////////////////////////////////////////////////////////////////////
function combineLatestMethod() {
  const combineLatestObservable1 = Rx.Observable.interval(100).take(12);
  const combineLatestObservable2 = Rx.Observable.interval(250).take(10);
  const combineLatestObservableBoth = Rx.Observable.combineLatest(
    combineLatestObservable1,
    combineLatestObservable2,
    (first, second) => 'First: ' + first + ', ' + 'Second: ' + second
  );
  const combineLatestSubscription = combineLatestObservableBoth.subscribe(observer);
}

///////////////ZIP/////////////////////////////////////////////////////////////////////////////////////
function zipMethod2() {
  const zipIntervalObservable1 = Rx.Observable.interval(250).take(20);
  const zipIntervalObservable2 = Rx.Observable.interval(1000).take(10);
  const zipObservable = zipIntervalObservable1.zip(
    zipIntervalObservable2,
    (zip1, zip2) => zip1 + ' and ' + zip2
  );
  const zipSubscription = zipObservable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////COLD////////////////////////////////////////////////////////////////////////////////
function intervalMethod() {
  const intervalObservable = Rx.Observable.interval(500).take(10);
  const intervalSubscription = intervalObservable.subscribe(observer);
  setTimeout(() => intervalObservable.subscribe(observer), 2000);
}

///////////////////HOT/////////////////////////////////////////////////////////////////////////////////
function intervalMethod() {
  const intervalObservable = Rx.Observable.interval(500).take(10).share();
  const intervalSubscription = intervalObservable.subscribe(observer);
  setTimeout(() => intervalObservable.subscribe(observer), 2000);
}
