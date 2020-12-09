import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import db from '../config';
import * as firebase from 'firebase';

class WriteStSc extends React.Component{

    constructor(){
        super()

        this.state={
            author:"",
            story:"",
            storyName:""
        };
    }

    submitStory = async() => {
        
        db.collection("Stories").add({
            author: this.state.author,
            story: this.state.story,
            title: this.state.storyName,

            date:firebase.firestore.Timestamp.now().toDate(),

            submitted:true,
        });

        this.setState({
            author: '',
            story: '',
            storyName: ''
        });
        
        Alert.alert("Your Story Has Been Uploaded");
    }

    render(){

        return(
            <View>
                <Header
                backgroundColor={"black"}
                centerComponent={{
                    text: "Write A Story",
                    style: {
                        color:'red',
                        fontSize:10
                    }
                }}
                />

                <TextInput
                    style={styling.textInput}
                    placeholder={'Title'} 

                    onChangeText={text=>{
                        this.setState({
                            storyName: text
                        })
                    }}
                />

                <TextInput
                    style={styling.textInput}
                    placeholder={'Your Name'} 

                    onChangeText={text=>{
                        this.setState({
                            author: text
                        })
                    }}
                />

                <TextInput
                    style={styling.textInput}
                    placeholder={'The Story'} 
                    multiline = {true}
                    
                    onChangeText={text=>{
                        this.setState({
                            story: text
                        })
                    }}
                />

                <TouchableOpacity 
                    style={styling.sub}

                    onPress={async()=>{
                        this.submitStory();
                      }}
                    ><Text style={styling.subText}>Upload</Text>
                </TouchableOpacity>

                <KeyboardAvoidingView/>

            </View>
        );
    }
}

const styling = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput:{
        borderWidth:2,
        marginTop:10
    },
    sub:{
        backgroundColor:"blue",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:2,
        borderRadius:5,
        marginTop:30
    },
    subText:{
        color:'white',
        fontSize:10,
        fontWeight:"bold",
        padding:10,
        textAlign:'center',
    }
})

export default WriteStSc;