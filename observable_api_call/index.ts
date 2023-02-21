// import './style.css';

import { Observable } from 'rxjs';

// calling an api
const url = 'https://jsonplaceholder.typicode.com/todos/1';

const observable$ = new Observable((observer) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      observer.next(data);
      observer.complete();
    })
    .catch((error) => observer.error(error));
});

observable$.subscribe({
  next: (data) => console.log(data),
  error: (error) => console.log(error),
});
