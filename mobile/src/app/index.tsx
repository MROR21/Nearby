import { View, Text } from "react-native"
import {router} from "expo-router"

import { Steps } from "@/comoponents/steps"
import { Button } from "@/comoponents/button"
import { Welcome } from "@/comoponents/welcome"


export default function Index() {
    return(
        <View 
          style={{flex: 1, padding: 40, gap: 40 }}
        > 
         
            <Welcome />
            <Steps/>

            <Button isLoading = {false} onPress={()=> router.navigate("/home")}>
                <Button.Title>Começar</Button.Title>
            </Button>

        </View>
    )
}