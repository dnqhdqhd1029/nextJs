import { useState } from 'react'
import axios from 'axios'

import ChildComponent from './ChildComponent'

interface Item {
  userId: number
  id: number
  title: string
  completed: boolean
}
const TestComponent = () => {
  const [items, setItems] = useState<Item[]>([]) // [1
  const handleClick = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    console.log(response.data)
    setItems(response.data)
  }
  return (
    <div>
      <p>TestComponent</p>
      <ChildComponent onClick={handleClick} />

      <div>
        {items.map(item => (
          <p key={`test-item-${item.id}`}>{item.title}</p>
        ))}
      </div>
    </div>
  )
}

export default TestComponent
