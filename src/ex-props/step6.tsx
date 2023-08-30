type HelloProps = {
  yourName: string;
};

function Hello({ yourName }: HelloProps) {
  if (yourName.length > 5) {
    return (
      <p>
        こんにちは、<b>{yourName}!</b>
      </p>
    );
  }

  return (
    <p>
      Hello, <b>{yourName}!</b>
    </p>
  );
}

export default function App() {
  const members = ["asa-taka", "igarashi", "ueda"];
  return (
    <div className="App">
      {members.map((member) => (
        <Hello key={member} yourName={member} />
      ))}
    </div>
  );
}
