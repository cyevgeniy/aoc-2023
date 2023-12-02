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

  const limits = {
    red: 12,
    green: 13,
    blue: 14,
  }

  for(const session of sessions) {
    // check whether this session is possible
    // 12 red cubes, 13 green cubes, and 14 blue cubes
    const _limits = {...limits}

    for (const portion of session.split(',').map(item => item.trim())) {
      const [num, color] = portion.split(' ')
      _limits[color] -= +num

      if (_limits.red < 0 || _limits.green < 0 || _limits.blue < 0) {
        return
      }
    }
  }

  sum += +gameId
}
