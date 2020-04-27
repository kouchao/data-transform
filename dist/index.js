(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global['data-transform'] = {}));
}(this, (function (exports) { 'use strict';

    // 基础类型
    const $string$1 = Symbol('string');
    const $number = Symbol('number');
    const $undefined = Symbol('undefined');
    const $null = Symbol('null');
    const $array$1 = Symbol('array');
    const $symbol = Symbol('symbol');
    const $object = Symbol('object');

    // 需要的字段
    const $type = Symbol('type');
    const $fields = Symbol('fields');

    var type = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $string: $string$1,
        $number: $number,
        $undefined: $undefined,
        $null: $null,
        $array: $array$1,
        $symbol: $symbol,
        $object: $object,
        $type: $type,
        $fields: $fields
    });

    function isObject(obj){
        return Object.prototype.toString.call(obj) === '[object Object]'
    }

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isObject: isObject
    });

    function getObject(module, data, res) {
        Object.keys(module).forEach(key => {
            if (module[key][$type]) {
                res[key] = getModuleType(module[key], data[key]);
            } else if (module[key] === $string) {
                res[key] = '' + data[key];
            }
        });
    }

    function getArray(module, data, res) {
        
        data.forEach(item => {
            if(module[$fields]) {
                let _item = {};
                Object.keys(module[$fields]).forEach(key => {
                    const { index } = module[$fields][key];
                    _item[key] = item[index < 0 ? item.length + index : index];
                });
                res.push(_item);
            } 
        });
       
        console.log('$array', module, data, res);
    }

    function getModuleType(module, data) {
        let res;
        console.log(module, data);
        // 是一个对象 
        if (isObject(module)) {
            if (module[$type]) {
                // 是一个配置项
                if (module[$type] === $object) {
                    res = Object.create(null);
                    getObject(module, data, res);
                } else if (module[$type] === $array) {
                    res = new Array();
                    getArray(module, data, res);
                }
            }
        }

        return res
    }

    class Data {
        constructor(data, module) {
            this._data = data;
            this._module = module;

            console.log(data);
            console.log(module);
        }

        getValue() {
            console.log(' ----getValue---- ');
            return getModuleType(this._module, this._data)
        }
    }

    var data = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': Data
    });

    exports.Data = data;
    exports.type = type;
    exports.utils = utils;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
