import {instance} from '../../../api/api';

export type CardPack = {
    _id: string
    user_id: string
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
}
export type CardPage = {
    cardPacks: Array<CardPack>
    cardPacksTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export const decksAPI = {
    getPacks(token: string, search: string, page?:number) {
        const searchVal =  search.length >= 1 ? `packName=${search}` : ''
        const pageNumber =  page  ? `page=${page}` : ''
        return instance.get<CardPage>(`/cards/pack?token=${token}&${pageNumber}&pageCount=9&${searchVal}`)
            .then(resp => resp.data)
    },
    addPack(token: string) {
        return instance.post(`/cards/pack`,{
            token,
            cardsPack:{}
        })
            .then(resp => resp.data)
    },
    deletePack(token: string, id: string) {
        return instance.delete(`/cards/pack?token=${token}&id=${id}`)
            .then(resp => resp.data)
    },
    updatePack(token: string, id: string) {
        return instance.put(`/cards/pack`,{
            token,
            cardsPack:{
                _id: id,
                name: 'колода обновлена'
            }

        })
            .then(resp => resp.data)
    }

}