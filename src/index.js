function getModuleType(module) {
  // object or options
  // if(typeof module === 'object') {
    console.log(module)
    console.log(module[$type] === $object)
  // }
}
class Data{
  constructor(data, module){
    this._data = data
    this._module = module

    console.log(data)
    console.log(module)
  }

  getValue(){
    console.log(' ----getValue---- ')
    console.log(typeof data)
    getModuleType(this._module)
  }
}