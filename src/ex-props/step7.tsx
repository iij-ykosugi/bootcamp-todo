type HelloProps = {
  yourName: string
}

function Hello({ yourName }: HelloProps) {
  return (
    <p>
      {yourName.length > 5 ? 'こんにちは、' : 'Hello, '}
      <b>{yourName}!</b>
    </p>
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
