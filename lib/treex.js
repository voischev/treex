module.exports = function treex(str) {
    var result = [],
        stackContent = [],
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
        lastNodeInContent = function(arr) {
            return arr[arr.length - 1];
        };

    while (true) {
        chr = str[index];
        if (!chr) {
            // TODO: if text push to result
            if (!stackContent.length && lastIndex !== index) {
                result.push(lastIndex ? [str.substring(lastIndex, index)] : [str]);
            } else {
                for (var i = 0; i < stackContent.length; i++) {
                    result.concat(stackContent[i]);
                }
            }
            break;
        }
        index++;

        if (chr === '>') {
            content = makeContent(str.substring(lastIndex, index));
            lastIndex = index;

            if (content.length === 1) {
                if(content[0][0].charAt(1) === '/') {
                    var lastContent = stackContent.pop();
                    lastNodeInContent(lastContent)[2] = content[0][0];
                    if (!stackContent.length) {
                        result = result.concat(lastContent);
                        continue;
                    }

                    continue;
                }
            }
            stackContent.push(content);
        }

    }

    return result;
}
