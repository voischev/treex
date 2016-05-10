var html = 'text<h1><h2>text text<h3>text</h3></h2><img /><h2><h3><h4></h4><h4><h5></h5></h4></h3></h2></h1>';

function prsr(str) {
    var stack = [],
        result = [],
        startIndex = 0,
        startContentIndex = 0,
        isStartTag = false,
        isCloseTag = false,
        index = 0;

    stack.last = function last() {
        return this[this.length - 1];
    };

    while(str[index]) {
        var cur = str[index],
            curNext = str[index + 1],
            tag;

        if (cur === '<') {
            // push test contnent
            if (startContentIndex < index) {
                var text = str.substring(startContentIndex, index);
                if(stack.length) {
                    stack.last().push(text);
                } else {
                    result.push(text);
                }
            }

            // is Start Tag
            if (/[A-Za-z]/.test(curNext)) {
                startIndex = index;
                isStartTag = true;
            }

            // is Close Tag
            if (curNext === '/') {
                var lastTagName = stack.last()[0].match(/^<([\a-zA-Z|\d]+)/)[1],
                    closeTagName = str.substring(index + 2).match(/^([\a-zA-Z|\d]+)/)[1];

                    isCloseTag = true;

                    if (lastTagName === closeTagName) {
                        var lastTag = stack.pop();

                        if (stack.length > 0) {
                            stack.last().push(lastTag);
                        } else {
                            result.push(lastTag);
                        }
                    }
            }
        }

        if (isStartTag) {
            // default
            if (cur === '>') {
                isStartTag = false;
                startContentIndex = index + 1;
                tag = [str.substring(startIndex, startContentIndex)];
                stack.push(tag);
            }

            // void tags
            if (cur === '/' && curNext === '>') {

                isStartTag = false;
                startContentIndex = index + 2;
                tag = [str.substring(startIndex, startContentIndex)];

                if (stack.length > 0) {
                    stack.last().push(tag);
                } else {
                    result.push(tag);
                }
            }
        }

        if (isCloseTag) {
            if (cur === '>') {
                isCloseTag = false;
                startContentIndex = index + 1;
            }
        }


        index++;
    }

    return result;
}

console.log('RESULT: ', JSON.stringify(prsr(html)));
console.log('Start: ', html);
