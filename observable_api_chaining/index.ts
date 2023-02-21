// import './style.css';

import { of, map, Observable, switchMap } from 'rxjs';
import { errorContext } from 'rxjs/internal/util/errorContext';

// calling api and chaining
const firstObservable$ = new Observable((observer) => {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((data) => {
      observer.next(data);
      observer.complete();
    })
    .catch((error) => console.log('error'));
});

const secondObserver$ = new Observable((observer) => {
  fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    .then((response) => response.json())
    .then((data) => {
      observer.next(data);
      observer.complete();
    })
    .catch((error) => console.log(error));
});

console.log("let's get started");
firstObservable$.subscribe({
  next: (data) => console.log('result from 1st: ', data),
  error: (error) => console.log(error),
  complete: () => console.log('1st done'),
});

console.log("let's continue");

secondObserver$.subscribe({
  next: (data) => console.log(data),
  error: (error) => console.log('error'),
  complete: () => console.log('2nd done'),
});

// chaining
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
