export interface SignInCredentials {
    email: string,
    password: string
}

export interface SignUpCredentials {
    name: string,
    email: string,
    password: string
}

export interface UserProfileData {
    name: string,
    email: string,
    password: string,
    address: string,
    region: string,
    number: string,
    avatarLink: string
}

export const emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/g;
