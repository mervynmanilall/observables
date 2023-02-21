// import './style.css';

import { of, map, Observable, switchMap } from 'rxjs';
import { errorContext } from 'rxjs/internal/util/errorContext';

// calling api and chaining
// in this first part we will be only doing the 2 calls to see if nothing is breaking

// ------------- First part: doing the seperate calls
// observable for 1st api call 
const firstObservable$ = new Observable((observer) => {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((data) => {
      observer.next(data);
      observer.complete();
    })
    .catch((error) => console.log('error'));
});

// observable for 2nd api call 
const secondObserver$ = new Observable((observer) => {
  fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    .then((response) => response.json())
    .then((data) => {
      observer.next(data);
      observer.complete();
    })
    .catch((error) => console.log(error));
});

// subscriber for 1st call
console.log("let's get started");
firstObservable$.subscribe({
  next: (data) => console.log('result from 1st: ', data),
  error: (error) => console.log(error),
  complete: () => console.log('1st done'),
});

console.log("let's continue");

// subscriber for 2nd call
secondObserver$.subscribe({
  next: (data) => console.log(data),
  error: (error) => console.log('error'),
  complete: () => console.log('2nd done'),
});

// --------------- 2nd part: Chaining
// chaining
// in this second part we are doing the actual chaining
const chainingObservable$ = firstObservable$.pipe(
  switchMap((data) => {
    return new Observable((observer) => {
      fetch(
        'https://jsonplaceholder.typicode.com/comments?postId=' + data.userId
      )
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => console.log(error));
    });
  })
);

chainingObservable$.subscribe({
  next: (data) => console.log('result from 3rd: ', data),
  error: (error) => console.log('error'),
  complete: () => console.log('3rd done'),
});
