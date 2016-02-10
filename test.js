var h = 'test<h1><h2><h3><h4></h4>1234567890</h3><h4>asdfsdf</h4></h2><h2>f</h2></h1><p>test222</p><img src="dd"/><b>test333</b>';

function nodeWithContent(str, startRE, stopRE, cb) {
    var matchStart = str.match(startRE);
    // TODO: Выкинуть если нет stop
    var matchStop = str.match(stopRE);
    if (!matchStart) return null;

    var indexStart = matchStart.index,
        indexStop = matchStop.index,
        index = matchStart.index;

    while(true) {
        var sbstr = str.substring(++index, indexStop),
            nextStart = sbstr.match(startRE),
            nextStop = str.substring(++indexStop).match(stopRE);
        if (nextStart) {
            index += nextStart.index;
            indexStop += nextStop.index + 1;
        }
        if (!nextStart) break;
    }
    cb(indexStart, indexStop);
}

nodeWithContent(h, /<\w/, /<\/\w/, function(a, b) {
    console.log();
    console.log(h.substring(a, h.indexOf('>', b) + 1));
});
