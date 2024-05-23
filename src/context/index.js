import {createContext, useContext, useReducer, useMemo, act} from "react"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

const MyContext = createContext();
MyContext.displayName = "MyContextContext";
function reducer(state, action)
{
    switch(action.type)
    {
        case "USER_LOGIN":{
            return{...state,userLogin: action.value};
        }
        default:{
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
function MyContextControllerProvider({children})
{
    const initialState = {
        userLogin: null,
    };
    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => [controller,dispatch], [controller,dispatch]);
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
function useMyContextController()
{
    const context = useContext(MyContext);
    if(!context){
        throw new Error(
            "useMyContextController should be used inside the MycontextControllerProvider. "
        );
    }
    return context;
}
const USERS = firestore().collection("USERS")
const SERVICES = firestore().collection("SERVICES")

const login = (dispatch,email,password) =>{
    auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        USERS.doc(email)
            .onSnapshot(u => {
                if (u.exists) {
                    const value = u.data();
                    console.log("Đăng nhập thành công với user: ", value);
                    dispatch({ type: "USER_LOGIN", value });
                } else {
                    console.log("Không có dữ liệu người dùng cho email này.");
                }
            });
    })
    .catch(e => {
        alert("Sai tài khoản hoặc mật khẩu");
    });

}
const logout = (dispatch) =>{
    dispatch({type: "USER_LOGIN",});
}
const createNewService = (newService) => {
    newService.finalUpdate = firestore.FieldValue.serverTimestamp()
    SERVICES.add(newService)
    .then(() => alert("Add new service ! "))
    .catch((e) => alert(e))
}
export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
    createNewService
};