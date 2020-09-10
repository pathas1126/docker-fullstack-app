const express = require("express");
const bodyParser = require("body-parser");

// 데이터 베이스 Pool
const db = require("./db");

// 데이터 베이스 테이블 생성
// db.pool.query(
//   `CREATE LISTS(
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
//     )`,
//   (err, results, fields) => {
//     console.log("results", results);
//   }
// );

// 익스프레스 서버 생성
const app = express();
const PORT = 5000;

// json 형태로 오는 요청의 본문을 해석
app.use(bodyParser.json());

// DB lists 테이블에 있는 모든 데이터를 응답으로 전송
app.get("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM LISTS;", (err, results, fields) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

// 클라이언트로 부터 넘어온 데이터를 디비에 저장
app.post("/api/value", (req, res, next) => {
  // 바디 파서를 사용하기 때문에 요청에서 바로 body를 사용할 수 있음
  db.pool.query(
    `INSERT INTO LISTS (value) VALUES(${req.body.value})`,
    (err, results, fields) => {
      if (err) res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
