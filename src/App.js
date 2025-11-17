import React from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Form />
      </div>
    </div>
  );
}
