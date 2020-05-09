const T = require('../')

QUnit.test("test basic", function (assert) {
    assert.ok(T('str1') == 'str1', "Passed!")
    assert.ok('str2'.l() == 'str2', "Passed!")
    assert.ok(T.get('str3') == 'str3', "Passed!")
})

QUnit.test("test main", function (assert) {
    T.set(["str1", "here is str1"])
    T.set(["str2", "here is str2"])
    T.set([
        ["str2", "here is str2 oh"],
        ["str3", "here is str3 oh"],
        ["str4", "here is str4 oh"]
    ])
    T.set({
        str4: 'here is str4 json',
        str5: 'here is str5 json'
    })
    T.set(["str1", "字符串1"], 'cn')
    T.set(["str2", "字符串2"], 'cn')
    T.set([
        ["str2", "字符串2 oh"],
        ["str3", "字符串3 oh"],
        ["str4", "字符串4 oh"]
    ], 'cn')
    T.set({
        str4: '字符串4 json',
        str5: '字符串5 json'
    }, 'cn')

    assert.ok(T('str1') == 'here is str1', "Passed!")
    assert.ok('str2'.l() == 'here is str2', "Passed!")
    assert.ok('str3'.locale() == 'here is str3 oh', "Passed!")
    assert.ok(T.get('str4') == 'here is str4 oh', "Passed!")
    assert.ok('str5'.toLocale() == 'here is str5 json', "Passed!")
    assert.ok('str6'.toLocale() == 'str6', "Passed!")

    T.setLanguage('cn')

    assert.ok(T('str1') == '字符串1', "Passed!")
    assert.ok('str2'.l() == '字符串2', "Passed!")
    assert.ok('str3'.locale() == '字符串3 oh', "Passed!")
    assert.ok(T.get('str4') == '字符串4 oh', "Passed!")
    assert.ok('str5'.toLocale() == '字符串5 json', "Passed!")
    assert.ok('str6'.toLocale() == 'str6', "Passed!")

    T.setLanguage()

    assert.ok(T('str1') == 'here is str1', "Passed!")
    assert.ok('str2'.l() == 'here is str2', "Passed!")
    assert.ok('str3'.locale() == 'here is str3 oh', "Passed!")
    assert.ok(T.get('str4') == 'here is str4 oh', "Passed!")
    assert.ok('str5'.toLocale() == 'here is str5 json', "Passed!")
    assert.ok('str6'.toLocale() == 'str6', "Passed!")

    T.set({
        fn: hello => {
            console.log(`${hello} world`)
            return '..'
        }
    })

    assert.ok('fn'.toLocale()() == '..', "Passed!")
})



QUnit.test("test esay set", function (assert) {
    T.set('aaa', 'abc')

    assert.ok(T('aaa') == 'abc', "Passed!")
})

QUnit.test("test code locale", function (assert) {
    T.set('aaa', 'abc')

    assert.ok(T('aaa') == 'abc', "Passed!")
})

