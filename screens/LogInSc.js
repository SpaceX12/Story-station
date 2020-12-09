import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import * as firebase from 'firebase'

export default class LogInSc extends React.Component{

    constructor(){
        super();

        this.state={
            emailId:'',
            password:''
        }
    }

    login = async(email, password)=>{

        if(email && password){
            console.log('yes');
            try{
                const reply = await firebase.auth().signInWithEmailAndPassword(email, password);
                if(reply){
                    console.log('hallo');
                    this.props.navigation.navigate('WriteYourOwn');
                }
            }
            catch(error){
                switch(error.code){
                case 'auth/user-not-found':
                    Alert.alert("User Dosen't Exist")
                    console.log("doesn't exist")
                    break
                case 'auth/invalid-email':
                    Alert.alert('Incorrect E-Mail ID')
                    console.log('invaild')
                    break
                case 'auth/wrong-password':
                    Alert.alert('Incorrect Password')
                    console.log('Invalid')
                    break    
                }
            }
        }else{
            console.log('no');
            Alert.alert('Enter E-mail and Password');
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20}}>
                <View>
                    <Image
                        source={require("../Images/PRO+C70+Images/A_Book.png")}
                        style={{width:200, height: 200}}/>
                    <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
                </View>
                <View>
                    <TextInput
                    style={styler.loginBox}
                    placeholder="abc@example.com"
                    keyboardType ='email-address'
                    onChangeText={(text)=>{
                        this.setState({
                        emailId: text
                        })
                    }}/>

                    <TextInput
                    style={styler.loginBox}
                    secureTextEntry = {true}
                    placeholder="enter Password"
                    onChangeText={(text)=>{
                        this.setState({
                        password: text
                        })
                    }}/>
                </View>
                <View>
                    <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
                    onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
                        <Text style={{textAlign:'center'}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styler = StyleSheet.create({
    loginBox:
    {
      width: 300,
      height: 40,
      borderWidth: 1.5,
      fontSize: 20,
      margin:10,
      paddingLeft:10
    }
  })