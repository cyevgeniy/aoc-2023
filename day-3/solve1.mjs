import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const map = []
let N = 0

rl.on('line', (input) => {
  map.push(input)
  if (N === 0)
    N = input.length
});

rl.once('close', () => {
  //console.log(N)
  //console.log(map.join(''))
  solve(map.join(''))
  //console.log(scanNum('123...', 0))

    //console.log(sum)

  rl.close()
})

function isSymbol(s) {
  return (s !== undefined && s !== '.' && isNaN(+s))
}

function isContainsSymbols(s, start, end) {
  for (let i = start; i <= end; ++i) {
    if (isSymbol(s[i]))
      return true
  }

  return false
}

/**
 * Returns true if a string s that represents a number
 * with start index i and lenght len is adjasted to a
 * symbol in a double array with size n
 */
function isAdjustedToSymbol(s, i, len, n) {
  // dumb but I want to sleep
  return (isSymbol(s[i-1]) || isSymbol(s[i+len]) || isContainsSymbols(s, i+n-1, i+n+len) || isContainsSymbols(s, i-n-1, i+len-n))
}

// Scans number starting from start in the string s
// returns number itself
// 123...
function scanNum(s, start) {
  let i = start
  while(!isNaN(+s[i])) {
    if (((i+1)%N === 1) && (start !== i)) {
      console.log('mod N = ', (i+1)%N, ';start=', start, 'i=', i)
      break
    }
    ++i
  }

  return s.slice(start, i)
}

function solve(s) {
  let i = 0
  let sum = 0
  while(i < s.length) {
    if (!isNaN(+s[i])) {
      const _i = i

      const num = scanNum(s, i)

      if (isAdjustedToSymbol(s, _i, num.length, N))
        sum += +num

      i+= num.length
      //console.log(num, i)
      console.log(num, isAdjustedToSymbol(s, _i, num.length, N), num.length)
    } else {
      ++i
    }
  }

  console.log(sum)
}
