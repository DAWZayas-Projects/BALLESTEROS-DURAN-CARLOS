///////////////HELPER METHODS///////////////////////////////////////////////////////////////////////////
function addItemToPage(item) {
	document.write(item + '<br/>');
}

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

///////////////AMB/////////////////////////////////////////////////////////////////////////////////////
function ambMethod1() {
  const ambObservable = Rx.Observable.amb(
      Rx.Observable.interval(250),
      Rx.Observable.interval(100)
  );
  const ambSubscription = ambObservable.subscribe(observer);
}

///////////////CASE////////////////////////////////////////////////////////////////////////////////////
function caseMethod() {
  const caseSources = {
      0: Rx.Observable.return(42),
      1: Rx.Observable.return(56)
  };
  const caseDefaultSource = Rx.Observable.return(0);
  const caseObservable = Rx.Observable.case(
    () => 2,
    caseSources,
    caseDefaultSource
  );
  const caseSubscription = caseObservable.subscribe(observer);
}

///////////////CATCH///////////////////////////////////////////////////////////////////////////////////
function catchMethod() {
  const catchErrorObservable = Rx.Observable.throw(new Error('error'));
  const catchNormalObservable = Rx.Observable.return(42);
  const catchObservable = Rx.Observable.catch(catchErrorObservable, catchNormalObservable);
  const catchSubscription = catchObservable.subscribe(observer);
}

///////////////CONCAT//////////////////////////////////////////////////////////////////////////////////
function concatMethod() {
  const concatObservable1 = Rx.Observable.from([1, 3, 5]);
  const concatObservable2 = Rx.Observable.from([2, 4, 6]);
  const concatObservableBoth = Rx.Observable.concat(concatObservable1, concatObservable2);
  const concatSubscription = concatObservableBoth.subscribe(observer);
}

///////////////CREATE//////////////////////////////////////////////////////////////////////////////////
function createMethod() {
  const createObservable = Rx.Observable.create(observer => {
  	observer.onNext(41);
  	observer.onNext(42);
    observer.onCompleted();
    //optional
    return () => console.log('observable disposed');
  });
  const createSubscription = createObservable.subscribe(observer);
  createSubscription.dispose();
}

///////////////DEFER///////////////////////////////////////////////////////////////////////////////////
function deferMethod() {
  const deferObservable = Rx.Observable.defer(() => Rx.Observable.interval(250));
  const deferSubscription = deferObservable.subscribe(observer);
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

///////////////FORKJOIN////////////////////////////////////////////////////////////////////////////////
function forkJoinMethod1() {
  const forkJoinObservable = Rx.Observable.forkJoin(
    Rx.Observable.return(42),
    Rx.Observable.range(1, 10),
    Rx.Observable.from([1,2,3]),
    Promise.resolve(56),
    (s1, s2, s3, s4) => s1 + ', ' + s2 + ', ' + s3 + ', ' + s4 + '.'
  );
  const forkJoinSubscription = forkJoinObservable.subscribe(observer);
}

///////////////FROM////////////////////////////////////////////////////////////////////////////////////
function fromMethod1() {
  const fromArgumentsObservable = (...arguments) => Rx.Observable.from(arguments);
  const fromArgumentsSubscription = fromArgumentsObservable(1, 'test', {key: 0}).subscribe(observer);
}
function fromMethod2() {
  const fromArraySubscription = Rx.Observable.from([2, 4, 6, 8, 0]).subscribe(observer);
  const fromArray = [1, 2, 3, 4, 5];
  const fromArraySubscription2 = Rx.Observable.from(fromArray, item => item + 1).subscribe(observer);
}
function fromMethod3() {
  const fromString = 'observable';
  const fromStringSubscription = Rx.Observable.from(fromString).subscribe(observer);
}
function fromMethod4() {
  const fromLengthSubscription = Rx.Observable.from({length: 5}, (k, v) => v).subscribe(observer);
}

///////////////FROMARRAY///////////////////////////////////////////////////////////////////////////////
//DEPRECATED

///////////////FROMCALLBACK////////////////////////////////////////////////////////////////////////////
/*
function fromCallbackMethod() {
  const isEvenCallback = function() {
    return () => number => number % 2 == 0 ? 'true' : 'false';
  }
  const isEvenObservable = Rx.Observable.fromCallback(isEvenCallback);
  const fromCallbackObservable = isEvenObservable(22);
  const fromCallbackSubscription = fromCallbackObservable.subscribe(observer);
}
*/

///////////////FROMEVENT///////////////////////////////////////////////////////////////////////////////
function fromEventMethod() {
  const fromEventObservable = Rx.Observable.fromEvent(document.body, 'keyup', event => event.keyCode);
  const fromEventSubscription = fromEventObservable.subscribe(observer);
}

///////////////FROMEVENTPATTERN////////////////////////////////////////////////////////////////////////

///////////////FROMNODECALLBACK////////////////////////////////////////////////////////////////////////

///////////////FROMPROMISE/////////////////////////////////////////////////////////////////////////////
function fromPromiseMethod() {
  const promise = Promise.resolve(42);
  const fromPromiseObservable = Rx.Observable.fromPromise(promise);
  const fromPromiseSubscription = fromPromiseObservable.subscribe(observer);
}

///////////////GENERATE////////////////////////////////////////////////////////////////////////////////
function generateMethod() {
  const generateObservable = Rx.Observable.generate(
  	0,
  	x => x < 13,
  	x => x + 1,
  	x => x * 2
  );
  const generateSubscription = generateObservable.subscribe(observer);
}

///////////////GENERATEWITHABSOLUTETIME////////////////////////////////////////////////////////////////
function generateWithAbsoluteTimeMethod() {
  const generateWithAbsoluteTimeObservable = Rx.Observable.generateWithAbsoluteTime(
    1,
    x => x < 10,
    x => x + 1,
    x => x + '.',
    x => Date.now() + (200 * x)
  );
  const generateWithAbsoluteTimeSubscription = generateWithAbsoluteTimeObservable.subscribe(observer);
}

///////////////GENERATEWITHRELATIVETIME////////////////////////////////////////////////////////////////
function generateWithRelativeTimeMethod() {
  const generateWithRelativeTimeObservable = Rx.Observable.generateWithRelativeTime(
      1,
      x => x < 10,
      x => x / 1.1,
      x => x,
      x => 2000 * x
  );
  const generateWithRelativeTimeSubscription = generateWithRelativeTimeObservable.subscribe(observer);
}

///////////////IF//////////////////////////////////////////////////////////////////////////////////////
function ifMethod() {
  const ifNumber = 3;
  const ifObservable = Rx.Observable.if(
      () => ifNumber % 2 === 0,
      Rx.Observable.return(42),
      Rx.Observable.return(56)
  );
  const ifSubscription = ifObservable.subscribe(observer);
}

///////////////INTERVAL////////////////////////////////////////////////////////////////////////////////
function intervalMethod() {
  const intervalObservable = Rx.Observable.interval(500);
  const intervalSubscription = intervalObservable.subscribe(observer);
}

///////////////JUST////////////////////////////////////////////////////////////////////////////////////
//===RETURN

///////////////MERGE///////////////////////////////////////////////////////////////////////////////////
function mergeMethod1() {
  const mergeObservable1 = Rx.Observable.interval(100);
  const mergeObservable2 = Rx.Observable.interval(500).map(number => number + '00');
  const mergeObservableBoth = Rx.Observable.merge(mergeObservable1, mergeObservable2);
  const mergeSubscription = mergeObservableBoth.subscribe(observer);
}

///////////////MERGEDELAYERROR/////////////////////////////////////////////////////////////////////////
function mergeDelayErrorMethod() {
  const mergeDelayErrorObservable1 = Rx.Observable.of(1, 2, 3);
  const mergeDelayErrorObservable2 = Rx.Observable.throw(new Error('error on observable 2'));
  const mergeDelayErrorObservable3 = Rx.Observable.of(4, 5, 6);
  const mergeDelayErrorObservable4 = Rx.Observable.of(7, 8, 9);
  const mergeDelayErrorObservable = Rx.Observable.mergeDelayError(
    mergeDelayErrorObservable1,
    mergeDelayErrorObservable2,
    mergeDelayErrorObservable3,
    mergeDelayErrorObservable4
  );
  const mergeDelayErrorSubscription = mergeDelayErrorObservable.subscribe(observer);
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

///////////////OFARRAYCHANGES//////////////////////////////////////////////////////////////////////////
function ofArrayChangesMethod() {
  let arrayChanges = [1, 2, 3];
  const arrayChangesObservable = Rx.Observable.ofArrayChanges(arrayChanges);
  arrayChanges[0] = 100;
}

///////////////OFOBJECTCHANGES/////////////////////////////////////////////////////////////////////////
function ofObjectChangesMethod() {
  let objectChanges = { value1: 1, value2: 2};
  const objectChangesObservable = Rx.Observable.ofObjectChanges(objectChanges);
  objectChanges.value1 = 100;
}

///////////////OFWITHSCHEDULER/////////////////////////////////////////////////////////////////////////
/*
function ofWithSchedulerMethod() {
  const ofWithSchedulerObservable = Rx.Observable.ofWithScheduler(Rx.Scheduler.timeout, 1, 2, 3);
  const ofWithSchedulerSubscription = ofWithSchedulerObservable.subscribe(observer);
}
*/

///////////////ONERRORRESUMENEXT///////////////////////////////////////////////////////////////////////
function onErrorResumeNextMethod1() {
  const onError1 = Rx.Observable.throw(new Error('error 1'));
  const onError2 = Rx.Observable.throw(new Error('error 2'));
  const onError3 = Rx.Observable.return(42);
  const onErrorResumeNextObservable = Rx.Observable.onErrorResumeNext(onError1, onError1, onError3);
  const onErrorResumeNextSubscription = onErrorResumeNextObservable.subscribe(observer);
}

///////////////PAIRS///////////////////////////////////////////////////////////////////////////////////
function pairsMethod() {
  const pairsObject = {key1: 'value1', key2: 'value2', key3: 'value3'};
  const pairObservable = Rx.Observable.pairs(pairsObject);
  const pairsSubscription = pairObservable.subscribe(observer);
}

///////////////RANGE///////////////////////////////////////////////////////////////////////////////////
function rangeMethod() {
  const rangeObserable = Rx.Observable.range(11, 5);
  const rangeSubscription = rangeObserable.subscribe(observer);
}

///////////////REPEAT//////////////////////////////////////////////////////////////////////////////////
function repeatMethod1() {
  const repeatObservable1 = Rx.Observable.repeat('repeat x 3', 3);
  const repeatSubscription1 = repeatObservable1.subscribe(observer);
}
function repeatMethod2() {
  const repeatObservable2 = Rx.Observable.repeat('repeat forever').take(20);
  const repeatSubscription2 = repeatObservable2.subscribe(observer);
}

///////////////RETURN//////////////////////////////////////////////////////////////////////////////////
function returnMethod() {
  const returnObservable = Rx.Observable.return(50);
  const returnSubscription = returnObservable.subscribe(observer);
}

///////////////SPAWN///////////////////////////////////////////////////////////////////////////////////
function spawnMethod() {
  const spawnObservable = Rx.Observable.spawn(() => 12);
  const spawnSubscription = spawnObservable.subscribe(observer);
}

///////////////START///////////////////////////////////////////////////////////////////////////////////
function startMethod() {
  const startContext = {value: 6};
  const startObservable = Rx.Observable.start(
    function () {
      return this.value;
    },
    startContext
  );
  const startSubscription = startObservable.subscribe(observer);
}

///////////////STARTASYNC//////////////////////////////////////////////////////////////////////////////
function startAsyncMethod() {
  const startAsyncObservable = Rx.Observable.startAsync(() => Promise.resolve('async'));
  const startAsyncSubscription = startAsyncObservable.subscribe(observer);
}

///////////////THROW///////////////////////////////////////////////////////////////////////////////////
function throwMethod() {
  const throwObservable = Rx.Observable.throw(new Error('error thrown!'));
  const throwSubscription = throwObservable.subscribe(observer);
}

///////////////TIMER///////////////////////////////////////////////////////////////////////////////////
function timerMethod() {
  const timerObservable = Rx.Observable.timer(2000, 1000);
  const timerSubscription = timerObservable.subscribe(observer);
}

///////////////TOASYNC/////////////////////////////////////////////////////////////////////////////////
function toAsyncMethod() {
  const toAsyncFunction = Rx.Observable.toAsync((x, y) => x + ' and ' + y);
  const toAsyncObservable = toAsyncFunction(3, 4);
  const toAsyncSubscription = toAsyncObservable.subscribe(observer);
}

///////////////USING///////////////////////////////////////////////////////////////////////////////////

///////////////WHEN////////////////////////////////////////////////////////////////////////////////////
function whenMethod() {
  const whenObservable = Rx.Observable.when(
    Rx.Observable.timer(100).and(Rx.Observable.timer(500)).thenDo(() => 'first'),
    Rx.Observable.timer(400).and(Rx.Observable.timer(300)).thenDo(() => 'second')
  );
  const whenSubscription = whenObservable.subscribe(observer);
}

///////////////WHILE///////////////////////////////////////////////////////////////////////////////////
function whileMethod() {
  let iWhile = 0;
  const whileObservable = Rx.Observable.while(
      () => iWhile++ < 3,
      Rx.Observable.return('while')
  );
  const whileSubscription = whileObservable.subscribe(observer);
}

///////////////WRAP////////////////////////////////////////////////////////////////////////////////////
function wrapMethod() {
  const wrapFunction = Rx.Observable.wrap(function* (x) {
    return yield Rx.Observable.return(x);
  });
  const wrapObservable = wrapFunction('wrap');
  const wrapSubscription = wrapObservable.subscribe(observer);
}

///////////////ZIP/////////////////////////////////////////////////////////////////////////////////////
function zipMethod1() {
  const zipRangeObservable1 = Rx.Observable.range(0, 5);
  const zipRangeObservable2 = Rx.Observable.range(10, 10);
  const zipRangeObservable3 = Rx.Observable.range(100, 6);
  const zipObservable = Rx.Observable.zip(
    zipRangeObservable1,
    zipRangeObservable2,
    zipRangeObservable3,
    (zip1, zip2, zip3) => zip1 + ' : ' + zip2 + ' ... ' + zip3
  );
  const zipSubscription = zipObservable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////AGGREGATE///////////////////////////////////////////////////////////////////////////////
//===REDUCE

///////////////ALL/////////////////////////////////////////////////////////////////////////////////////
//===EVERY

///////////////AMB/////////////////////////////////////////////////////////////////////////////////////
function ambMethod2() {
  const ambObservable1 = Rx.Observable.interval(250);
  const ambObservable2 = Rx.Observable.interval(100);
  const ambObservableBoth = ambObservable1.amb(ambObservable2);
  const ambSubscriptionBoth = ambObservableBoth.subscribe(observer);
}

///////////////AND/////////////////////////////////////////////////////////////////////////////////////
function andMethod() {
  const andObservable = Rx.Observable.when(
    Rx.Observable.timer(100).and(Rx.Observable.timer(500)).thenDo(() => 'first'),
    Rx.Observable.timer(400).and(Rx.Observable.timer(300)).thenDo(() => 'second')
  );
  const andSubscription = andObservable.subscribe(observer);
}

///////////////ANY/////////////////////////////////////////////////////////////////////////////////////
//===SOME

///////////////ASOBSERVABLE////////////////////////////////////////////////////////////////////////////
function asObservableMethod() {
  const asObservableSubject = new Rx.AsyncSubject();
  asObservableSubject.onNext('subject as observable');
  asObservableSubject.onCompleted();
  const asObservableObservable = asObservableSubject.asObservable();
  const asObservableSubscription = asObservableObservable.subscribe(observer);
}

///////////////AVERAGE/////////////////////////////////////////////////////////////////////////////////
function averageMethod() {
  const averageArray = [10, 30, 80];
  const averageContext = 10;
  const averageArrayObservable = Rx.Observable.from(averageArray);
  const averageObservable = averageArrayObservable.average(
    function(x) {
      return x / this;
    },
    averageContext
  );
  const averageSubscription = averageObservable.subscribe(observer);
}

///////////////BUFFER//////////////////////////////////////////////////////////////////////////////////

///////////////BUFFERWITHCOUNT/////////////////////////////////////////////////////////////////////////
function bufferWithCountMethod() {
  const bufferWithCountObservable = Rx.Observable.range(1, 10).bufferWithCount(2, 3);
  const bufferWithCountSubscription = bufferWithCountObservable.subscribe(observer);
}

///////////////BUFFERWITHTIME//////////////////////////////////////////////////////////////////////////
function bufferWithTimeMethod() {
  const bufferWithTimeObservable = Rx.Observable.interval(100).bufferWithTime(500, 600).take(20);
  const bufferWithTimeSubscription = bufferWithTimeObservable.subscribe(observer);
}

///////////////BUFFERWITHTIMEORCOUNT///////////////////////////////////////////////////////////////////
function bufferWithTimeOrCountMethod() {
  const bufferWithTimeOrCountObservable = Rx.Observable.interval(100).bufferWithTimeOrCount(1000, 5);
  const bufferWithTimeOrCountSubscription = bufferWithTimeOrCountObservable.subscribe(observer);
}

///////////////CATCH///////////////////////////////////////////////////////////////////////////////////
function catchMethod1() {
  const catchThrowObservable = Rx.Observable.throw(new Error('error'));
  const catchObservableObservable = catchThrowObservable.catch(Rx.Observable.just('observable'));
  const catchObservableSubscription = catchObservableObservable.subscribe(observer);
}
function catchMethod2() {
  const catchThrowObservable = Rx.Observable.throw(new Error('error'));
  const catchFunctionObservable = catchThrowObservable.catch(() => Rx.Observable.just('function'));
  const catchFunctionSubscription = catchFunctionObservable.subscribe(observer);
}

///////////////COMBINELATEST//////////////////////////////////////////////////////////////////////////
function combineLatestMethod() {
  const combineLatestObservable1 = Rx.Observable.interval(100);
  const combineLatestObservable2 = Rx.Observable.interval(250);
  const combineLatestObservableBoth = Rx.Observable.combineLatest(
    combineLatestObservable1,
    combineLatestObservable2,
    (first, second) => 'First: ' + first + ', ' + 'Second: ' + second
  ).take(20);
  const combineLatestSubscription = combineLatestObservableBoth.subscribe(observer);
}

///////////////CONCAT//////////////////////////////////////////////////////////////////////////////////
function concatMethod2() {
  const concatReturnObservable = Rx.Observable.return('first');
  const concat2Observable = concatReturnObservable.concat(Rx.Observable.return('second'));
  const concat3Observable = concat2Observable.concat(Rx.Observable.return('third'));
  const concat3Subscription = concat3Observable.subscribe(observer);
}

///////////////CONCATALL///////////////////////////////////////////////////////////////////////////////
function concatAllMethod() {
  const concatAllMultipleObservable = Rx.Observable.range(0, 5).map(x => Rx.Observable.range(x, 3));
  const concatAllObservable = concatAllMultipleObservable.concatAll();
  const concatAllSubscription = concatAllObservable.subscribe(observer);
}

///////////////CONCATMAP///////////////////////////////////////////////////////////////////////////////

///////////////CONNECT/////////////////////////////////////////////////////////////////////////////////

///////////////CONTROLLED//////////////////////////////////////////////////////////////////////////////
function controlledMethod() {
  const controlledObservable = Rx.Observable.range(0, 10).controlled();
  const controlledSubscription = controlledObservable.subscribe(observer);
  controlledObservable.request(5);
}

///////////////COUNT///////////////////////////////////////////////////////////////////////////////////
function countMethod() {
  const countObservable = Rx.Observable.range(0, 10).count(x => x >= 2);
  const countSubscription = countObservable.subscribe(observer);
}

///////////////DEBOUNCE////////////////////////////////////////////////////////////////////////////////

///////////////DEFAULTIFEMPTY//////////////////////////////////////////////////////////////////////////
function defaultIfEmptyMethod() {
  const defaultIfEmptyObservable = Rx.Observable.empty().defaultIfEmpty('default');
  const defaultIfEmptySubscription = defaultIfEmptyObservable.subscribe(observer);
}

///////////////DELAY///////////////////////////////////////////////////////////////////////////////////

///////////////DELAYSUBSCRIPTION///////////////////////////////////////////////////////////////////////
function delaySubscriptionMethod() {
  const delaySubscriptionObservable = Rx.Observable.range(0, 3).delaySubscription(2000);
  const delaySubscriptionSubscription = delaySubscriptionObservable.subscribe(observer);
}

///////////////DEMATERIALIZE///////////////////////////////////////////////////////////////////////////

///////////////DISTINCT////////////////////////////////////////////////////////////////////////////////
function distinctMethod() {
  const distinctObservable = Rx.Observable.of(1, 2, 2, 3, 1, 2).distinct(x => x % 2 === 0);
  const distinctSubscription = distinctObservable.subscribe(observer);
}

///////////////DISTINCTUNTILCHANGED////////////////////////////////////////////////////////////////////
function distinctUntilChangedMethod() {
  const distinctNormalObservable = Rx.Observable.of(1, 2, 2, 1, 1, 2);
  const distinctUntilChangedObservable = distinctNormalObservable.distinctUntilChanged(x => x * 10);
  const distinctUntilChangedSubscription = distinctUntilChangedObservable.subscribe(observer);
}

///////////////DO//////////////////////////////////////////////////////////////////////////////////////
function doMethod1() {
  const doObservable1 = Rx.Observable.range(0, 10).do(observer);
  const doSubscription1 = doObservable1.subscribe(observer);
}
function doMethod2() {
  const doObservable2 = Rx.Observable.range(0, 10).do(
    next => console.log('Do Next:', next),
    error => console.log('Do Error:', err),
    () => console.log('Do Completed')
  );
  const doSubscription2 = doObservable2.subscribe(observer);
}

///////////////DOONNEXT////////////////////////////////////////////////////////////////////////////////
function doOnNextMethod() {
  const doOnNextObservable = Rx.Observable.range(0, 10).doOnNext(
    next => console.log('Do Next:', next)
  );
  const doOnNextSubscription = doOnNextObservable.subscribe(observer);
}

///////////////DOONERROR///////////////////////////////////////////////////////////////////////////////
function doOnErrorMethod() {
  const doOnErrorObservable = Rx.Observable.throw(new Error('error')).doOnError(
    error => console.log('Do Error:', error)
  );
  const doOnErrorSubscription = doOnErrorObservable.subscribe(observer);
}

///////////////DOONCOMPLETED///////////////////////////////////////////////////////////////////////////
function doOnCompletedMethod() {
  const doOnCompletedObservable = Rx.Observable.range(0, 3).doOnCompleted(
    () => console.log('Do Completed!')
  );
  const doOnCompletedSubscription = doOnCompletedObservable.subscribe(observer);
}

///////////////DOWHILE/////////////////////////////////////////////////////////////////////////////////
function doWhileMethod() {
  let iDoWhile = 0;
  const doWhileObservable = Rx.Observable.return('keep doing').doWhile(() => iDoWhile++ < 2);
  const doWhileSubscription = doWhileObservable.subscribe(observer);
}

///////////////ELEMENTAT///////////////////////////////////////////////////////////////////////////////
function elementAtMethod1() {
  const elementAtObservable1 = Rx.Observable.from([1,2,3,4]).elementAt(1);
  const elementAtSubscription1 = elementAtObservable1.subscribe(observer);
}
function elementAtMethod2() {
  const elementAtObservable2 = Rx.Observable.from([1,2,3,4]).elementAt(10, 'default');
  const elementAtSubscription2 = elementAtObservable2.subscribe(observer);
}

///////////////EVERY///////////////////////////////////////////////////////////////////////////////////
function everyMethod() {
  const everyObservable = Rx.Observable.from([1,2,3,4]).every(x => x % 2 === 0);
  const everySubscription = everyObservable.subscribe(observer);
}

///////////////EXPAND//////////////////////////////////////////////////////////////////////////////////
function expandMethod() {
  const expandObservable = Rx.Observable.return(0).expand(x => Rx.Observable.return(x + 1)).take(20);
  const expandSubscription = expandObservable.subscribe(observer);
}

///////////////EXTEND//////////////////////////////////////////////////////////////////////////////////
function extendMethod() {
  const extendObservable = Rx.Observable.range(0, 3).extend(x => x.first()).mergeAll();
  const extendSubscription = extendObservable.subscribe(observer);
}

///////////////FILTER//////////////////////////////////////////////////////////////////////////////////
function filterMethod() {
  const filterObservable = Rx.Observable.range(0, 10).filter(x => x % 2 === 0);
  const filterSubscription = filterObservable.subscribe(observer);
}

///////////////FINALLY/////////////////////////////////////////////////////////////////////////////////
//finallyAction for browsers < IE9
function finallyMethod() {
  const finallyObservable = Rx.Observable.return(0).finally(() => console.log('Done'));
  const finallySubscription = finallyObservable.subscribe(observer);
}

///////////////FIND////////////////////////////////////////////////////////////////////////////////////
function findMethod() {
  const findObservable = Rx.Observable.range(0, 10).find(x => x === 7);
  const findSubscription = findObservable.subscribe(observer);
}

///////////////FINDINDEX///////////////////////////////////////////////////////////////////////////////
function findIndexMethod() {
  const findIndexObservable = Rx.Observable.range(11, 10).findIndex(x => x === 7);
  const findIndexSubscription = findIndexObservable.subscribe(observer);
}

///////////////FIRST///////////////////////////////////////////////////////////////////////////////////
function firstMethod1() {
  const firstContext = {value: 10};
  const firstObservable1 = Rx.Observable.range(0, 10).first(
    function (x) { return x > this.value; },
    firstContext,
    'default'
  );
  const firstSubscription1 = firstObservable1.subscribe(observer);
}
function firstMethod2() {
  const firstObservable2 = Rx.Observable.range(5, 5).first();
  const firstSubscription2 = firstObservable2.subscribe(observer);
}

///////////////FLATMAP/////////////////////////////////////////////////////////////////////////////////

///////////////FLATMAPFIRST////////////////////////////////////////////////////////////////////////////

///////////////FLATMAPLATEST///////////////////////////////////////////////////////////////////////////

///////////////FLATMAPOBSERVER/////////////////////////////////////////////////////////////////////////

///////////////FLATMAPWITHMAXCONCURRENT////////////////////////////////////////////////////////////////
//DEPRECATED???

///////////////FORKJOIN////////////////////////////////////////////////////////////////////////////////
function forkJoinMethod2() {
  const forkJoinObservable1 = Rx.Observable.return(42);
  const forkJoinObservable2 = Rx.Observable.from([1,2,3]);
  const forkJoinObservableBoth = forkJoinObservable1.forkJoin(
    forkJoinObservable2,
    (s1, s2) => s1 + ', ' + s2 + '.'
  );
  const forkJoinSubscription = forkJoinObservableBoth.subscribe(observer);
}

///////////////GROUPBY/////////////////////////////////////////////////////////////////////////////////
function groupByMethod() {
  const groupByObservable = Rx.Observable.range(0, 10).groupBy(
    x => x % 3,
    x => x * 10
  );
  const groupBySubscription = groupByObservable.subscribe(observer);
}

///////////////GROUPBYUNTIL////////////////////////////////////////////////////////////////////////////

///////////////GROUPJOIN///////////////////////////////////////////////////////////////////////////////

///////////////IGNOREELEMENTS//////////////////////////////////////////////////////////////////////////
function ignoreElementsMethod() {
  const ignoreElementsObservable = Rx.Observable.range(0, 10).ignoreElements();
  const ignoreElementsSubscription = ignoreElementsObservable.subscribe(observer);
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

///////////////JOIN////////////////////////////////////////////////////////////////////////////////////
function joinMethod() {
  const joinFirstObservable = Rx.Observable.interval(100).map(x => 'first: ' + x);
  const joinSecondObservable = Rx.Observable.interval(250).map(x => 'second: ' + x);
  const joinObservable = joinFirstObservable.join(
    joinSecondObservable,
    () => Rx.Observable.timer(0),
    () => Rx.Observable.timer(0),
    (first, second) => first + ', ' + second
  ).take(5);
  const joinSubscription = joinObservable.subscribe(observer);
}

///////////////LAST////////////////////////////////////////////////////////////////////////////////////
function lastMethod1() {
  const lastContext = {value: 1};
  const lastObservable1 = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8).last(
    function (x) { return x % 2 === this.value; },
    lastContext,
    'default'
  );
  const lastSubscription1 = lastObservable1.subscribe(observer);
}
function lastMethod2() {
  const lastObservable2 = Rx.Observable.range(5, 5).last();
  const lastSubscription2 = lastObservable2.subscribe(observer);
}

///////////////LASTINDEXOF/////////////////////////////////////////////////////////////////////////////
function lastIndexOfMethod() {
  const lastIndexOfObservable = Rx.Observable.of(1, 2, 3, 1, 2, 3, 3, 2, 1).lastIndexOf(3, 0);
  const lastIndexOfSubscription = lastIndexOfObservable.subscribe(observer);
}

///////////////LET/////////////////////////////////////////////////////////////////////////////////////
//letBind for browsers < IE9
function letMethod() {
  const letSimpleObservable = Rx.Observable.range(1, 3);
  const letObservable = letSimpleObservable.let(observable => observable.concat(observable));
  const letSubscription = letObservable.subscribe(observer);
}

///////////////MANYSELECT//////////////////////////////////////////////////////////////////////////////
//===EXTEND

///////////////MAP/////////////////////////////////////////////////////////////////////////////////////
function mapMethod() {
  const mapObservable = Rx.Observable.range(0, 10).map(x => x + '0').map(x => 'New Entry: ' + x);
  const mapSubscription = mapObservable.subscribe(observer);
}

///////////////MAX/////////////////////////////////////////////////////////////////////////////////////
function maxMethod() {
  const maxComparer = (x, y) => {
    if (x > y) {
        return 1;
    } else if (x < y) {
        return -1;
    }
    return 0;
  }
  const maxObservable = Rx.Observable.from([1,3,5,7,9,2,4,6,8]).max(maxComparer);
  const maxSubscription = maxObservable.subscribe(observer);
}

///////////////MAXBY///////////////////////////////////////////////////////////////////////////////////
function maxByMethod() {
  const maxByComparer = (x, y) => {
    if (x > y) {
        return 1;
    } else if (x < y) {
        return -1;
    }
    return 0;
  }
  const maxByObservable = Rx.Observable.from([1,3,5,7,9,2,4,6,8]).maxBy(
    x => x % 2,
    maxByComparer
  );
  const maxBySubscription = maxByObservable.subscribe(observer);
}

///////////////MERGE///////////////////////////////////////////////////////////////////////////////////
function mergeMethod2() {
  const mergeObservable1 = Rx.Observable.interval(100);
  const mergeObservable2 = Rx.Observable.interval(50).map(number => number + '0');
  const mergeObservableBoth = mergeObservable1.merge(mergeObservable2).take(20);
  const mergeSubscription = mergeObservableBoth.subscribe(observer);
}
function mergeMethod3() {
  const mergeMultipleObservable = Rx.Observable.range(0, 3).map(x => Rx.Observable.range(x * 10, 3));
  const mergeObservable = mergeMultipleObservable.merge(3);
  const mergeSubscription = mergeObservable.subscribe(observer);
}

///////////////MERGEALL////////////////////////////////////////////////////////////////////////////////
function mergeAllMethod() {
  const mergeAllMultipleObservable = Rx.Observable.range(0, 3).map(x => Rx.Observable.range(x, 3));
  const mergeAllObservable = mergeAllMultipleObservable.mergeAll();
  const mergeAllSubscription = mergeAllObservable.subscribe(observer);
}

///////////////MIN/////////////////////////////////////////////////////////////////////////////////////
function minMethod() {
  const minComparer = (x, y) => {
    if (x > y) {
        return 1;
    } else if (x < y) {
        return -1;
    }
    return 0;
  }
  const minObservable = Rx.Observable.from([1,3,5,7,9,2,4,6,8]).min(minComparer);
  const minSubscription = minObservable.subscribe(observer);
}

///////////////MINBY///////////////////////////////////////////////////////////////////////////////////
function minByMethod() {
  const minByComparer = (x, y) => {
    if (x > y) {
        return 1;
    } else if (x < y) {
        return -1;
    }
    return 0;
  }
  const minByObservable = Rx.Observable.from([1,3,5,7,9,2,4,6,8]).minBy(
    x => x % 2,
    minByComparer
  );
  const minBySubscription = minByObservable.subscribe(observer);
}

///////////////MULTICAST///////////////////////////////////////////////////////////////////////////////

///////////////OBSERVEON///////////////////////////////////////////////////////////////////////////////
/*
function observeOnMethod() {
  const observeOnObservable =
    Rx.Observable.return(42, Rx.Scheduler.immediate).observeOn(Rx.Scheduler.timeout);
  const observeOnSubscription = observeOnObservable.subscribe(observer);
}
*/

///////////////ONERRORRESUMENEXT///////////////////////////////////////////////////////////////////////
function onErrorResumeNextMethod2() {
  const onErrorObservable1 = Rx.Observable.throw(new Error('error'));
  const onErrorObservable2 = Rx.Observable.return('no error');
  const onErrorResumeNextObservable = onErrorObservable1.onErrorResumeNext(onErrorObservable2);
  const onErrorResumeNextSubscription = onErrorResumeNextObservable.subscribe(observer);
}

///////////////PAIRWISE////////////////////////////////////////////////////////////////////////////////
function pairwiseMethod() {
  const pairwiseObservable = Rx.Observable.range(1, 10).pairwise();
  const pairwiseSubscription = pairwiseObservable.subscribe(observer);
}

///////////////PARTITION///////////////////////////////////////////////////////////////////////////////

///////////////PAUSABLE////////////////////////////////////////////////////////////////////////////////
function pausableMethod() {
  const pausablePauser = new Rx.Subject();
  const pausableObservable = Rx.Observable.interval(250).pausable(pausablePauser);
  const pausableSubscription = pausableObservable.subscribe(observer);
  pausableObservable.resume(); //pausablePauser.onNext(true);
  setTimeout(() => pausableObservable.pause(), 2000); //pausablePauser.onNext(true);
}

///////////////PAUSABLEBUFFERED////////////////////////////////////////////////////////////////////////
//hot observables only
function pausableBufferedMethod() {
  const pausableBufferedPauser = new Rx.Subject();
  const pausableBufferedObservable = 
    Rx.Observable.interval(250).pausableBuffered(pausableBufferedPauser);
  const pausableBufferedSubscription = pausableBufferedObservable.subscribe(observer);
  pausableBufferedObservable.resume(); //pausableBufferedPauser.onNext(true);
  setTimeout(() => pausableBufferedObservable.pause(), 2000); //pausableBufferedPauser.onNext(true);
  setTimeout(() => pausableBufferedObservable.resume(), 4000); //pausableBufferedPauser.onNext(true);
  setTimeout(() => pausableBufferedObservable.pause(), 6000); //pausableBufferedPauser.onNext(true);
}

///////////////PLUCK///////////////////////////////////////////////////////////////////////////////////
function pluckMethod() {
  const pluckObservable = Rx.Observable.from([
    { valueA: { valueB: { valueC: 0 }}},
    { valueA: { valueB: 'value B'}},
    { valueA: { valueB: 2 }},
  ]).pluck('valueA', 'valueB');
  const pluckSubscription = pluckObservable.subscribe(observer);
}

///////////////PUBLISH/////////////////////////////////////////////////////////////////////////////////

///////////////PUBLISHLAST/////////////////////////////////////////////////////////////////////////////

///////////////PUBLISHVALUE////////////////////////////////////////////////////////////////////////////

///////////////SHARE///////////////////////////////////////////////////////////////////////////////////

///////////////SHAREREPLAY/////////////////////////////////////////////////////////////////////////////

///////////////SHAREVALUE//////////////////////////////////////////////////////////////////////////////

///////////////REFCOUNT////////////////////////////////////////////////////////////////////////////////

///////////////REDUCE//////////////////////////////////////////////////////////////////////////////////
function reduceMethod() {
  const reduceObservable = Rx.Observable.range(1, 3).reduce(
    (accumulator, item, index, source) => accumulator * item,
    2
  );
  const reduceSubscription = reduceObservable.subscribe(observer);
}

///////////////REPLAY//////////////////////////////////////////////////////////////////////////////////

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

///////////////RETRYWHEN///////////////////////////////////////////////////////////////////////////////

///////////////SAMPLE//////////////////////////////////////////////////////////////////////////////////
function sampleMethod1() {
  const sampleObservable = Rx.Observable.interval(250).sample(1000);
  const sampleSubscription = sampleObservable.subscribe(observer);
}
function sampleMethod2() {
  const sampleObservable = Rx.Observable.interval(250).sample(Rx.Observable.interval(1000));
  const sampleSubscription = sampleObservable.subscribe(observer);
}

///////////////SCAN////////////////////////////////////////////////////////////////////////////////////
function scanMethod() {
  const scanObservable = Rx.Observable.range(1, 3).scan(
    (accumulator, item, index, source) => accumulator * item,
    2
  );
  const scanSubscription = scanObservable.subscribe(observer);
}

///////////////SELECT//////////////////////////////////////////////////////////////////////////////////
//===MAP

///////////////SELECTCONCAT////////////////////////////////////////////////////////////////////////////
//===CONCATMAP

///////////////SELECTMANY//////////////////////////////////////////////////////////////////////////////
//===FLATMAP

///////////////SEQUENCEEQUAL///////////////////////////////////////////////////////////////////////////
function sequenceEqual() {
  const sequenceEqualObservable1 = Rx.Observable.return('sequence');
  const sequenceEqualObservable2 = Rx.Observable.return('sequence');
  const sequenceEqualObservable = sequenceEqualObservable1.sequenceEqual(sequenceEqualObservable2);
  const sequenceEqualSubscription = sequenceEqualObservable.subscribe(observer);
}

///////////////SINGLE//////////////////////////////////////////////////////////////////////////////////
function singleMethod1() {
  const singleObservable = Rx.Observable.range(0, 10).single(
    (item, index, observable) => item === 2,
    'not found'
  );
  const singleSubscription = singleObservable.subscribe(observer);
}
function singleMethod2() {
  const singleObservable = Rx.Observable.range(0, 10).single(
    (item, index, observable) => item === 12,
    'not found'
  );
  const singleSubscription = singleObservable.subscribe(observer);
}
function singleMethod3() {
  const singleObservable = Rx.Observable.range(0, 10).single(
    (item, index, observable) => item % 2 === 0,
    'not found'
  );
  const singleSubscription = singleObservable.subscribe(observer);
}

///////////////SINGLEINSTANCE//////////////////////////////////////////////////////////////////////////

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

///////////////SKIPLASTWITHTIME////////////////////////////////////////////////////////////////////////
function skipLastWithTimeMethod() {
  const skipLastWithTimeObservable = Rx.Observable.interval(250).take(10).skipLastWithTime(1000);
  const skipLastWithTimeSubscription = skipLastWithTimeObservable.subscribe(observer);
}

///////////////SKIPUNTIL///////////////////////////////////////////////////////////////////////////////
function skipUntilMethod() {
  const skipUntilObservable1 = Rx.Observable.interval(100);
  const skipUntilObservable2 = Rx.Observable.interval(1000);
  const skipUntilObservable = skipUntilObservable1.skipUntil(skipUntilObservable2).take(20);
  const skipUntilSubscription = skipUntilObservable.subscribe(observer);
}

///////////////SKIPUNTILWITHTIME///////////////////////////////////////////////////////////////////////
function skipUntilWithTimeMethod() {
  const skipUntilWithTimeObservable1 = Rx.Observable.interval(100);
  const skipUntilWithTimeObservable = skipUntilWithTimeObservable1.skipUntilWithTime(1000).take(20);
  const skipUntilWithTimeSubscription = skipUntilWithTimeObservable.subscribe(observer);
}

///////////////SKIPWHILE///////////////////////////////////////////////////////////////////////////////
function skipWhileMethod() {
  const skipWhileObservable = Rx.Observable.interval(100).skipWhile(x => x < 5).take(20);
  const skipWhileSubscription = skipWhileObservable.subscribe(observer);
}

///////////////SLICE///////////////////////////////////////////////////////////////////////////////////
function sliceMethod() {
  const sliceObservable = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8).slice(2, 6);
  const sliceSubscription = sliceObservable.subscribe(observer);
}

///////////////SOME////////////////////////////////////////////////////////////////////////////////////
function someMethod() {
  const someObservable = Rx.Observable.of(1, 2, 3, 4, 5, 6, 7, 8).some(x => x > 8);
  const someSubscription = someObservable.subscribe(observer);
}

///////////////STARTWITH///////////////////////////////////////////////////////////////////////////////
function startWithMethod() {
  const startWithObservable = Rx.Observable.return(4).startWith(1, 2, 3);
  const startWithSubscription = startWithObservable.subscribe(observer);
}

///////////////SUBSCRIBE///////////////////////////////////////////////////////////////////////////////
//===FOREACH
function subscribeMethod() {
  const subscribeObservable = Rx.Observable.return(0);
  const subscribeSubscription = subscribeObservable.subscribe(observer);
}

///////////////SUBSCRIBEON/////////////////////////////////////////////////////////////////////////////

///////////////SUM/////////////////////////////////////////////////////////////////////////////////////
function sumMethod() {
  const sumObservable = Rx.Observable.range(0, 10).sum();
  const sumSubscription = sumObservable.subscribe(observer);
}

///////////////SWITCH//////////////////////////////////////////////////////////////////////////////////
//better with a drawing....
function switchMethod() {
  const switchObservable = Rx.Observable.range(0, 3).map(x => Rx.Observable.range(x, 3)).switch();
  const switchSubscription = switchObservable.subscribe(observer);
}

///////////////SWITCHFIRST/////////////////////////////////////////////////////////////////////////////

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

///////////////TAKELASTBUFFER//////////////////////////////////////////////////////////////////////////
function takeLastBufferMethod() {
  const takeLastBufferObservable = Rx.Observable.range(0, 10).takeLastBuffer(4);
  const takeLastBufferSubscription = takeLastBufferObservable.subscribe(observer);
}

///////////////TAKELASTBUFFERWITHTIME//////////////////////////////////////////////////////////////////
function takeLastBufferWithTimeMethod() {
  const takeLastBufferWithTimeObservable = 
    Rx.Observable.interval(100).take(20).takeLastBufferWithTime(1000);
  const takeLastBufferWithTimeSubscription = takeLastBufferWithTimeObservable.subscribe(observer);
}

///////////////TAKELASTWITHTIME////////////////////////////////////////////////////////////////////////
function takeLastWithTimeMethod() {
  const takeLastWithTimeObservable = Rx.Observable.interval(100).take(20).takeLastWithTime(1000);
  const takeLastWithTimeSubscription = takeLastWithTimeObservable.subscribe(observer);
}

///////////////TAKEUNTIL///////////////////////////////////////////////////////////////////////////////
function takeUntilMethod() {
  const takeUntilObservable1 = Rx.Observable.interval(100);
  const takeUntilObservable2 = Rx.Observable.interval(1200);
  const takeUntilObservable = takeUntilObservable1.takeUntil(takeUntilObservable2);
  const takeUntilSubscription = takeUntilObservable.subscribe(observer);
}

///////////////TAKEUNTILWITHTIME///////////////////////////////////////////////////////////////////////
function takeUntilWithTimeMethod() {
  const takeUntilWithTimeObservable1 = Rx.Observable.interval(100);
  const takeUntilWithTimeObservable = takeUntilWithTimeObservable1.takeUntilWithTime(1000);
  const takeUntilWithTimeSubscription = takeUntilWithTimeObservable.subscribe(observer);
}

///////////////TAKEWHILE///////////////////////////////////////////////////////////////////////////////
function takeWhileMethod() {
  const takeWhileObservable = Rx.Observable.interval(100).takeWhile(x => x < 5);
  const takeWhileSubscription = takeWhileObservable.subscribe(observer);
}

///////////////TAP/////////////////////////////////////////////////////////////////////////////////////
//===DO

///////////////TAPONNEXT///////////////////////////////////////////////////////////////////////////////
//===DOONNEXT

///////////////TAPONERROR//////////////////////////////////////////////////////////////////////////////
//===DOONERROR

///////////////TAPONCOMPLETED//////////////////////////////////////////////////////////////////////////
//===DOONCOMPLETED

///////////////THROTTLE////////////////////////////////////////////////////////////////////////////////
function throttleMethod() {
  const throttleObservable1 = Rx.Observable.interval(100).map(x => 'First: ' + x);
  const throttleObservable2 = Rx.Observable.interval(500).map(x => 'Second: ' + x);
  const throttleObservableBoth = throttleObservable1.merge(throttleObservable2).throttle(200).take(20);
  const throttleSubscription = throttleObservableBoth.subscribe(observer);
}

///////////////TIMEINTERVAL////////////////////////////////////////////////////////////////////////////
function timeIntervalMethod() {
  const timeIntervalObservable =
    Rx.Observable.interval(100).timeInterval().map(x => x.value + ':' + x.interval).take(20);
  const timeIntervalSubscription = timeIntervalObservable.subscribe(observer);
}

///////////////TIMEOUT/////////////////////////////////////////////////////////////////////////////////

///////////////TIMESTAMP///////////////////////////////////////////////////////////////////////////////
function timestampMethod() {
  const timestampObservable =
    Rx.Observable.interval(100).timestamp().map(x => x.value + ':' + x.timestamp).take(20);
  const timestampSubscription = timestampObservable.subscribe(observer);
}

///////////////TOARRAY/////////////////////////////////////////////////////////////////////////////////
function toArrayMethod() {
  const toArrayObservable = Rx.Observable.range(1, 12).toArray();
  const toArraySubscription = toArrayObservable.subscribe(observer);
}

///////////////WHERE///////////////////////////////////////////////////////////////////////////////////
//===FILTER

///////////////WINDOW//////////////////////////////////////////////////////////////////////////////////

///////////////WINDOWWITHCOUNT/////////////////////////////////////////////////////////////////////////

///////////////WINDOWWITHTIME//////////////////////////////////////////////////////////////////////////

///////////////WINDOWWITHTIMEORCOUNT///////////////////////////////////////////////////////////////////

///////////////WITHLATESTFROM//////////////////////////////////////////////////////////////////////////
function withLatestFromMethod() {
  const withLatestFromObservable1 = Rx.Observable.interval(200).map(item => 'First: ' + item);
  const withLatestFromObservable2 = Rx.Observable.interval(50).map(item => 'Second: ' + item);
  const withLatestFromObservable3 = Rx.Observable.interval(100).map(item => 'Third: ' + item);
  const withLatestFromObservable = withLatestFromObservable1.withLatestFrom(
    withLatestFromObservable2,
    withLatestFromObservable3,
    (s1, s2, s3) => s1 + ', ' + s2 + ', ' + s3 + '.'
  ).take(20);
  const withLatestFromSubscription = withLatestFromObservable.subscribe(observer);
}

///////////////ZIP/////////////////////////////////////////////////////////////////////////////////////
function zipMethod2() {
  const zipRangeObservable1 = Rx.Observable.range(0, 5);
  const zipRangeObservable2 = Rx.Observable.range(10, 10);
  const zipRangeObservable3 = Rx.Observable.range(100, 6);
  const zipObservable = zipRangeObservable1.zip(
    zipRangeObservable2,
    zipRangeObservable3,
    (zip1, zip2, zip3) => zip1 + ' and ' + zip2 + ' and also ' + zip3
  );
  const zipSubscription = zipObservable.subscribe(observer);
}

///////////////ZIPITERABLE/////////////////////////////////////////////////////////////////////////////
function zipIterableMethod() {
  const zipIterableArray = [3, 4, 5];
  const zipIterableObservable = Rx.Observable.range(0, 3).zipIterable(
    zipIterableArray,
    (first, second) => first + ' : ' + second
  );
  const zipIterableSubscription = zipIterableObservable.subscribe(observer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
