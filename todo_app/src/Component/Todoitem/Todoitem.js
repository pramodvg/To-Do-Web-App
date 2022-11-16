import React from 'react'
import Todosingleitem from './Todosingleitem'
export default React.memo(function Todoitem(props) {

  // const [todoList, setTodoList] = useState([])

  // const addTodaListData = (listData) => {
  //   setTodoList({
  //     arrayvar: [...todoList, listData]
  //   })
  // }
  return (
    <div className='todo_item_container'>
      <div className='todo-item-box'>
        <p>Todo List</p>
        {
          props.mTodoList.map((data, i) => {
            console.log(JSON.stringify(data))
            return <Todosingleitem key={i} mData={data} mDelete={props.mDelete} itemSelect={props.itemSelect} />
          })
        }
      </div>

    </div>
  )
})
