const zod = require('zod');

const signUp = zod.object({
    username: zod.string().min(1, "Username is required").email(),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    firstname: zod.string().min(1, "First name is required"),
    lastname: zod.string().min(1, "Last name is required"),
})

const signIn = zod.object({
    username: zod.string().min(1, "Username is required").email(),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
})

const updateUser = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional(),
})


module.exports = {
    signUp, 
    signIn,
    updateUser
}