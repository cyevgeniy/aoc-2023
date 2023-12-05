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
  solve(map.join(''))
  //console.log(cutString(map[0], 2, 4))
  //console.log(N)
  //console.log(map.join(''))
  //solve(map.join(''))
  //console.log(scanNum('123...', 0))

    //console.log(sum)

  rl.close()
})

// idx - top right or bottom right index

function cutString(s, start, end) {
  //let start = idx - N - 1
  //let end = idx - N + 1

  if (start <= 0 || end >= s.length) return ''

  while(!isNaN(s[start])) {
    if ((start+1)%N === 0) {
      break
    }
    --start
  }
  while(!isNaN(s[end])) {
    if (((end+1)%N === 1) && (end+1) >= N) {
      break
    }
    ++end
  }

  return s.slice(start+1, end)
}

function solve(s) {
  let i = 0
  let sum = 0
  while(i < s.length) {
    let gear = 0
    if (s[i] === '*') {
      const s1 = cutString(s, i+1, i+1).match(/\d+/g) ?? []
      const s2 = cutString(s, i-1, i-1).match(/\d+/g) ?? []
      const s3 = cutString(s, i-N-1, i-N+1).match(/\d+/g) ?? []
      const s4 = cutString(s, i+N-1, i+N+1).match(/\d+/g) ?? []
      // console.log('s1: ', s1, s1.length)
      // console.log('s2: ', s2, s2.length)
      // console.log('s3: ', s3, s3.length)
      // console.log('s4: ', s4, s4.length)
      //console.log((s1.length + s2.length + s3.length + s4.length))

      if ((s1.length + s2.length + s3.length + s4.length) > 1) {
        console.log([...s1, ...s2, ...s3, ...s4].map(i => +i))
        sum += [...s1, ...s2, ...s3, ...s4].map(i => +i).reduce((acc, curr) => acc *= curr)
      }
    }
    ++i
  }

  console.log(sum)
}
