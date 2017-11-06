const srt = require("srt");

const subtitles = [];

function sortAndOutput() {
    subtitles.sort(function (a, b) {
        return a.length - b.length;
    });


    subtitles.forEach(function (e) {
       console.log("["+e+"]");
    });
}

srt("data/englisch/Game.of.Thrones.S01E01.srt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        Object.keys(data).forEach((key) => {
            const subtitle = data[key].text.replace(/\r|\n/g, ' ');
            subtitles.push(subtitle);
        });
        sortAndOutput();
    }
});

