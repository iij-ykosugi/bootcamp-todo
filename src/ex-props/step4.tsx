type HelloProps = {
  yourName: string
}

function Hello({ yourName }: HelloProps) {
  return (
    <p>Hello, <b>{yourName}!</b></p>
  )
}

export default function App() {
  return (
    <div className="App">
      <Hello yourName="asa-taka" />
      <Hello yourName="igarashi" />
      <Hello yourName="ueda" />
    </div>
  )
}
