import React, { PureComponent } from "react";
import styles from './Desc.less';
import '@/common/css/base.css';

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
      <div className={styles.desc}>
        我是类组件-00--{this.age}

        <hr />
        <div className='common'>common</div>
      </div>
    )
  }
}

export default Desc
