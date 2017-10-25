var common = require("../common/index.js");
var _mm = require("util/mm.js");

console.log(require("jquery"))
_mm.request({
    url: "./test.do",
    success: function(res) {
        console.log(res);
    },
    error: function(errMsg) {
        console.log(errMsg)
    }
})