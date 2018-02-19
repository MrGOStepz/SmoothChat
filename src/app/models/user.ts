export interface User{
    email:string;
    password:string;
    userName:string;
}

export interface UserProfile{
    $key?: string;
    username: string;
    firstName: string;
    lastName: string;
    id: string;
    listFriend: string[];
}