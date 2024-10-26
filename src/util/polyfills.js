if (typeof Promise === "undefined" && !window.Promise) {
    console.log(window.Promise)
  // 定义一个基本的Promise实现
  var Promise = function (executor) {
    var self = this;
    self.state = "pending"; // 初始状态为pending
    self.value = undefined; // 成功的结果
    self.reason = undefined; // 失败的原因
    self.onFulfilledCallbacks = []; // 成功时的回调函数数组
    self.onRejectedCallbacks = []; // 失败时的回调函数数组

    // 立即执行executor函数，并传入resolve和reject函数
    var resolve = function (value) {
      if (self.state === "pending") {
        self.state = "fulfilled";
        self.value = value;
        self.onFulfilledCallbacks.forEach(function (fn) {
          fn();
        });
      }
    };

    var reject = function (reason) {
      if (self.state === "pending") {
        self.state = "rejected";
        self.reason = reason;
        self.onRejectedCallbacks.forEach(function (fn) {
          fn();
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  };

  // then方法，用于注册成功和失败的回调函数，并返回一个新的Promise
  Promise.prototype.then = function (onFulfilled, onRejected) {
    var self = this;
    return new Promise(function (resolve, reject) {
      // 处理成功回调
      function handleOnFulfilled() {
        var result;
        try {
          result = onFulfilled(self.value);
        } catch (error) {
          return reject(error);
        }
        resolve(result);
      }

      // 处理失败回调
      function handleOnRejected() {
        var result;
        try {
          result = onRejected(self.reason);
        } catch (error) {
          return reject(error);
        }
        resolve(result);
      }

      // 根据当前Promise的状态执行相应的回调
      if (self.state === "fulfilled") {
        setTimeout(handleOnFulfilled, 0);
      } else if (self.state === "rejected") {
        setTimeout(handleOnRejected, 0);
      } else {
        // 如果Promise还在pending状态，则添加回调到相应的数组
        self.onFulfilledCallbacks.push(function () {
          setTimeout(handleOnFulfilled, 0);
        });
        self.onRejectedCallbacks.push(function () {
          setTimeout(handleOnRejected, 0);
        });
      }
    });
  };

  // catch方法，用于注册失败的回调函数，并返回一个新的Promise
  Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
  };

  // 静态resolve方法，返回一个已经解决的Promise
  Promise.resolve = function (value) {
    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  // 静态reject方法，返回一个已经拒绝的Promise
  Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
      reject(reason);
    });
  };

  // 静态all方法，接受一个Promise数组，当所有Promise都成功时返回一个新的Promise，其结果为所有成功Promise的结果数组
  Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
      var results = [];
      var count = 0;

      promises.forEach(function (promise, index) {
        Promise.resolve(promise).then(function (value) {
          results[index] = value;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        }, reject);
      });
    });
  };

  // 静态race方法，接受一个Promise数组，返回第一个解决或拒绝的Promise的结果
  Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
      promises.forEach(function (promise) {
        Promise.resolve(promise).then(resolve, reject);
      });
    });
  };
  window.Promise = Promise;
}

(function () {
  Object.setPrototypeOf =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);

  function setProtoOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }

  function mixinProperties(obj, proto) {
    for (const prop in proto) {
      if (!obj.hasOwnProperty(prop)) {
        obj[prop] = proto[prop];
      }
    }
    return obj;
  }
})();

window.history.replaceState = window.history.replaceState || function () {};
