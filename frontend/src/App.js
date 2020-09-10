import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get("/api/values").then((response) => {
      console.log(`response: ${response}`);
      setLists(response.data);
    });
  }, []);

  const changeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("/api/value", { value }).then((response) => {
      if (response.data.success) {
        console.log(`response: ${response}`);
        setLists((prevLists) => [...prevLists, response.data.value]);
        setValue("");
      } else alert("데이터 입력 요청을 실패했습니다");
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists.length > 0 &&
            lists.map((value) => <li key={value}>{value}</li>)}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              onChange={changeHandler}
              value={value}
              placeholder="이름을 입력하시지요."
            />
            <button type="submit">입력</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
