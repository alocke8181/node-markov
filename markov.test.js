const markov = require('./markov');

describe('Basic Testing of Markov Object Functionality',function(){
    test('Test Markov Maker Object Creation', function(){
        let mm = new markov.MarkovMachine('Test markov machine');
        expect(mm).not.toBeNull();;
        expect(mm.words).not.toBeNull();
        expect(mm.words).toContain('Test');
        expect(mm.chains).not.toBeNull();
    });
    test('Test Basic Markov Chain Creation',function(){
        let mm = new markov.MarkovMachine('Only one word follows each in this text');
        let chains = mm.chains;
        expect(chains.get('Only')).toEqual(['one']);
        expect(chains.get('one')).toEqual(['word']);
        expect(chains.get('word')).toEqual(['follows']);
        expect(chains.get('follows')).toEqual(['each']);
        expect(chains.get('each')).toEqual(['in']);
        expect(chains.get('in')).toEqual(['this']);
        expect(chains.get('this')).toEqual(['text']);
        expect(chains.get('text')).toEqual([null]);
    })
    test('Test Advanced Markov Chain Creation',function(){
        let mm = new markov.MarkovMachine('The cat in the hat is a cat in a hat');
        let chains = mm.chains;
        expect(chains.get('The')).toEqual(['cat']);
        expect(chains.get('cat')).toEqual(['in','in']);
        expect(chains.get('in')).toEqual(['the','a']);
        expect(chains.get('the')).toEqual(['hat']);
        expect(chains.get('hat')).toEqual(['is',null]);
        expect(chains.get('is')).toEqual(['a']);
        expect(chains.get('a')).toEqual(['cat','hat']);
    });
    test('Test Markov Chain Text Generation',function(){
        let mm = new markov.MarkovMachine('This sentence has five words');
        let text = mm.makeText(numWords=50);
        expect(text).toEqual(expect.stringContaining('This'));
        expect(text).toEqual(expect.stringContaining('sentence'));
        expect(text).toEqual(expect.stringContaining('has'));
        expect(text).toEqual(expect.stringContaining('five'));
        expect(text).toEqual(expect.stringContaining('words'));

    })
});