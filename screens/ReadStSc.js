import { database } from 'firebase';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Header } from "react-native-elements";
import db from "../config";

class ReadStSc extends React.Component{

    constructor(props){
        super(props);

        this.state={
            search:'',
            stories:[],
            lastStory:null
        };
    }


    getStories = async()=>{

        var text = this.state.search

        const query = await db.collection('Stories').where('title', '==', text).startAfter(this.state.lastStory).limit(8).get();

        query.docs.map((doc)=>{
            this.setState({
                stories:[...this.state.stories, doc.data()],
                lastStory: doc
            })
        })
    }

    searchStories = async(text)=>{
        const result = await db.collection('Stories').where('title','==',text).get()
        
        result.docs.map((doc)=>{
            this.setState({
                stories:[...this.state.stories, doc.data()],
                lastStory:doc
            })
            
        })
    }

    componentDidMount = async() =>{
        const query = await db.collection('Stories').limit(8).get()

        query.docs.map((doc)=>{
            this.setState({
                stories:[],
                lastStory:  doc
            })
        })
    }

    render(){

        const  search  = this.state.search;

        return(
            <View>
                  <Header
                backgroundColor={"black"}
                centerComponent={{
                    text: "Read A Story!",
                    style: {
                        color:'red',
                        fontSize:10
                    }
                }}
                />

                
                <View style={styling.bar} >
                    <TextInput style={styling.txtin}
                    placeholder = {'Stories'}
                    onChangeText={(text)=>{this.setState({search:text})}} />

                    <TouchableOpacity style={styling.hallo}
                    onPress={async()=>{
                        this.searchStories(this.state.search)
                    }}
                    ><Text style={styling.halloTxt}>Search</Text></TouchableOpacity>
                </View>
                
                <View>

                    <FlatList
                        data={this.state.allTransactions}
                        renderItem={({item})=>(
                            <View style={{borderBottomWidth: 2}}>
                            <Text>{"Title: " + item.title}</Text>
                            <Text>{"Author: " + item.author}</Text>
                            <Text>{"Published: " + item.date.toDate()}</Text>
                            </View>
                        )}

                        keyExtractor= {(item, index)=> index.toString()}
                        onEndReached ={this.getStories()}
                        onEndReachedThreshold={0.7}
                    /> 

                </View>

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
    hallo:{
        borderWidth:1,
        height:30,
        width:42,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'green',
        paddingTop:10
    },
    halloTxt:{
        fontWeight:'bold',
        alignItems:'center'
    },
    bar:{
        flexDirection:'row',
        height:70,
        width:'auto',
        alignItems:'center'
    },
    txtin:{
      borderWidth:2,
      height:30,
      width:80,
      paddingLeft:10,
    }
})

export default ReadStSc;