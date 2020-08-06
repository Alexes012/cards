import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from './Decks.module.css'
import Input from '../../../helpComponents/input/Input';
import {useDispatch, useSelector} from 'react-redux';
import {getPacksThunk, paginationThunk, thunkAddPack, thunkDeletePack, thunkUpdatePack} from '../bll/DecksReducer';
import {storeType} from '../../../bll/store';
import {Pagination} from './Pagination';


function Decks() {
    const {loading, error, cardPacks, cardPacksTotalCount, page} = useSelector((state:storeType) => state.decks)
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getPacksThunk())
    },[dispatch])

    const onAddPacks = () => dispatch(thunkAddPack())
    const deleteCard = (id: string) => dispatch(thunkDeletePack(id))
    const updateCard = (id: string) => dispatch(thunkUpdatePack(id))
    const onSearchInput =  (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value)
        dispatch(getPacksThunk(search))
    }
    const onBlurHandler = () =>setSearch('')
    const changePageHandler = (val: number) => {
        dispatch(paginationThunk(val))
    }
    return (
        <div className={styles.decks}>
            <Input type={'search'} placeholder={'search'} value={search} onChange={onSearchInput} onBlur={onBlurHandler}/>
            <Pagination cardPacksTotalCount={cardPacksTotalCount}
                        page={page} onPageChanged={changePageHandler}/>
            <div  className={styles.overlay}>
                <div>name</div>
                <div>cards Count</div>
                <button onClick={onAddPacks} disabled={loading}>addPack</button>
            </div>
            <div style={{display: 'flex', justifyContent:'center'}}>
                { loading ? <b>'loading'</b> : <br/> ||
                error ? <span style={{color: 'red'}}>{error}</span> : <br/> }
            </div>
            {cardPacks.map(el => {
                return <PacksPage
                    key={el._id} name={el.name} grade={el.grade}
                    deleteCard={deleteCard} id={el._id} updateCard={updateCard}
                    disabled={loading}
                />
            })}

        </div>
    )
}

export default Decks;
type PackPageType = {
    name: string
    grade: number
    id: string
    disabled: boolean
    deleteCard: (id: string) => void
    updateCard: (id: string) => void
}

const PacksPage = (props:PackPageType) => {
    return <div className={styles.overlay}>
        <div style={{width:'100px',display:'flex'}}>{props.name}</div>
        <div>{props.grade}</div>
        <button onClick={() => props.deleteCard(props.id)} disabled={props.disabled}>del</button>
        <button onClick={() => props.updateCard(props.id)} disabled={props.disabled}>update</button>
        <a href="a">cards</a>
        <a href="a">learn</a>
    </div>
}

