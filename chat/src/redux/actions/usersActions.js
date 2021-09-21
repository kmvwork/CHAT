export const addContact =({name, secondName, email, password}) => {
    return {
        type: "ADD_USER", payload: {
            name,
            secondName,
            email,
            password
        }
    }
}