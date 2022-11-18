module.exports = async (knex, requestBody) => {
  let syncTime = Math.floor(requestBody.syncTimestamp || 0);
  syncTime = isNaN(syncTime) ? 0 : syncTime;
  let rows = await knex.select("loc", "is_filled").table("pixel").where("last_edit_time", ">=", syncTime);
  let outgoingSyncTime = Math.floor(new Date().getTime() / 1000) - 2;
  return {
    ok: true,
    updates: rows.map(row => {
      let [x, y] = row.loc.split(",").map(n => parseInt(n));
      return { x, y, filled: row.is_filled };
    }),
    syncTimestamp: outgoingSyncTime,
  };
    
};
  