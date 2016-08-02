var assert = require('assert'),
    treex = require('../lib/treex.js');

// var html = 'text<h1><h2>text text<h3>text</h3></h2><img /><h2><h3><h4></h4><h4><h5></h5></h4></h3></h2></h1>';

describe('Simple', function() {
    describe('Text', function() {
        it('should return text node', function() {
            assert.equal(['test'], treex('test'));
        });
    });

    describe('Element', function() {
        it('should return element node', function() {
            assert.equal(['<span>', [], '</span>'], treex('<span></span>'));
        });
    });
});

describe('Declarations', function() {
    describe('Doctype HTML5', function() {
        it('should return text node', function() {
            assert.equal(['<!DOCTYPE HTML>'], treex('<!DOCTYPE HTML>'));
        });
    });

    describe('Doctype XHTML + MathML + SVG Profile (Using SVG as the host)', function() {
        it('should return text node', function() {
            var text = [
                '<!DOCTYPE svg:svg PUBLIC',
                '"-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//EN"',
                '"http://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd">'
            ].join('\n');

            assert.equal([text], treex(text));
        });
    });
});
