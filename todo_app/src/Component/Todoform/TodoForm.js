import React, { useState, useEffect, useRef } from 'react'
import formdivcss from './todoForm.css'
import Todoitem from '../Todoitem/Todoitem';
import axios from '../../axios';
import axi from 'axios'

export default function TodoForm() {
  const focusTitle = useRef()
  const [title, settitle] = useState("")
  const [dis, setdis] = useState("")
  const [selectedItem, setSelectedItem] = useState([])
  const [todoData, setState] = useState([]);
  const [selectCount, setselectCount] = useState(0)
  useEffect(
    () => {
      const cancelToken = axi.CancelToken.source();
      async function fetchData() {
        const req = await axios.get("/todoList", {
          cancelToken: cancelToken.token
        })
        setState(req.data)
      }
      fetchData()
      return () => {
        cancelToken.cancel()
      }
    }, [])


  async function onSubmit(e) {
    e.preventDefault();
    if (title === "" || dis === "") {
      alert("Fields should not be empty!!")
      return
    }
    await axios.post("/addtodoList", { title: title, dis: dis, isSelected: false })
      .then((res) => {
        setState(prevState => ([
          ...prevState,
          res.data
        ]));
        clearText()
        focusTitle.current.focus()
      }).catch((err) => {
        console.log(err)
      })

  };

  const onDelete = (mitem) => {
    setState(todoData.filter((e) => {
      return e !== mitem
    }))

  }

  const onItemSelect = (mItem) => {
    settitle(mItem.title)
    setdis(mItem.dis)
    mItem = updateSelection(mItem)
    setSelectedItem(mItem)
    updateList(mItem)
  }

  const onUpdate = (e) => {
    e.preventDefault();
    let mItem = selectedItem
    if (Object.keys(mItem).length === 0) {
      alert("Please select item!!")
      return
    }
    mItem.title = title
    mItem.dis = dis
    mItem = updateSelection(mItem)
    updateList(mItem)
    clearText()
  }

  function updateSelection(mItem) {
    if (mItem.isSelected) {
      setselectCount(selectCount - 1)
      mItem.isSelected = false
    } else {
      setselectCount(selectCount + 1)
      mItem.isSelected = true
    }
    return mItem
  }

  async function updateList(mItem) {
    await axios.post("/updateItem", mItem)
      .then((res) => {
        console.log("UUUUUUUu>>>>>" + JSON.stringify(res.data))
      }).catch((err) => {
        console.log(err)
      })

    setState(current =>
      current.map(obj => {
        if (obj._id === mItem._id) {
          return mItem;
        }
        return obj;
      }),
    );
  }

  function clearText() {
    settitle("")
    setdis("")
  }

  async function deleteSelected(e) {
    e.preventDefault();
    let mId = []
    const mTodoList = todoData.filter((e) => {
      if (!e.isSelected !== true) {
        mId.push(e._id)
        return false
      } else return true
    })
    await axios.post("/deleteItem", mId)
      .then((res) => {
        setState(mTodoList)
        setselectCount(0)
        clearText()
      }).catch((err) => {
        console.log(err)
      })


  }

  return (
    <div className=".form_div">
      <form name='myForm'>
        <input className='todoitemtext' ref={focusTitle} placeholder='Title' type="text" name='inputTitle' value={title} onChange={(e) => { settitle(e.target.value) }} /><br /><br />
        <input className='todoitemtext' placeholder='Description' type="text" name='inputDis' value={dis} onChange={(e) => { setdis(e.target.value) }} /><br />
        <button className='btn-contain-button' onClick={onSubmit}>Add</button>

        {
          selectCount > 0 ? <button className='btn-contain-button' onClick={onUpdate}>Update</button> : <></>
        }
        {
          selectCount > 0 ? <button className='btn-contain-button' onClick={deleteSelected}>Delete</button> : <></>
        }
      </form>
      {
        todoData.length > 0 ? <Todoitem mTodoList={todoData} mDelete={onDelete} itemSelect={onItemSelect} /> : <p>Nothing Yet!!</p>
      }
    </div>
  )
}
