import { useState } from 'react'

/** リスト表示の対象となる、個々のToDoを表す型。*/
export type TodoItem = {
  /** 表示や操作の対象を識別するために利用する、全ての`TodoItem`の中で一意な値。 */
  id: number
  /** ToDoの内容となる文字列。 */
  text: string
  /** 完了すると`true`となる。 */
  done: boolean
}

type TodoListItemProps = {
  item: TodoItem
}

/** ToDoリストの個々のToDoとなるReactコンポーネント。 */
function TodoListItem({ item }: TodoListItemProps) {
  return (
    <div className="TodoItem">
      <p style={{ textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</p>
    </div>
  )
}

type ValueViewerProps = {
  value: any
}

/** `value`の内容を`JSON.stringify`して表示する、動作確認用コンポーネント。 */
function ValueViewer({ value }: ValueViewerProps) {
  return (
    <pre className="ValueViewer">
      {JSON.stringify(value, undefined, 2)}
    </pre>
  )
}

/** ToDoリストの初期値。 */
const INITIAL_TODO: TodoItem[] = [
  { id: 1, text: 'todo-item-1', done: false },
  { id: 2, text: 'todo-item-2', done: true },
]

/** アプリケーション本体となるReactコンポーネント。 */
export default function App() {
  const todoItems = INITIAL_TODO
  const [keyword, setKeyword] = useState("")

  const filteredTodoItems = todoItems.filter(item => {
    return item.text.includes(keyword)
  })

  return (
    <div className="App">
      <h1>ToDo</h1>
      <div className="App_todo-list-control">
        <input placeholder="キーワードフィルタ" value={keyword} onChange={ev => setKeyword(ev.target.value)} />
      </div>
      {filteredTodoItems.length === 0 ? (
        <div className="dimmed">該当するToDoはありません</div>
      ) : (
        <div className="App_todo-list">
          {filteredTodoItems.map((item, i) => (
            <TodoListItem key={item.id} item={item} />
          ))}
        </div>
      )}
      <ValueViewer value={{ keyword, todoItems, filteredTodoItems }} />
    </div>
  )
}
