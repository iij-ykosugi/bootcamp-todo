import { useState } from "react";

type ListFilterProps = {
  members: string[]
}

function ListFilter({ members }: ListFilterProps) {
  const [text, setText] = useState('')
  const filteredMembers = members.filter((member) => member.includes(text))
  return (
    <div>
      <input value={text} onChange={(event) => setText(event.target.value)} />
      {filteredMembers.map((member) => (
        <p key={member}>{member}</p>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <ListFilter members={['asa-taka', 'igarashi', 'ueda']} />
      <ListFilter members={['endo', 'ogata', 'kataoka']} />
    </div>
  )
}
