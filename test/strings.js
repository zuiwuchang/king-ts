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
    QUnit.test("crypto html", function( assert ) {
        assert.equal(strings.HtmlEncode(""),"",'HtmlEncode("")');
        assert.equal(strings.HtmlDecode(""),"",'HtmlDecode("")');
    
        var old = "include <iostream>\n\'-\"";
        var ok = "include&nbsp;&lt;iostream&gt;\n&#39;-&quot;"
        var en = strings.HtmlEncode(old);
        assert.equal(en,ok,"HtmlEncode " + old);
        var dec = strings.HtmlDecode(en);
        assert.equal(en,ok,"HtmlDecode " + en);
    });
    QUnit.test("crypto html", function( assert ) {
        const format = "2006-01-02 15:04:05"
        let d = new Date(2006,1-1,2,15,4,5)
        let layout = "yyyy-mm-dd HH:MM:SS"
        let str = strings.FormatDate(d,layout)
        assert.equal(str,format,format+ " "+str);
    });
});