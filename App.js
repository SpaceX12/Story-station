import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WriteStSc from './screens/WriteStSc';
import ReadStSc from './screens/ReadStSc';

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>

        <AppContainer/>

      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  WriteYourOwn: WriteStSc,
  ReadStories: ReadStSc
},
{
  defaultNavigationOptions:({navigation})=>({

    tabBarIcon:()=>{
      const routeName = navigation.state.routeName;

      if(routeName === "WriteYourOwn"){
        return(
          <Image
            source={require("./Images/PRO+C70+Images/write.png")}
            style={{
              width:40, 
              height:40
            }}
            />
        )
      }else if(routeName === "ReadStories"){
        return(
          <Image
          source={require("./Images/PRO+C70+Images/read.png")}
          style={{
            width:40,
            height:40
          }}
          />
        )
      }
    }
  })
})

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

