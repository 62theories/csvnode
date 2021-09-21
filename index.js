const fs = require("fs");
const csvParser = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let results = [];

fs.createReadStream("./input.csv")
  .pipe(csvParser())
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
    // console.log(sumArr);
    const csvWriter = createCsvWriter({
      path: "out.csv",
      header: [
        { id: "company", title: "company" },
        { id: "sum", title: "sum" },
      ],
    });
    csvWriter.writeRecords(sumArr).then(() => console.log("finish"));
  });
