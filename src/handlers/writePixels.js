module.exports = async (knex, requestBody) => {
  let { x, y, fill } = requestBody;
  if (x < 0 || x >= 25 || y < 0 || y >= 25) return { ok: false, error: "Out of range" };
  let loc = `${x},${y}`;
  let rows = await knex("pixel").select("id").where("loc", "=", loc);
  let now = Math.floor(new Date().getTime() / 1000);
  if (rows.length) {
    await knex("pixel").where("loc", "=", loc).update({ is_filled: !!fill, last_edit_time: now });
  } else {
    await knex("pixel").insert({ loc, is_filled: !!fill, last_edit_time: now });
  }
  return { ok: true };
};
