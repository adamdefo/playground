const app = document.getElementById('app');
const hexInput = document.getElementById('hex-color');
const hex = document.getElementById('hex');
const rgbInput = document.getElementById('rgb-color');
const rgb = document.getElementById('rgb');
const convert = document.getElementById('convert');

function checkHex(hex) {
  const hexRegex = /^[#]*([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
  if (hexRegex.test(hex)) {
    return true;
  }
}

function modifyHex(hex) {
  if (hex.length == 4) {
    hex = hex.replace('#', '');
  }
  if (hex.length == 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return hex;
}

function hexToRgb(hex) {
  let res = [];
  hex = hex.toUpperCase().replace('#', '')

  if (hex.length != 6) {
    hex = modifyHex(hex)
  }
  res.push(parseInt(hex.slice(0, 2), 16))
  res.push(parseInt(hex.slice(2, 4), 16))
  res.push(parseInt(hex.slice(4, 6), 16))
  return "rgb(" + res.toString() + ")"
}

function rgbToHex(rgb) {
  let res = rgb.match(/\d+/g).map(function(x) {
    return parseInt(x).toString(16).padStart(2, '0')
  });
  return res.join('').toUpperCase()
}

function addPound(x) {
  return '#' + x;
}

function colorToLight(hex, lum) {
  hex = hex.toUpperCase().replace('#', '')
  lum = lum || 0;
  // convert to decimal and change luminosity
  let rgb = '#', c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb.toUpperCase();
}

convert.addEventListener('click', function() {
  // let color = hexInput.value

  // #b8f1d0

  let color = '#E95653';
  hexInput.value = color;



  if (checkHex(color)) {
    color = modifyHex(color);

    let lightColor = colorToLight(color, 0.4);
    rgbInput.value = lightColor;

    // rgbInput.value = hexToRgb(color);

    hex.style.backgroundColor = color;
    // rgb.style.backgroundColor = hexToRgb(color);
    rgb.style.backgroundColor = lightColor;
  }
});


// setTimeout(() => {
//   console.log('1')
//   setTimeout(() => {
//     console.log('2')
//   },1000);
// });

// console.log('44')

// setTimeout(() => {
//   console.log('3')
// },500);


/**
 * Нужно написать функцию get. На вход функция принимает объект и путь до поля объекта. 
 * Путь – это строка, разделенная точкой. Функция должна вернуть соответствующее поле объекта. 
 * Запрашиваемого поля в объекте может не быть.
 */
 

function get(obj, path) {
  // const pathArr = path.split('.');
  // const temp = [];
  // let counter = 0;
  // let result;

  // temp.push(obj[pathArr[counter]]);
  // while (temp.length > 0) {
  //   counter++;
  //   const shift = temp.shift();
  //   if (pathArr[counter] && shift[pathArr[counter]] && counter < pathArr.length) {
  //     temp.push(shift[pathArr[counter]]);
  //     result = shift[pathArr[counter]];
  //   }
  // }
  // console.log(result)

  const pathArr = path.split('.');
  var result;

  if (pathArr.length) {
    let o = obj[pathArr[0]];
    if (o) {
      const shift = pathArr.shift();
      // console.log(pathArr);
      if (pathArr.length) {
        // console.log(pathArr.join('.'));
        get(o, pathArr.join('.'));
      } else {
        console.log(o);
      }
    } else {
      console.log(o);
    }
  }

  return result;
}

const obj = { 
  a: { 
    b: { 
      c: 'd' 
    },
    e: 'f'
  }
};

get(obj, 'a.b');   // { c : 'd' }
// get(obj, 'a.b.c'); // 'd'
// get(obj, 'a.e');   // 'f'
// get(obj, 'a.x.e'); // undefined


function MyClass() {
  this.a = 'a';
  this.b = 'b';

  this.show = function() {
    console.log(this.a);
  }
}

MyClass.prototype.show = function() {
  console.log('rr');
};

var my = new MyClass();

MyClass.prototype.show = function() {
  alert(this.a);
}

my.show();

const foo = function() {
  console.log('start foo')
  return new Promise((resolve, reject) => {
    console.log('1')
    resolve(
      new Promise(resolve => {
        return resolve(
          new Promise(resolve => {
            resolve('3');
          })
        )
      })
    );
    console.log('rr')
  });
}
// foo().then(res => {
//   console.log(res);
// })

const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

const reverseArr1 = (inputArr) => {
  for (let i = 0; i < inputArr.length; i++) {
    if (i > 0) {
      let removed = inputArr.splice(i, 1).join();
      inputArr.unshift(removed);
    }
  }
  return inputArr;
}
// console.log(reverseArr1(arr))

const reverseArr2 = (inputArr) => {
  let res = [];
  for(let i = inputArr.length - 1; i >= 0; i--) {
    res.push(inputArr[i]);
  }
  return res;
}
// console.log(reverseArr2(arr))


const reverseArr3 = (array) => {
  let i = 0;
  let j = array.length - 1;

  while (i < j) {
      const swap = array[i];
      array[i++] = array[j];
      array[j--] = swap;
  }

  return array;
}


/**
 * поменять местами значения(числоы) переменных
 */
// let a = 5;
// let b = 7;
// a += b;
// b = a - b;
// a -= b;
// console.log(a,b);

/**
 * поменять местами значения(любого типа) переменных 
 */
// let a = 'a';
// let b = 'b';
// let c = b;
// b = a;
// a = c;
// console.log(a, b);

/**
 * меняет местами элементы в массиве
 */
const swap = (arr, a, b) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  return arr;
}
// swap(arr, 1, 3)
console.log(arr.lastIndexOf('f'));


function Animal() {
  this.sleep = function () {
    alert('animal sleeping');
  };

  this.eat = function () {
    alert('animal eating');
  };
}

function Dog() {
  this.eat = function () {
    alert('Dog eating');
  };
}

// Dog.prototype.eat = 'eat';
// var d = new Dog();
// console.log(d.eat)


function Graph(a) {
  this.vertexes = [];
  this.edges = [];

  console.log(a)
}

Graph.call(this, 'dd');

// Graph.prototype.addVertex = function(v) {
//   this.vertexes.push(v);
// }

var g = new Graph();
g.vertexes = 'vertexes';

// g.addVertex('qq');
console.log(g.vertexes)
