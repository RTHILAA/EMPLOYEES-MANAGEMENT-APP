import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import List from "./Components/List/List";
import { useState } from "react"

export default function App() {
  const [employees, setEmployees] = useState([]);
  const addEmployee = (emp) => {
    setEmployees([...employees, emp]);
  };
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Form addEmployee={addEmployee} />
        <List employees={employees} />
      </div>
    </div>
  );
}
