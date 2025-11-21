import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Form from "./Components/Form/From";
import List from "./Components/List/List";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Form />
        <List />
      </div>
    </div>
  );
}
