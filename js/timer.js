function two_char(n) {
    return n >= 10 ? n : "0" + n;
}
function time_fun() {
    var sec = 0;
    setInterval(function () {
        sec++;
        var date = new Date(0, 0)
        date.setSeconds(sec);
        var h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
        document.getElementById("mytime").innerText = two_char(h) + ":" + two_char(m) + ":" + two_char(s);
    }, 1000);
}
function time_now() {
    var mydate = new Date();
    var mytime = mydate.toLocaleTimeString(); //获取当前时间
    return mytime;
}