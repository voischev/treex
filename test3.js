/*
 * NODES:
 *      TEXT
 *      ['text']
 *
 *      ELEMENT
 *      ['<tag attrs>', [...content]]
 *
 *      VOID ELEMENT
 *      ['<tag attrs>', []]
 *
 * TREE:
 *      [
 *          ['<!doctype>'],
 *          ['<html>', [
 *              ['<head>', [
 *                  ['<meta type="urf8">', []],
 *                  ['<title>', [['title']]],
 *                  ['<style src="ololo.css">', []]
 *              ]]
 *          ]],
 *          ['<body class="page">', [
 *              ['<div class="main">', [
 *                  ['<h1>', [['TITLE']]],
 *                  ['<p>', [['test']]],
 *                  ['<img src="image.png">', []]
 *              ]]
 *          ]]
 *      ]
 */

var html = 'text<h1><h2>text text<h3>text</h3></h2><img /><h2><h3><h4></h4><h4><h5></h5></h4></h3></h2></h1>';

function parser(html) {
    var result = [],
        stack = [],
        lastIndex = 0,
        index = 0,
        lastCotnent,
        content,
        chr,
        makeContent = function(str) {
            var i = str.length;

            if(str.charAt(0) === '<')
                return [[str]];

            while (--i > 0) {
                // TODO: need more checks
                if (str[i] === '<') break;
            }

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
                    lastNode(stack).push(content);
                    continue;
                }
            }
            if (content.length === 2) {
                if(content[1][0].charAt(1) === '/') {
                    lastNode(stack).push(content);
                    continue;
                }
            }
            stack.push(content);
            console.log('stack', JSON.stringify(stack));
        }

    }

    return result;
}

console.log('RESULT: ', JSON.stringify(parser(html)));
console.log('Start: ', html);
