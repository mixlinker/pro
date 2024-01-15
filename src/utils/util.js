import { message  } from 'ant-design-vue'
const dateObject = {
    'Y': "年",
    'M': '月',
    'D': '天',
    'h': '小时',
    'm': '分钟',
    's': '秒'
}

export default {
    /**
     * 将数组分割成多个小数组
     * @param arr
     * @param size
     * @returns {[]}
     */
    chunk(arr, size) {
        let objArr = [];
        let index = 0;
        let objArrLen = arr.length / size;
        for (let i = 0; i < objArrLen; i++) {
            let arrTemp = [];
            for (let j = 0; j < size; j++) {
                arrTemp[j] = arr[index++];
                if (index === arr.length) {
                    break;
                }
            }
            objArr[i] = arrTemp;
        }
        return objArr;
    },

    /**
     *  解析地址栏参数
     * @param name
     * @returns {string}
     */

    getQueryVariable(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        let r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },

    getHashVariable(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        let r = window.location.hash.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },

    parseVersion(str) {
        let reg = /version\s*=\s*\"([\w\.]+)\"/;
        let match = str.match(reg)
        if (match.length > 1) {
            return match[1]
        }
        return ""
    },
    /**
     *  根据某一列的值合并两个数组
     * @param originArr
     * @param replaceArr
     * @param key
     * @returns {*}
     */
    arrayMergeByKey(originArr, replaceArr, key) {

        for (let index in originArr) {
            for (let val of replaceArr) {
                if (originArr[index][key] === val[key]) {
                    originArr[index] = val
                    break
                }
            }
        }
        return originArr;
    },

    /**
     * 万能判断
     * @param $obj
     * @returns string
     */
    gettype($obj) {
        return Object.prototype.toString.call($obj).slice(8, -1).toLowerCase()
    },
    /**
     *  找出树形结构的数组内，某列key的值等于value的元素， 并返回到tmp中
     * @param tmp
     * @param value
     * @param tree
     * @param key
     * @param childKey
     */
    findItemBy(tmp = [], value, tree, key, childKey = 'children') {
        for (let v of tree) {
            if (v[childKey]) {
                this.findItemBy(tmp, value, v[childKey], key)
            }
            if (v[key] === value) {
                tmp.push(v)
                break
            }
        }
    },
    isJSON(str) {
        if (typeof str == 'string') {
            try {
                let obj = JSON.parse(str);
                if (typeof obj == 'object' && obj) {
                    return true;
                } else {
                    return false;
                }

            } catch (e) {
                return false;
            }
        }
        return false;
    },
    compute(item, condition) {
        if (!condition) {
            return true;
        }
        if (!condition.searchString) {
            return true;
        }
        let compareValue = String(item[condition.searchOptionValue]);
        if (condition.conditionOptionValue === 'like') {
            return compareValue.indexOf(condition.searchString) > -1
        }
        let compareWay = condition.conditionOptionValue;
        if (compareWay === '=') {
            compareWay = '==';
        }
        return eval(compareValue + compareWay + condition.searchString)
    },
    isTrue(val) {
        let result = false;
        if (val || val === 0 || val === '0') {
            result = true
        }
        return result
    },
    isNumber(val) {
        return typeof val === 'number' && !isNaN(val);
    },

    /**
     *  将一维数组arr 按照size 切割成二维数组
     * @param arr
     * @param size
     * @returns {*[]}
     */
    arrayChunk(arr, size) {
        let temp = []
        for (let i = 0; i < Math.ceil(arr.length / size); i++) {
            let start = i * size;
            let end = start + size;
            temp.push(arr.slice(start, end));
        }
        return temp
    },
    /**
     * 解析json格式的脚本，返回json对象
     * @param script
     * @param that
     * @returns code_obj
     */
    handleScript(script, that) {
        let code_obj = null
        try {
            code_obj = eval("let code = " + script + ";code")
        } catch (e) {
            that.$message.error('字段脚本解析错误，请检查')
        }
        return code_obj
    },

    formatTimerTime(time) {
        if (!time) {
            return {time: '', unit: 'h'};
        }
        let time_list = time.split('');
        let year = 0;
        let month = 0;
        let day = 0;
        let hour = 0;
        let min = 0;
        let sec = 0;
        let temp = '';
        time_list.forEach(function (item, index) {
            switch (item) {
                case 'Y':
                    year = parseInt(temp);
                    temp = '';
                    break;
                case 'M':
                    month = parseInt(temp);
                    temp = '';
                    break;
                case 'D':
                    day = parseInt(temp);
                    temp = '';
                    break;
                case 'h':
                    hour = parseInt(temp);
                    temp = '';
                    break;
                case 'm':
                    min = parseInt(temp);
                    temp = '';
                    break;
                case 's':
                    sec = parseInt(temp);
                    temp = '';
                    break;
                default:
                    temp = temp + item;
            }
        });
        if (hour > 0) {
            year = parseInt(hour / 8760);
            month = parseInt(hour / 720);
            day = parseInt(hour / 24);
        }
        if (year > 0) {
            return year + dateObject.Y;
        } else if (month > 0) {
            return month + dateObject.M;
        } else if (day > 0) {
            return day + dateObject.D;
        } else if (hour > 0) {
            return hour + dateObject.h;
        } else if (min > 0) {
            return min + dateObject.m;
        } else if (sec > 0) {
            return sec + dateObject.s;
        } else {
            return hour + dateObject.h;
        }
    },
    setAdditionType(val){
        let result = "self";
        if(val && Object.keys(val).includes('table') && Object.keys(val).includes('create') && Object.keys(val).includes('update') && Object.keys(val).includes('view')){
            result = 'tableman'
        }
        return result
    },
    //对象扩展字段与
    setCustomAddition(newVal, oldVal){
        let oldObj = {};
        let result = JSON.parse(JSON.stringify(newVal));
        try {
            oldVal.forEach(ele => {
                oldObj[ele.title] = {};
                ele.data.forEach(item => {
                    oldObj[ele.title][item[0]] = item[1]
                })
            })
        }catch (e) {
            result = JSON.parse(JSON.stringify(newVal))
        }
        try{
            result.forEach(ele => {
                ele.data.forEach(item => {
                    if(oldObj[ele.title]){
                        item[1] = item[1] || oldObj[ele.title][item[0]]
                    }
                })
            })
        }catch (e) {
            result = []
        }
        return result
    },

    //验证映射表扩展字段格式,data必须为数组，子项中必须有title，data,data长度不超过2
    checkAddition(data) {
        let result = true;
        if(data === '[]') return true
        //保存时addition是字符串形式JSON，后台返回addition是数组形式JSON
        try{
            data = JSON.parse(data)
        }catch (e) {
            data = data
        }
        //当addition格式不符合要求时返回false，前端报错提醒
        console.log(data,'data')
        try {
            data.forEach(ele => {
                if(!ele.title || !ele.data){
                    result = false
                }else{
                    ele.data.forEach(item => {
                        if(!item[0] || item.length > 2){
                            result = false
                        }
                    })
                }
            })
        }catch (e) {
            result = false
        }
        return result
    },

    //处理数值映射数据
    handle_init_data(val, params){
        let mapping = {}
        params.data.forEach(ele => {
            mapping[ele.value] = ele
        })
        return mapping[val] ?? params.other
    },

    //处理区间映射数据
    handle_range_data(val, params){
        let result = {}
        if(val !== 0 && !val){
            result = params.other
        }else{
            params.data.forEach(ele => {
                if(eval(`${val}${ele.value[0]}${ele.value[1]}`) && eval(`${val}${ele.value[2]}${ele.value[3]}`)){
                    result['text'] = ele.text
                    result['color'] = ele.color
                }
            })
        }
        if(!Object.keys(result).length){
            result = params.other
        }

        return result
    },

    //比较对象数组基于上次增加/删除
    compare_array(oldArr, newArr, oldObjArr, newObjArr){
        let objMapping = {};
        [...newObjArr, ...oldObjArr].forEach(ele => {
            if(!objMapping[ele.uid]){
                objMapping[ele.uid] = ele
            }
        })
        let resObj = {
            add: [],
            del: []
        };
        //获取增加的元素
        for(let i = 0; i < newArr.length; i++){
            if(!oldArr.includes(newArr[i])){
                resObj.add.push(objMapping[newArr[i]])
            }
        }
        //获取删除的元素
        for(let i = 0; i < oldArr.length; i++){
            if(!newArr.includes(oldArr[i])){
                resObj.del.push(objMapping[oldArr[i]])
            }
        }
        return resObj;
    },
}
