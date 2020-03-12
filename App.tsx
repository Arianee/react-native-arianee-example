import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import './global';
import {Arianee} from "@arianee/arianeejs";

export default function App() {

    const $wallet=new Arianee().init()
        .then(arianee=>arianee.fromRandomKey());

    $wallet.then(async w=>{
        console.log("here")
        await w.requestPoa();
        await w.methods.approveStore();
       const b= await w.methods.balanceOfPoa();
       console.log(b);
    })

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app! {Date.now()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
