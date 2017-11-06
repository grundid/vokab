var srt = require("srt")


const subtitles = [];

srt("data/englisch/Game.of.Thrones.S01E01.srt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("enter callback");

        Object.keys(data).forEach((key) => {
            const subtitle = data[key].text;
            subtitles.push(subtitle);
        });
        console.log("exit callback");


        console.log("after srt");

        subtitles.sort(function (a, b) {
            return a.length - b.length;
        });


        console.log("after sort");

        subtitles.forEach(function (e) {
            // console.log("["+e+"]");
        });
    }
});

srt("asdasd").then(function (data) {

}).catch(function (err) {

});


