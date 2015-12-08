'use strict';

var reg;
var sub;
var isSubscribed = false;
var subscribeButton = document.querySelector('button');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function () {
    return navigator.serviceWorker.ready;
  }).then(function (swreg) {
      reg = swreg;
      subscribeButton.disabled = false;
  }).catch(function (error) {

  });
}

subscribeButton.addEventListener('click', function () {
    if (isSubscribed) {
        unsubscribe();
    } else {
        subscribe();
    }
});

function subscribe() {
    reg.pushManager.subscribe({ userVisibleOnly : true }).then(function (pushsub) {
        sub = pushsub;
        subscribeButton.textContent = 'Un-Subscribe';
        isSubscribed = true;
    });
}

function unsubscribe() {
    sub.unsubscribe().then(function (event) {
        subscribeButton.textContent = 'Subscribe';
        isSubscribed = false;
    }).catch(function (error) {
        subscribeButton.textContent = 'Subscribe';
    });
}
