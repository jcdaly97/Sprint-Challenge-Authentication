const db = require('../database/dbConfig')

module.exports = {
    addUser,
    getUsers,
    getUsersBy
}

function getUsers(){
    return db('users').select('id', 'username')
}

function getUsersBy(param){
    return db('users').where(param)
}

async function addUser(user){
    try{
        const [newID] = await db('users').insert(user)
        return getUsersBy({id: newID}).select('id', 'username').first()
    }catch(err){
        throw err
    }
}