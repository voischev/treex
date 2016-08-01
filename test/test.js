var assert = require('assert'),
    treex = require('../lib/treex.js');

// var html = 'text<h1><h2>text text<h3>text</h3></h2><img /><h2><h3><h4></h4><h4><h5></h5></h4></h3></h2></h1>';

describe('Text', function() {
    describe('Simple', function() {
        it('should return text node', function() {
            assert.equal(['test'], treex('test'));
        });
    });
});

// [[["text"],["<h1>",[]]],[["<h2>",[]]],[["text text"],["<h3>",[["text"],["</h3>",[]],["</h2>",[]]]]],[["<img />",[]]],[["<h2>",[]]],[["<h3>",[]]],[["<h4>",[["</h4>",[]]]]],[["<h4>",[]]],[["<h5>",[["</h5>",[]],["</h4>",[]],["</h3>",[]],["</h2>",[]],["</h1>",[]]]]]]
