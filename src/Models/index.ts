export interface Link{
    fullUrl: string,
    shortUrl: string,
    isPrivate: boolean,
    userId: string | undefined,
}

export interface User{
    email: string,
    password: string,
    rememberMe: boolean,  
}
export interface RegisterUser{
    email: string,
    password: string,
    year: string,
}
