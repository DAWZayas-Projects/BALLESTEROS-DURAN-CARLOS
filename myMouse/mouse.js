const addItemToTopOfDiv = (item, divName) => {
  let div = document.getElementById(divName);
  div.innerHTML = item + '<br/>' + div.innerHTML;
};

const mouseObservable = Rx.Observable
  .fromEvent(document, 'mousemove')
  .map(event => 'X-axis: ' + event.clientX + ', Y-axis: ' + event.clientY)
  .pausable(); // or .pausableBuffered()

const buttonObservable = Rx.Observable
  .fromEvent(button, 'click')
  .scan((accumulator, item) => accumulator + 1, 0)
  .map(x => x % 2 === 0);

const disposeObservable = Rx.Observable
  .fromEvent(moves, 'click')
  .first();

const pauseRestart = bool => bool ? mouseObservable.pause() : mouseObservable.resume();

const mouse = () => {
  const buttonSubscription = buttonObservable
    .subscribe(bool => pauseRestart(bool));

  const mouseSubscription = mouseObservable
    .subscribe(text => addItemToTopOfDiv(text, 'moves'));

  const disposeSubscription = disposeObservable
    .subscribe(() => mouseSubscription.dispose());
}

mouse();
