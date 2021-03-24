const message: string = 'jack';

const printFun = (str: string) => {
  console.log(str);
};

const resPromise = new Promise((resolve, reject) => {
  if (message === 'jack') {
    resolve('ok');
  } else {
    reject();
  }
});

resPromise.then();

printFun(message);
