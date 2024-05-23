import {COLORS} from "../../constants"
import { useMyContextController } from "../context"
import { useEffect } from "react"
import Services from "./Services"
import ServicesDetail from "./ServicesDetail"
import { createStackNavigator } from "@react-navigation/stack"
import AddNewServices from "./AddNewServices"

const Stack = createStackNavigator();
export default RouterServices = ({navigation}) =>{
    const [controller,dispatch] =useMyContextController();
    const {userLogin} = controller;
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    },[userLogin])
    return(

        <Stack.Navigator initialRouteName='Login'>
            
            <Stack.Screen name="Services" component={Services}
            options={{
                headerShown:false
            }}/>
            <Stack.Screen name="AddNewServices" component={AddNewServices}
            options={{
                headerStyle:{backgroundColor:COLORS.pink},
            }}/>
            <Stack.Screen name="ServicesDetail" component={ServicesDetail}
            options={{
                headerShown: false,
                headerStyle:{backgroundColor:COLORS.pink}
            }}/>
            
        </Stack.Navigator>
    )
}