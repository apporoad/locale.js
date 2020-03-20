
const utils = require('lisa.utils')
var language =null
var getCurrentLang = (lang)=>{
    return (lang || language || process.env.LOCAL_LANG || process.env.LANG || 'default').toLowerCase()
}

function getHashCode(str,caseSensitive){
    if(!caseSensitive){
        str = str.toLowerCase();
    }
    var hash  =   1315423911,i,ch;
    for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= ((hash << 5) + ch + (hash >> 2));
    }
    return  (hash & 0x7FFFFFFF);
}


const cache = {}

function get(str,lang){
    lang = getCurrentLang(lang)
    if(!cache[lang]) return str
    var hash = getHashCode(str)
    var map = cache[lang]
    if(map.has(hash)){
        var arry= map.get(hash)
        for(var i=0;i<arry.length;i++){
            if(arry[i][0] == str){
                return arry[i][1]
            }
        }
    }
    return str
}

function set(arrayOrJson,lang){
    if(!arrayOrJson) return
    lang = getCurrentLang(lang)
    var array = []
    if(arrayOrJson.constructor === Array&& arrayOrJson.length>0){
        if(arrayOrJson[0].constructor !=Array){
            setOne(arrayOrJson,lang)
        }else{
            arrayOrJson.forEach(element => {
                setOne(element,lang)
            });
        }
    } else if(typeof arrayOrJson == 'object'){
        for(key in arrayOrJson){
            if(key && arrayOrJson[key]){
                setOne([key,arrayOrJson[key]],lang)
            }
        }
    }
}

function setOne(arry ,lang){
    if(arry && arry.length && arry.length==2 && typeof(arry[0]) =='string' && typeof(arry[1]) =='string'){
        if(!cache[lang]){
            cache[lang] = new Map()
        }
        var originStr = arry[0].trim()
        if(!originStr) return
        var map = cache[lang]
        var hash = getHashCode(originStr)
        var storedArray = []
        if(map.has(hash)){
            storedArray = map.get(hash)
        }
        storedArray = utils.ArrayRemove(storedArray,arry,(a,b)=>{ return a[0]==b[0]})
        storedArray.push(arry)
        map.set(hash,storedArray)
    }
}

function Locale(str,lang){
    str = str.trim()
    return get(str,lang)
}

Locale.setLanguage = lang=>{
    language=lang
}

Locale.get =(str,lang) =>{
    return get(str,lang)
}
Locale.set =  (arrayOrJson,lang) =>{
    set(arrayOrJson,lang)
}

module.exports = Locale


String.prototype.toLocale = function(lang){
    return Locale(this,lang)
}
String.prototype.locale = function(lang){
    return Locale(this,lang)
}
String.prototype.l = function(lang){
    return Locale(this,lang)
}
