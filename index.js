const utils = require('lisa.utils')
const uType = utils.Type
var language = null
const cache = {}
const matchers = {}

var getCurrentLang = (lang) => {
    return (lang || language || process.env.LOCAL_LANG || process.env.LANG || 'default').toLowerCase()
}

/*
    {
        action : '提示',
        actions 
        params : [ ,]
        param
        raw : '',
        tags :[]
        tag	
    }
*/
var isMatchObject = (matcher) => {
    if (uType.isObject(matcher)) {
        var keys = ['action','actions','param','params','tags','tag']
        for (key in matcher) {
            if(!utils.ArrayContains(keys,key)){
                return false
            }
        }
        return true
    }
    return false
}

function getHashCode(str, caseSensitive) {
    if (!caseSensitive) {
        str = str.toLowerCase();
    }
    var hash = 1315423911,
        i, ch;
    for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= ((hash << 5) + ch + (hash >> 2));
    }
    return (hash & 0x7FFFFFFF);
}

function get(str, lang) {
    lang = getCurrentLang(lang)
    if (!cache[lang]) return str
    var hash = getHashCode(str)
    var map = cache[lang]
    if (map.has(hash)) {
        var arry = map.get(hash)
        for (var i = 0; i < arry.length; i++) {
            if (arry[i][0] == str) {
                return arry[i][1]
            }
        }
    }
    return null
}

function set(arrayOrJson, langOrValue, lang) {
    if (!arrayOrJson) return
    var ilang = getCurrentLang(lang || langOrValue)
    if (uType.isString(arrayOrJson)) {
        ilang = getCurrentLang(lang)
        setOne([arrayOrJson, langOrValue], ilang)
    } else if (arrayOrJson.constructor === Array && arrayOrJson.length > 0) {
        if (arrayOrJson[0].constructor != Array) {
            setOne(arrayOrJson, ilang)
        } else {
            arrayOrJson.forEach(element => {
                setOne(element, ilang)
            });
        }
    } else {
        if(isMatchObject(arrayOrJson) ||uType.isRegExp(arrayOrJson) || uType.isFunction(arrayOrJson) || uType.isAsyncFunction(arrayOrJson)){
            ilang = getCurrentLang(lang)
            matchers[ilang] = matchers[ilang] || []
            matchers.push({
                match: arrayOrJson,
                value: langOrValue
            })
        }
        else if (uType.isObject(arrayOrJson)) {
            for (key in arrayOrJson) {
                if (key && arrayOrJson[key]) {
                    setOne([key, arrayOrJson[key]], ilang)
                }
            }
        }
    }


}

function setOne(arry, lang) {
    //typeof(arry[1]) =='string'
    if (arry && arry.length && arry.length == 2 && typeof (arry[0]) == 'string') {
        if (!cache[lang]) {
            cache[lang] = new Map()
        }
        var originStr = arry[0].trim()
        if (!originStr) return
        var map = cache[lang]
        var hash = getHashCode(originStr)
        var storedArray = []
        if (map.has(hash)) {
            storedArray = map.get(hash)
        }
        storedArray = utils.ArrayRemove(storedArray, arry, (a, b) => {
            return a[0] == b[0]
        })
        storedArray.push(arry)
        map.set(hash, storedArray)
    }
}



var innerGet = (str,lang)=>{
    var  r  = get(str,lang)
    //todo 

    return r || str
}
function Locale(str, lang) {
    return innerGet(str,lang)
}

Locale.setLanguage = lang => {
    language = lang
}

Locale.get = (str, lang) => {
    return innerGet(str,lang)
}
Locale.set = (arrayOrJson, langOrValue, lang) => {
    set(arrayOrJson, langOrValue, lang)
}

Locale.match = (pattern, raw) => {
    //todo
}

module.exports = Locale


String.prototype.toLocale = function (lang) {
    return Locale(this, lang)
}
String.prototype.locale = function (lang) {
    return Locale(this, lang)
}
String.prototype.l = function (lang) {
    return Locale(this, lang)
}