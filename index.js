    const striphtml = require('js-striphtml');
    const srt = require("srt");
    const dir = require('node-dir');
    const fs = require('fs');
    const parseSRT = require('parse-srt')
    const list = [];
    const report = {};
    let listIndex = 0;
    const compiledSubs = [];



    const reListDirSubdir = function (subDir) {

        fs.readdirSync(subDir).forEach(function (file) {
            const stat = fs.statSync(subDir + "/" + file);
            if (stat.isDirectory()) {
                reListDirSubdir(subDir + "/" + file);
            }
            else {
                if (file.indexOf(".srt") != -1) {
                    list.push(subDir + "/" + file);
                }
            }
        });
    }
    reListDirSubdir("data/englisch");
    //console.log(list);

    function createFrequencyMap(subtitles) {
        const frequencyMap = {};
        subtitles.forEach(function (rawSubtitle) {
            const words = rawSubtitle.split(" ");
            words.forEach(function (word) {
                if (frequencyMap[word]) {
                    frequencyMap[word]++;
                }
                else {
                    frequencyMap[word] = 1;

                }
                //  console.log(frequencyMap);
            });
        });
        return frequencyMap;
    }

    function createFrequencyListSort(frequencyMap) {
        const frequencyList = [];
        Object.keys(frequencyMap).forEach(function (element) {
            frequencyList.push({ word: element, count: frequencyMap[element] });
        });
        frequencyList.sort(function (a, b) {
            return b.count - a.count;
        });
        return frequencyList;
    }

    /* console.log(frequencyMap);
    let totalWords = 0;
    frequencyList.forEach(function (element) {
        console.log(element.word, "=", element.count)
        totalWords += element.count;
    });
    console.log("unique words ", Object.keys(frequencyMap).length);
    console.log("total words = ", totalWords);
    */

    function sortAndOutput(subtitles) {
        subtitles.sort(function (a, b) {
            return a.length - b.length;
        });
        subtitles.forEach(function (e) {
            console.log("[" + e + "]");
        });
    }
    function processSrt(fileName) {
        //console.log(fileName);

        srt(fileName, function (err, data) {
            const subtitles = [];
            if (err) {
                // console.log(err);
            } else {
                Object.keys(data).forEach((key) => {
                    const subtitle = data[key].text.replace(/\r|\n/g, ' ').replace("--", '').replace("...", '').replace("?", '').replace("!", ' ').replace(",", ' ').replace(".", '').replace("  ", ' ').replace("   ", '').replace("~ exklusiv für wwwSubCentral.de ~", '').replace("/", '');
                    const subtitleWithoutHtml = striphtml.stripTags(subtitle);
                    compiledSubs.push(subtitleWithoutHtml.toLowerCase());
                    //console.log(compiledSubs);
                });

                /* sortAndOutput(subtitles);
                const frequencyMap = createFrequencyMap(subtitles);
                const frequencyList = createFrequencyListSort(frequencyMap);
                report[fileName] = frequencyList;
                */
                listIndex++;
                //console.log("end", listIndex);
                if (listIndex < list.length) {
                    processSrt(list[listIndex]);
                }
                else {
                    const frequencyMapCom = createFrequencyMap(compiledSubs);
                    const compiledSubsSorted = createFrequencyListSort(frequencyMapCom);
                    //fs.writeFileSync("compiledSubs.json", JSON.stringify(compiledSubs, null, 1));
                    const finalFrequencyMap = {};
                    compiledSubsSorted.forEach(function (element) {
                        finalFrequencyMap[element.word] = element.count;
                    }
                    );
                    fs.writeFileSync("compiledSubsSorted.json", JSON.stringify(finalFrequencyMap, null, 1));
                }
            }
        });
    };
    processSrt(list[listIndex]);

    //const compiledSubsSorted = createFrequencyListSort(compiledSubs);
    //fs.writeFileSync("compiledSubs.json", JSON.stringify(compiledSubs, null, 1));