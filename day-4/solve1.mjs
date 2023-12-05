import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let sum = 0

rl.on('line', (input) => {
  sum += solve(input)
});

rl.once('close', () => {
  console.log(sum)
  rl.close()
})

// returns  the count of winning points for the card
function solve(s) {
  const cards = s.split(':')[1].split('|')
  const [...theirs] = cards[0].split(' ').filter(Boolean)
  const m = new Set(theirs)

  const [...ours] = cards[1].split(' ').filter(Boolean)

  let cnt = -1
  for (const num of ours) {
    if (m.has(num))
      cnt++
  }

  if (cnt >= 0)
    return Math.pow(2, cnt)

  return 0
}
