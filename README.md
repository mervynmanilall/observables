# observables
This repo will contains examples of observables implementation.

NOTE:
In order to have the examples working, make sure to install RxJs using: npm install rxjs.
Also you need to have a proper environment that supports ESM. 
If you do not want to do any setup locally, you can use stackbliz (https://stackblitz.com/) and select RxJS.

In 'simple_observable', we show that observable streams the data to the observer instead of waiting for everything to complete. We are using the setInterval method for that.

In 'simple_api_call', we are calling an api using observable. To do the api call, we are making use of fetch().

In 'observables_api_chaining', we are using the result of a first api call as parameter to the second api call.
To do the chaining, pipe() and switchMap() are used.