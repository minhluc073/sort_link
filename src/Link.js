
import React from "react";
import "./App.css";
const Link = () => {
  const [link, setLink] = React.useState("");
  const [input, setInput] = React.useState("");
  const onShort = async () => {
    const input = document.getElementById("input-text");
    if (input.value !== "") {
      const message = {
        value: input.value,
      };
      const fetchOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      };
      const rs = await fetch("http://localhost:5000/user/short/link", fetchOptions);
      const result = await rs.json();
      if (result.success === true) {
        setLink(result.shortLink);
        input.value = "";
      } else {
        alert("Link ton tai");
      }
    }else {
      alert("Nhap short link");
    }
  };

  return (
    <section>
      <div className="content">
        <h1> Private URL shorten</h1>
        <div className="input">
          <input type="text" id="input-text" className="input-text" value={input} onChange={ (e) => setInput(e.target.value)} />
          <p className="text-content" id="text-content">
            {link}
          </p>
          <button onClick={onShort} className="btn-click">
            Short
          </button>
        </div>
      </div>
    </section>
  );
};

export default Link;

