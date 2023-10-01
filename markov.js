/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

	constructor(text) {
    	let words = text.split(/[ \r\n]+/);
    	this.words = words.filter(c => c !== "");
    	this.makeChains();
		console.log(this.chains);
  	}

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
    // TODO
    	this.chains = new Map();
    	for(let i = 0; i < this.words.length; i++){
			let word = this.words[i];
			let nextWord = this.words[i+1] || null;
			if(this.chains.has(word)){
				this.chains.get(word).push(nextWord);
			}else{
				this.chains.set(word, [nextWord]);
			};
		};
	};


  /** return random text from chains */

	makeText(numWords=50) {
		let output = [];
		let keys = Array.from(this.chains.keys());
		let key = keys[Math.floor(Math.random() * keys.length)];
		while(output.length < numWords && key != null){
			output.push(key)
			key = keys[Math.floor(Math.random() * keys.length)];
		}
		
		return output.join(" ");
	};
};

module.exports = {
	MarkovMachine,
};