import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let sum = 0

rl.on('line', (input) => {
  getGames(input)
});

rl.once('close', () => {
  rl.close()
  console.log(sum)
})

function getGames(s) {
  const arr = s.split(':')
  const gameId = arr[0].split(' ')[1]

  // 2 green, 3 red, 1 blue
  const sessions = arr[1].split(';')

  const maxes = {
    green: 0,
    red: 0,
    blue: 0
  }

  for(const session of sessions) {
    // check whether this session is possible
    const localBag = {
      green: 0,
      red: 0,
      blue: 0
    }

    for (const portion of session.split(',').map(item => item.trim())) {
      const [num, color] = portion.split(' ')
      localBag[color] += +num
    }

    for (const key in localBag) {
      if (maxes[key] < localBag[key])
        maxes[key] = localBag[key]
    }
  }

  sum += maxes.red * maxes.blue * maxes.green
}
