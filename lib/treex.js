module.exports = function parser(html) {
    var result = [],
        stack = [],
        lastIndex = 0,
        index = 0,
        lastCotnent,
        content,
        chr,
        isText = function(str) {
            // Check all case for text nodes
            if (str.charAt(0) !== '<') return true;

            // is condition for tests :) need more tests
            if(str.charAt(1) === '!') {
                return true;
            }

            return false;
        },
        makeContent = function(str) {
            var i = str.length;

            if(str.charAt(0) === '<')
                // is Element or Text?
                return [[str, []]];

            while (--i > 0) {
                // TODO: need more checks. Is Element or Text
                if (str[i] === '<') break;
            }

            // is Text + Element
            return [[str.substring(0, i)], [str.substring(i), []]];
        },
        lastNode = function(arr) {
            var len = arr.length;
            return arr[len - 1].length === 1 ? arr[len - 1][0] : arr[len - 1][1];
        };

    while (true) {
        chr = html[index];
        if (!chr) break;
        index++;

        if (chr === '>') {
            content = makeContent(html.substring(lastIndex, index));
            lastIndex = index;
            console.log('content', content);
            console.log('\n');

            if (content.length === 1) {
                if(content[0][0].charAt(1) === '/') {
                    lastNode(stack)[1] = lastNode(stack)[1].concat(content);
                    var last = lastNode(stack).pop();
                    if (lastNode(stack).length === 1) {
                        last = lastNode(stack).pop().concat(last);
                    } else {
                    }
                    lastNode(stack)[1] = lastNode(stack)[1].concat(last);
                    continue;
                }
            }
            if (content.length === 2) {
                if(content[1][0].charAt(1) === '/') {
                    lastNode(stack)[1] = lastNode(stack)[1].concat(content);
                    continue;
                }
            }
            stack.push(content);
        }

    }

    console.log('stack: ', JSON.stringify(stack));
    return result;
}
