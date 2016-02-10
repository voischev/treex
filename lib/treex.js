var h = 'test<h1><h2><h3><h4></h4>1234567890</h3><h4>asdfsdf</h4></h2><h2>f</h2></h1>';

function nodeWithContent(cb) {
    var matchStart = this.match(/<\w/);
    var matchStop = this.match(/<\//);
    return cb(matchStart, matchStop/*[node, content]*/);
}

// function nodeWithoutContent(RE, cb) {
//     return cb([node]);
// }
nodeWithContent.call(h, function(a, b) {
    console.log(a, b);
});

function parse(str) {
    var level = 0,
        index = 0,
        indexLast = str.length - 1,
        result = [],
        startTagIndex = 0,
        startContentIndex = 0,
        startTextIndex = 0,
        startTag = false,
        startText = true,
        closeTag = false,
        content,
        text,
        tag;

    function textNode(str) {
        // return ['isText', str];
        return [str];
    }

    function tagNode(str) {
        // return ['isTag', str];
        return [str];
    }

    function contentNode(str) {
        // return ['isContent', parse(str)];
        return parse(str);
    }

    function lastNode() {
        return result[result.length - 1];
    }

    while (str[index]) {
        var cur = str[index],
            indexNext = index + 1,
            curNext = str[indexNext],
            isEnd = index === indexLast,
            last;

        if (isEnd && startText) {
            console.log('END + TEXT', startTextIndex, indexNext);
            text = str.substring(startTextIndex, indexNext);
            if (startTag) {
                last = lastNode();
                last.push(textNode(text));
                result.push(last);
            } else {
                result.push(textNode(text));
            }
        }

        var isStartTag = (cur === '<' && /[A-Za-z]/.test(curNext));
        if (isStartTag) {
            startTagIndex = index;
            startTag = true;
            startText = false;
        }

        var isStartTagEnd = (cur === '>' && startTag);
        if (isStartTagEnd) {
            startTag = false;
            if (!level) {
                tag = str.substring(startTagIndex, indexNext);
                console.log('PUSH TAG', tag);
                if (tag) result.push(tagNode(tag));
                startContentIndex = indexNext;
                startTextIndex = indexNext;
                startText = true;
            }
            level++;
        }

        var isCloseTag = (cur === '<' && curNext === '/');
        if (isCloseTag) {
            console.log('isCloseTag', level);
            level--;
            if (!level) {
                if (startContentIndex !== index) {
                    last = lastNode();
                    content = str.substring(startContentIndex, index);
                    if (content.length) last.push(contentNode(content));
                    console.log('content', startContentIndex, index, content, content.length);
                    startTextIndex = indexNext;
                    startTag = false;
                    closeTag = true;
                    startText = false;
                }
            }
        }

        var isCloseTagEnd = (cur === '>' && closeTag);
        if (isCloseTagEnd) {
            console.log('isCloseTagEnd');
            if (!level) {
                closeTag = false;
                startText = true;
            }
        }

        if (
            !startText &&
            (isStartTag || isCloseTag) &&
            (!startTag || !closeTag) &&
            !level &&
            index &&
            startTextIndex !== indexNext && false
        ) {
            text = str.substring(startTextIndex, index);
            console.log('TEXT PUSH', text, startTextIndex, index);
            if (text) {
                last = lastNode();
                result.length ?
                    last.push(textNode(text)) :
                    result.push(textNode(text));
            }
            startTextIndex = index;
        }

        console.log(index, level, cur);
        index++;
    }
    return result;
}
// function toPostHTMLTree(tree) {
//     var result = [];

//     for (var i = 0, len = tree.length; i < len; i++) {
//         var node = tree[i];
//         result.push(parseNode(node));
//     }

//     return result;

//     function parseNode(node) {
//         if (!node[0]) return node[1];

//         var strArr = node[0].replace(/^</, '').replace(/>$/, '').split(' '),
//             res = { tag: '' };

//         for (var i = 0, len = strArr.length; i < len; i++) {
//             var match = strArr[i];
//             if (i === 0) {
//                 // if (this.getShortTags().indexOf(match) !== -1) {
//                     // this._isShortTag = true;
//                 // }
//                 res.tag = match;
//             } else {
//                 var attr = match.split('=');
//                 if (!res.attrs) res.attrs = {};
//                 res.attrs[attr[0]] = attr[1] ?
//                     attr[1]
//                         .replace(/^['"]/, '')
//                         .replace(/['"]$/, '') :
//                     true;
//             }
//         }

//         if (node[1]) res.content = toPostHTMLTree(node[1]);

//         return res;
//     }
// }

console.log(JSON.stringify(parse(h)));
console.log(h);
// console.log(JSON.stringify(toPostHTMLTree(parse(h))));
