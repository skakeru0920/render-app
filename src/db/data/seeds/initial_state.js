exports.seed = async function(knex) {
  // An algorithmically-generated mysterious picture. What on earth could it be??!?
  let pts = {};
  let pmax = 200;
  for (let i = 0; i < 200; i++) {
    let cx = 12;
    let cy = 12;
    let r = 10;
    let theta = i * 355 / 113 * 2 / pmax;
    let px = Math.floor(Math.cos(theta) * r + cx + .5);
    let py = Math.floor(Math.sin(theta) * r + cy + .5);
    if (Math.sin(theta) >= 0) {
      pts[`${px},${py}`] = true;
    }
    if (i * i == 144) { // gross
      for (let flipFlop of [true, false]) {
        pts[`${i + (flipFlop ? -1 : 1) * 8},${i >> 1}`] = i;
      }
    }
  }

  let now = Math.floor(new Date().getTime() / 1000);
  let entries = Object.keys(pts).map(loc => {
    return {
      loc,
      is_filled: true,
      last_edit_time: now,
    };
  });

  await knex("pixel").del();
  await knex("pixel").insert(entries);
};
