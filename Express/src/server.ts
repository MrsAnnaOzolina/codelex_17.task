import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";

const app = express();
const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "127.0.0.1",
    port:3306,
    database: "RockPaperScissors",
    user: "root",
    password: "123456789"
});

con.connect(function(err) {
  if (err) {
    throw err;
  } 
  console.log("Connected!");
});


app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(cors({ origin: "*" }));

app.get("/statistic", (req: Request, res: Response) => {
  con.query('SELECT * FROM gameData ORDER BY id ASC', (err, data)=>{
    if(err) throw err;
    res.send(data);
  });
});

app.post('/statistic', (req: Request, res: Response) =>{

  const insert = "INSERT INTO gameData (`player_name`,`points`,`computer_Points`) VALUES (?) " ;
      const values = [
        req.body.playerName,
        req.body.playerScore,
        req.body.computerScore
      ];
     con.query(insert, [values], (err,data) => {
      if(err) {
        throw err
      };
        res.json(data)
        
      })
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
