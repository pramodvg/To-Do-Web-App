import React from 'react'
import todoItemSyle from './Todoitem.css'
export default React.memo(function Todosingleitem(props) {
    let tick = null
    if (props.mData.isSelected) {
        tick = (<img src='/Photos/accept.png' />)
    }
    return (
        <>
            <div className='todoItembox-container'>
                <div className='todoItembox'>
                    {tick}
                    <p className='todotitle'>{props.mData.title}</p>

                    <p className='todoitemtext' onClick={() => { props.itemSelect(props.mData) }}>{props.mData.dis}</p>
                    <div className='btn-contain'><button className='btn-contain-button' hidden onClick={() => { props.mDelete(props.mData) }}>Delete</button></div>
                </div>
            </div>
        </>
    )
})


