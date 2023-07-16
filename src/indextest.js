const name = "tom22"

console.log('__WEBPACK__EN2236V', __WEBPACK__ENV)


const render = () => {
    const title = require('./title.js')
    
    root.innerHTML = title;
}

render()

if(module.hot){
    module.hot.accept(['./title.js'], render)
}