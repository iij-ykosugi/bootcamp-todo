import { useState } from "react";

function ListFilter() {
  const [text, setText] = useState("");
  const members = ["asa-taka", "igarashi", "ueda"];
  const filteredMembers = members.filter((member) => member.includes(text));
  return (
    <div>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      {filteredMembers.map((member) => (
        <p key={member}>{member}</p>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <ListFilter />
    </div>
  );
}
