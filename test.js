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
            if(!nextStop) break;
            indexStop += nextStop.index + 1;
        } else break;
    }

    cb(indexStart, indexStop);
}

function nodeVoidContent() {

}

nodeWithContent(h, /<\w/, /<\/\w/, function(a, b) {
    console.log(a, b);
    console.log(h.substring(a, h.indexOf('>', b) + 1));
});

nodeWithContent(h, /<\w/, /<\/\w/, function(a, b) {
    var hh = h.substring(a, h.indexOf('>', b) + 1);
    var hhci = h.indexOf('>', a) + 1;

    console.log('TAG: ', h.substring(a, hhci));
    console.log('CONTENT: ', h.substring(hhci, b - 2));
});

nodeWithContent(h, /<\w/, /\/>/, function(a, b) {
    console.log(a, b);
    console.log(h.substring(a, h.indexOf('>', b) + 1));
});
