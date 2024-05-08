export interface SignInCredentials {
    email: string,
    password: string
}

export interface SignUpCredentials {
    name: string,
    email: string,
    password: string
}


export const emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;