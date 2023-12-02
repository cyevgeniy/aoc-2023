import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let sum = 0

rl.on('line', (input) => {
  sum += getNum(input)
});

rl.once('close', () => {
  rl.close()
  console.log(sum)
})

function castToNumString(s) {
  if (!isNaN(+s))
    return s

  return {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
  }[s]
}

function getNum(s) {
  const reg = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))./g
  const results = []
  let match

  while((match = reg.exec(s)) !== null) {
    results.push(match[1])
  }

  if (results.length === 0)
    return 0

  const res =  castToNumString(results[0]) + castToNumString(results[results.length - 1])
  return +res
}
