var assert = require('assert'),
    treex = require('../lib/treex.js');

// var html = 'text<h1><h2>text text<h3>text</h3></h2><img /><h2><h3><h4></h4><h4><h5></h5></h4></h3></h2></h1>';

describe('Simple', function() {
    describe('Text', function() {
        it('should return text node', function() {
            assert.deepEqual([['test']], treex('test'));
        });
    });

    describe('Element', function() {
        it('should return element node', function() {
            assert.deepEqual([['<span>', [], '</span>']], treex('<span></span>'));
        });
    });
});

describe('Conditions', function() {
    describe('Doctype Simple', function() {
        it('should return text node', function() {
            assert.deepEqual([['<!DOCTYPE HTML>']], treex('<!DOCTYPE HTML>'));
        });
    });

    describe('Doctype Other', function() {
        it('should return text node', function() {
            var text = [
                '<!DOCTYPE svg:svg PUBLIC',
                '"-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//EN"',
                '"http://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd">'
            ].join('\n');

            assert.deedEqual([[text]], treex(text));
        });
    });

    describe('XML Declaration', function() {
        it('should return text node', function() {
            assert.deepEqual(
                [['<?xml version="1.0" encoding="UTF-8" standalone="no"?>']],
                treex('<?xml version="1.0" encoding="UTF-8" standalone="no"?>')
            );
        });
    });
});
