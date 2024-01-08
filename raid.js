const defaults = {
  0: 2,
  1: 2,
  5: 3,
  6: 4,
};

function calc_raid(raid) {
  raid = raid.toString();
  raid = raid.split("");
  raid = raid.reverse();
  var drives = defaults[raid[0]];
  var order = raid[0];
  for (let i = 1; i < raid.length; i++) {
    drives *= defaults[raid[i]];
    order += " -> " + raid[i];
  }
  return { drives, order };
}

const raid = "566";

const result = calc_raid(raid);

console.log("Number of drives: " + result.drives);
console.log("Order of drives: " + result.order);
