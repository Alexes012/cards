import {instance} from '../../../api/api';

export type UserType = {
    avatar: null | string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    success: boolean
    token: string
    tokenDeathTime: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
}

export const profileAPI = {
    autMe(token: string) {
        return instance.post<UserType>('/auth/me', {token})
            .then(resp => resp.data)
    }
}
