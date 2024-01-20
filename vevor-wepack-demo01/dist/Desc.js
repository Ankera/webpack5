var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { PureComponent } from "react";
// 装饰器为,组件添加age属性
function addAge(Target) {
    Target.prototype.age = 111;
}
// 使用装饰圈
var Desc = /** @class */ (function (_super) {
    __extends(Desc, _super);
    function Desc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Desc.prototype.render = function () {
        return (React.createElement("h2", null,
            "\u6211\u662F\u7C7B\u7EC4\u4EF6---",
            this.age));
    };
    Desc = __decorate([
        addAge
    ], Desc);
    return Desc;
}(PureComponent));
export default Desc;
