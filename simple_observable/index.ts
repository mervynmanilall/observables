// demo 1
// import './style.css';

import { Observable } from 'rxjs';

const onservable$ = new Observable((observer) => {
  let count = 0;
  const intervalId = setInterval(() => {
    observer.next(count);
    count++;
    if (count > 5) {
      observer.complete();
      clearInterval(intervalId);
    }
  }, 2000);
});

onservable$.subscribe({
  next: (data) => console.log(data),
  error: (error) => console.log(error),
});
