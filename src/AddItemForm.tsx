import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

//types
type AddItemFormType = {
    addItem: (title: string) => void
}

//component
export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) {
            setError(null)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemCallback()
        }
    }

    const addItemCallback = () => {
        if (title.trim() === '') {
            setError('Title is empty')
        } else {
            addItem(title)
            setTitle('')
        }
    }

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={onChangeTitleHandler}
                onKeyDown={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addItemCallback}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}