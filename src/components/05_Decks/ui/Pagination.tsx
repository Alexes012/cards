import React, {useState} from 'react';

type PaginationType = {
    cardPacksTotalCount: number
    page: number
    onPageChanged: (number: number) => void

}
export const Pagination = (props: PaginationType) => {
    let [portionNumber, setPortionNumber] = useState(1)
    let pageCount = Math.ceil(props.cardPacksTotalCount / 9)
    let sizePage = []
    for (let i = 1; i <= pageCount; i++) {
        sizePage.push(i)
    }
    const portionSize = 10
    const portionCount = Math.ceil(pageCount / portionSize)
    const leftPortion = (portionNumber - 1) * portionSize + 1
    const rightPortion = portionNumber * portionSize
    const filteredPage = sizePage.filter(p => p >= leftPortion && p <= rightPortion)
    return (
        <div>{portionNumber > 1 && <span onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}> <b>LEFT</b> </span>}
            {filteredPage.map(p => {
                return <span onClick={() => props.onPageChanged(p)} key={p}>{p === props.page ? <b>{p}</b> : p}</span>
            })}
            {rightPortion && <span onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}> <b>RIGHT</b> </span>}
        </div>

    )
}