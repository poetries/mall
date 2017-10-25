var _mm = {
    // 网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || "get",
            url: param.url || "",
            dataType: param.type || "json",
            data: param.data || "",
            success: function(res) {
                if (0 === res.status) {
                    typeof param.success === "function" && param.success(res.data, res.msg);
                } else if (10 === res.status) { //没有登录，需要强制登录
                    _this.doLogin();
                } else if (1 === res.status) { //请求数据出错
                    typeof param.error === "function" && param.error(res.msg);
                }
            },
            error: function(err) {
                typeof param.error === "function" && param.error(err.statusText);
            }
        });
    },
    // 登录
    doLogin: function() {
        window.location.href = "./login.html?redirect=" + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;