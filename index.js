const fs = require("fs");
const csv = require("csv-parser");

let results = [];

fs.createReadStream("./input.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const sumArr = results.reduce((acc, cur) => {
      const exist = acc.find(({ company }) => company == cur.company);
      if (exist) {
        exist.sum += parseFloat(cur.price);
      } else {
        acc.push({
          company: cur.company,
          sum: parseFloat(cur.price),
        });
      }
      return acc;
    }, []);
    console.log(sumArr);
  });
