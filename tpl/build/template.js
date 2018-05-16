
/*TMODJS:{"version":"1.0.0"}*/ ! function() {
    function a(a, b) {
        return (/string|function/.test(typeof b) ? h : g)(a, b)
    }

    function b(a, c) {
        return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
    }

    function c(a) {
        return l[a]
    }

    function d(a) {
        return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
    }

    function e(a, b) {
        if (m(a))
            for (var c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
        else
            for (c in a) b.call(a, a[c], c)
    }

    function f(a, b) {
        var c = /(\/)[^/]+\1\.\.\1/,
            d = ("./" + a).replace(/[^/]+$/, ""),
            e = d + b;
        for (e = e.replace(/\/\.\//g, "/"); e.match(c);) e = e.replace(c, "/");
        return e
    }

    function g(b, c) {
        var d = a.get(b) || i({
            filename: b,
            name: "Render Error",
            message: "Template not found"
        });
        return c ? d(c) : d
    }

    function h(a, b) {
        if ("string" == typeof b) {
            var c = b;
            b = function() {
                return new k(c)
            }
        }
        var d = j[a] = function(c) {
            try {
                return new b(c, a) + ""
            } catch (d) {
                return i(d)()
            }
        };
        return d.prototype = b.prototype = n, d.toString = function() {
            return b + ""
        }, d
    }

    function i(a) {
        var b = "{Template Error}",
            c = a.stack || "";
        if (c) c = c.split("\n").slice(0, 2).join("\n");
        else
            for (var d in a) c += "<" + d + ">\n" + a[d] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(b + "\n\n" + c), b
        }
    }
    var j = a.cache = {},
        k = this.String,
        l = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        },
        m = Array.isArray || function(a) {
            return "[object Array]" === {}.toString.call(a)
        },
        n = a.utils = {
            $helpers: {},
            $include: function(a, b, c) {
                return a = f(c, a), g(a, b)
            },
            $string: b,
            $escape: d,
            $each: e
        },
        o = a.helpers = n.$helpers;
    a.get = function(a) {
            return j[a.replace(/^\.\//, "")]
        }, a.helper = function(a, b) {
            o[a] = b
        }, "function" == typeof define ? define(function() {
            return a
        }) : "undefined" != typeof exports ? module.exports = a : this.template = a, /*v:19*/
        a("items", function(a) {
            "use strict";
            var b = this,
                c = (b.$helpers, a.error),
                d = a.items,
                e = a.page,
                f = b.$each,
                g = (a.item, a.$index, b.$escape),
                j = "";
                return j += " ", c ? j += ' <div id="loading" class="loaded" > <div class="rect1"></div> <div class="rect2"></div></div>  ' : 0 == d.length ? j += ' <div id="loading" class="loaded"> <div class="rect1"></div> <div class="rect2"></div> </div> <div class="empty"> \u6ca1\u6709\u627e\u5230\u76f8\u5173\u5185\u5bb9 </div> ' : (j += " ", 1 == e && (j += ' <div id="loading" class="loaded"> <div class="rect1"></div> <div class="rect2"></div></div> '), j += " ", f(d, function(a) {
                    j += ' <div class="item" onclick="setSousuoList(' + a.id + ',' + a.songCounts + ' )"> <div class="title" >', j += g(a.title), j += '</div><div class="info"> ', a.name && (j += ' <div class="fileNumber">', j += g(a.name), j += "</div> "), j += " ", a.body && (j += ' <div class="fileSize">', j += g(a.body), j += "</div> "), j += ' </div> </div> '}), j += " "), new k(j)
        })
}();
