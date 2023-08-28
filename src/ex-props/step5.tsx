type HelloProps = {
  yourName: string
}

function Hello({ yourName }: HelloProps) {
  return (
    <p>Hello, <b>{yourName}!</b></p>
  )
}

export default function App() {
  const members = ['asa-taka', 'igarashi', 'ueda']
  return (
    <div className="App">
      {members.map((member) => (
        <Hello key={member} yourName={member} />
      ))}
    </div>
  )
}
