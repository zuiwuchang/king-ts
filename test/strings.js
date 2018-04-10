define(["king/strings"], function() {
    'use strict';
    let strings = require("king/strings")
    
    QUnit.module ("strings")
    
    QUnit.test( "IsIPv4", function( assert ) {
		assert.ok(strings.IsIPv4("127.0.0.1"),"true 127.0.0.1");
        assert.ok(strings.IsIPv4("0.0.0.0"),"true 0.0.0.0");
        assert.ok(strings.IsIPv4("255.255.255.255"),"true 255.255.255.255");

        assert.notOk(strings.IsIPv4("127.0.0.256"),"false 127.0.0.256");
        assert.notOk(strings.IsIPv4("127.a.0.1"),"false 127.a.0.1");
        assert.notOk(strings.IsIPv4("127.00.0.1"),"false 127.00.0.1");
        assert.notOk(strings.IsIPv4("127.0.0.0.1"),"false 127.0.0.0.1");

        assert.notOk(strings.IsIPv4(1),"false 1");
        assert.notOk(strings.IsIPv4(),"false undefined");
    });

    QUnit.test( "MatchGMail", function( assert ) {
        let rs = strings.MatchGMailRS;

        var str = "king.zuiwuchang@gmail.com"
        assert.equal(strings.MatchGMail(str),rs.Success,"Success " + str);
        str = "zuiwuchang@--kl._.1.com"
        assert.equal(strings.MatchGMail(str),rs.Success,"Success " + str);
    
        str = "zuiwuchang@"
        assert.equal(strings.MatchGMail(str),rs.SplitLess,"SplitLess " + str);
        str = "zuiwuch@ang@"
        assert.equal(strings.MatchGMail(str),rs.SplitLarge,"SplitLarge " + str);
        str = ".zuiwuch@ang"
        assert.equal(strings.MatchGMail(str),rs.BadBegin,"BadBegin " + str);
        str = "1234567890123456789012345678901@ang"
        assert.equal(strings.MatchGMail(str),rs.LenLarge,"LenLarge " + str);
        str = "king@ang"
        assert.equal(strings.MatchGMail(str),rs.LenLess,"LenLess " + str);
        str = "k.i.n.g@ang"
        assert.equal(strings.MatchGMail(str),rs.LenLess,"LenLess " + str);
        str = "zuiwuch.@ang"
        assert.equal(strings.MatchGMail(str),rs.BadEnd,"BadEnd " + str);
        str = "zuiwu..ch@ang"
        assert.equal(strings.MatchGMail(str),rs.PointLink,"PointLink " + str);
    
        str = "zuiwuchang@kl..1.com"
        assert.equal(strings.MatchGMail(str),rs.BadHost,"BadHost " + str);
        
        str = "zuiwuchang@.kl.1.com"
        assert.equal(strings.MatchGMail(str),rs.BadHost,"BadHost " + str);
    });
});