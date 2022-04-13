'use strict'

import Solution from './Solution'

export default class GA {
  constructor (options) {
    this.size = options.size || 50
    this.dim = options.dim
    this.xFunc = options.xFunc
    this.mFunc = options.mFunc
    this.eFunc = options.eFunc
    this.mutation_rate = options.mutation_rate || 0.05
    this.iteration = 0
    this.solution = []
    this.run(this.initDec.bind(this))
  }

  run (makeMethod = this.makeDec.bind(this)) {
    while (this.solution.length < 2 * this.size) {
      let dec = makeMethod()
      this.solution.push(new Solution(dec, this.eFunc(dec)))
    }
    this.solution.sort((a, b) => a.obj - b.obj)
    this.best = this.solution[0]
    this.solution.length = this.size
    this.iteration++
  }

  initDec () {
    let i = this.dim
    let dec = (new Array(i)).fill(0).map((_, idx) => idx)
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [dec[j], dec[i]] = [dec[i], dec[j]]
    }
    return dec
  }

  makeDec () {
    let dec = this.xFunc(
      this.solution[Math.floor(Math.random() * this.solution.length)].dec,
      this.solution[Math.floor(Math.random() * this.solution.length)].dec
    )
    if (Math.random() < this.mutation_rate) {
      dec = this.mFunc(dec)
    }
    return dec
  }
}
