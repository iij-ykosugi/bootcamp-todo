import { useState } from 'react'

type TodoItem = {
  id: number
  text: string
  done: boolean
}

const newId = () => Date.now()

type TodoItemProps = {
  item: TodoItem
  onCheck: (checked: boolean) => void
  onDelete: () => void
}

function TodoItem({ item, onCheck, onDelete }: TodoItemProps) {
  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={item.done}
        onChange={ev => { onCheck(ev.currentTarget.checked) }}
      />
      <p style={{ textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</p>
      <button className="button-small" onClick={() => onDelete()}>×</button>
    </div>
  )
}

type CreateTodoFormProps = {
  onSubmit: (text: string) => void
}

function CreateTodoForm({ onSubmit }: CreateTodoFormProps) {
  const [text, setText] = useState("")
  return (
    <div className="CreateTodoForm">
      <input
        placeholder="新しいTodo"
        size={60}
        value={text}
        onChange={ev => { setText(ev.currentTarget.value) }}
      />
      <button onClick={() => { onSubmit(text) }}>追加</button>
    </div>
  )
}

const INITIAL_TODO: TodoItem[] = [
  { id: 1, text: 'todo-item-1', done: false },
  { id: 2, text: 'todo-item-2', done: true },
]

const useTodoState = () => {
  const [todoItems, setTodoItems] = useState(INITIAL_TODO)
  const createItem = (text: string) => {
    setTodoItems([...todoItems, { id: newId(), text, done: false }])
  }
  const updateItem = (newItem: TodoItem) => {
    setTodoItems(todoItems.map(item => item.id === newItem.id ? newItem : item))
  }
  const deleteItem = (id: number) => {
    setTodoItems(todoItems.filter(item => item.id !== id))
  }
  return [todoItems, createItem, updateItem, deleteItem] as const
}

function App() {
  const [showingDone, setShowingDone] = useState(true)
  const [keyword, setKeyword] = useState("")
  const [todoItems, createItem, updateItem, deleteItem] = useTodoState()

  const filteredTodoItems = todoItems.filter(item => {
    if (!showingDone && item.done) return false
    return item.text.includes(keyword)
  })

  return (
    <div className="App">
      <h1>ToDo</h1>
      <div className="App_todo-list-control">
        <input placeholder="キーワードフィルタ" value={keyword} onChange={ev => setKeyword(ev.target.value)} />
        <input id="showing-done" type="checkbox" checked={showingDone} onChange={ev => setShowingDone(ev.target.checked)} />
        <label htmlFor="showing-done">完了したものも表示する</label>
      </div>
      {filteredTodoItems.length === 0 ? (
        <div className="dimmed">該当するToDoはありません</div>
      ) : (
        <div className="App_todo-list">
          {filteredTodoItems.map((item, i) => (
            <TodoItem
              key={item.id}
              item={item}
              onCheck={checked => { updateItem({ ...item, done: checked }) }}
              onDelete={() => { deleteItem(item.id) }}
            />
          ))}
        </div>
      )}
      <CreateTodoForm onSubmit={async text => { createItem(text) }} />
    </div>
  )
}

export default App
