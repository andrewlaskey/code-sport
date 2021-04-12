# code-sport

Write functions to place and move players around the board to collect more points than the other team.

### Placement Functions

These functions set the initial position of the player. They accept one argument, `i`, which is the player's index.

`(i) => { return // your code }`

### Movement Functions

These functions should return a number which will be added to the player's current position.

```
(
  t, // delta time
  i, // player index
  x, // current x position
  y, // current y position
  vx, // current player's x velocity
  vy, // current player's y velocity
) => {
  return // your code
}
```

### Sharing Team

Every time you update your team's configuration the team code will update. This code can be shared by copying and pasting into the "Load Team" input.
