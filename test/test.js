const T = require('../')

QUnit.test( "test basic", function( assert ) {
  assert.ok(T('str1') == 'str1', "Passed!" )
  assert.ok('str2'.l() == 'str2', "Passed!" )
  assert.ok(T.get('str3') == 'str3', "Passed!" )
})

QUnit.test( "test main", function( assert ) {
    T.set(["str1","here is str1"])
    T.set(["str2","here is str2"])
    T.set([["str2","here is str2 oh"] , ["str3","here is str3 oh"], ["str4","here is str4 oh"]])
    T.set({
        str4: 'here is str4 json',
        str5: 'here is str5 json'
    })
    T.set(["str1","字符串1"],'cn')
    T.set(["str2","字符串2"],'cn')
    T.set([["str2","字符串2 oh"] , ["str3","字符串3 oh"], ["str4","字符串4 oh"]],'cn')
    T.set({
        str4: '字符串4 json',
        str5: '字符串5 json'
    },'cn')

    assert.ok(T('str1') == 'here is str1', "Passed!" )
    assert.ok('str2'.l() == 'here is str2', "Passed!" )
    assert.ok('str3'.locale() == 'here is str3 oh', "Passed!" )
    assert.ok(T.get('str4') == 'here is str4 oh', "Passed!" )
    assert.ok('str5'.toLocale() == 'here is str5 json', "Passed!" )
    assert.ok('str6'.toLocale() == 'str6', "Passed!" )

    T.setLanguage('cn')

    assert.ok( T('str1') == '字符串1', "Passed!" )
    assert.ok( 'str2'.l() == '字符串2', "Passed!" )
    assert.ok( 'str3'.locale() == '字符串3 oh', "Passed!" )
    assert.ok( T.get('str4') == '字符串4 oh', "Passed!" )
    assert.ok( 'str5'.toLocale() == '字符串5 json', "Passed!" )
    assert.ok( 'str6'.toLocale() == 'str6', "Passed!" )

    T.setLanguage()
})



// T.setLanguage()

// console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
// console.log(T('str1'))
// console.log('str2'.l())
// console.log('str3'.locale())
// console.log(T.get('str4'))
// console.log('str5'.toLocale())
// console.log('str6'.toLocale())


// T.set({
//     fn : hello=>{ console.log(`${hello} world`)
//         return '..'
//     }
// })


// console.log('fn'.l()('hi'))


// console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

