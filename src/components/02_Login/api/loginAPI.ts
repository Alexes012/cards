import {instance} from '../../../api/api';


export const loginAPI = {
    loginIn(email: string,password: string, rememberMe: boolean) {
        return instance.post('/auth/login', {email,password, rememberMe})
            .then(resp => resp.data)
    }
}