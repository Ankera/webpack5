import React, { PureComponent } from "react";

// 装饰器为,组件添加age属性
function addAge(Target: Function) {
  Target.prototype.age = 111
}

// 使用装饰圈
@addAge
class Desc extends PureComponent {

  age?: number

  render() {
    return (
      <h2>我是类组件-00--{this.age}</h2>
    )
  }
}

export default Desc
