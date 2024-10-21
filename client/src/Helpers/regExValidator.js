export function isEmailValid(string){
    return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export function isPasswordValid(password){
    return password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*._-]).{6,}$/);
}