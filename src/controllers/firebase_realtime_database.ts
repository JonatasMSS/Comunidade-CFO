
import { error } from "console";
import { RT_Database } from "../routes/firebase_app";
import { Database, child, get, ref, set, update } from "firebase/database";
import ms from "ms";
import { async } from "@firebase/util";


//Referencia do banco de dados
const databaseReference = ref(RT_Database);

const RTGetAllUsers = async () => {
    //Pega todos o usuários
    
    get(child(databaseReference,'users'))
    .then((snapshot) => {
        if(snapshot.exists()){
            console.log(snapshot.val()[0]);
        }else{
            console.log('No data')
        }
    }).catch((error) => {
        console.log(error);
    })


}
const RTGetUser = async (uid:string) =>{
    get(child(databaseReference,`users/${uid}`))
    .then((user) => {
        if(user.exists()){
            console.log(user.val())
        }else{
            console.log('No user exist')
        }
    }).catch((error ) => {
       console.log(error);
    })
}

const RTCreateUser = async () => {
    const databaseReferenceWithPath = ref(RT_Database,'users/' + '1');
    set(databaseReferenceWithPath,{
        username: 'new Created User',
        email: 'new Email user',
        childrenData: {
            a: '2'
        }
    })
    .then(() => {
        console.log('Envio concluido');
    }).catch((error) => {
        console.log(error)
    })
}

const RTUpdateUserData = async () => {
   
    const databaseReferenceWithPath = ref(RT_Database,'users/1');
    update(databaseReferenceWithPath,{
        username: 'Alterado'
    }).then(() => {console.log("Deu certo")}).catch((error) => console.log(error))
}
