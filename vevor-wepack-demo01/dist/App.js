var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect } from 'react';
import logo from './assets/11.png';
import Desc from './Desc';
import './App.less';
//@ts-ignore
console.log('NODE_ENV===============', process.env.NODE_ENV);
function App() {
    var func = function () {
        return new Promise(function (resolve, reject) {
            return resolve('666666');
        });
    };
    useEffect(function () {
        var arr = [1, 2, 3, 4, 5];
        func().then(function (data) {
            console.log('=================', data, __spreadArray([], arr, true));
        });
    }, []);
    return (React.createElement("div", { className: 'app' },
        React.createElement("h2", null, "hello react"),
        React.createElement("img", { src: logo, alt: "" }),
        React.createElement(Desc, null)));
}
export default App;
