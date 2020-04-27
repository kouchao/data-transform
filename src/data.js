import { $type, $object, $fields } from './type'
import { isObject } from './utils'

function getObject(module, data, res) {
    Object.keys(module).forEach(key => {
        if (module[key][$type]) {
            res[key] = getModuleType(module[key], data[key])
        } else if (module[key] === $string) {
            res[key] = '' + data[key]
        }
    })
}

function getArray(module, data, res) {
    
    data.forEach(item => {
        if(module[$fields]) {
            let _item = {}
            Object.keys(module[$fields]).forEach(key => {
                const { index } = module[$fields][key]
                _item[key] = item[index < 0 ? item.length + index : index]
            })
            res.push(_item)
        } 
    })
   
    console.log('$array', module, data, res)
}

function getModuleType(module, data) {
    let res
    console.log(module, data)
    // 是一个对象 
    if (isObject(module)) {
        if (module[$type]) {
            // 是一个配置项
            if (module[$type] === $object) {
                res = Object.create(null)
                getObject(module, data, res)
            } else if (module[$type] === $array) {
                res = new Array()
                getArray(module, data, res)
            }
        } else {
            // 是一个普通对象
        }
    }

    return res
}

class Data {
    constructor(data, module) {
        this._data = data
        this._module = module

        console.log(data)
        console.log(module)
    }

    getValue() {
        console.log(' ----getValue---- ')
        return getModuleType(this._module, this._data)
    }
}

export default Data