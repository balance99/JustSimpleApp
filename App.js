import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import loginScreen from './src/screens/LoginScreen';
import chatScreen from './src/screens/ChatScreen';

// 홈은 로그인 스크린, 로그인 성공시 챗스크린으로 이동
const App = createSwitchNavigator(
  {
    Home: { screen: loginScreen },
    chatScreen: { screen: chatScreen }
  },
  { InitialRouteName: "Home", headerMode: "none" }
);

export default createAppContainer(App);


//import React, {Component} from 'react';
//import {Platform, StyleSheet, Text, View} from 'react-native';
//import SQLite from 'react-native-sqlite-storage';
//import {GiftedChat} from 'react-native-gifted-chat'
//
//const instructions = Platform.select({
//  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//  android:
//    'Double tap R on your keyboard to reload,\n' +
//    'Shake or press menu button for dev menu',
//});
//var aaa;
//const server_ip = '13.115.249.125';
//const API = 'http://13.115.249.125/';
//
//type Props = {};
//export default class App extends Component<Props> {
//
//  // 생성자. 가장 먼저 실행되는 코드
//  constructor(props){
//    super(props);
//
//    // state 초기화
//    this.state = {
//      users: [],
//      fromServer: '',
//    };
//
//    // sqlite 접속
//    const db = SQLite.openDatabase(
//      {
//        name:'jsa.db',
//        location:'default',
//        createFromLocation:'~www/jsa.db',
//      },
//      ()=>{},
//      error=>{
//        console.log(error);
//      }
//    );
//
//    // 쿼리실행
//    db.transaction(tx => {
//      tx.executeSql(
//        'select * from test;',
//        [],
//        (tx, result)=>{
//          let rows = result.rows;
//          let data = [];
//
//          for(let i=0; i<rows.length; i++){
//            data.push({
//              id: rows.item(i).id,
//              name: rows.item(i).name,
//            });
//            aaa = rows.item(i).name;
//          }
//
//          this.setState({
//            users: data,
//          });
//        }
//      );
//    });
//
//  }
//
//  // mount(렌더링) 이후 실행되는 코드
//  componentDidMount() {
//    this.connectByFetch();
//    //this.connectByAjax();
//  }
//
//  render() {
//    let {users} = this.state;
//    return (
///*            <GiftedChat>
//              messages='test',
//              onSend='kkk',
//              user='us'
//            </GiftedChat>*/
//      <View style={styles.container}>
//        <Text style={styles.welcome}>Welcome to React Native!</Text>
//        <Text style={styles.instructions}>{instructions}</Text>
//        <Text>{this.state.fromServer}</Text>
//
//        {users.map(user=>(
//          <View>
//          <Text>{user.id}</Text>
//          <Text>{user.name}</Text>
//          </View>
//        ))}
//      </View>
//    );
//  }
//
//  // 별도 메소드(함수) 선언
//  connectByFetch(){
//    fetch(API, {
//       method: 'GET'
//    })
//    .then((response) => response.text())
//    .then((responseJson) => {
//      console.log(responseJson);
//      this.setState({
//         fromServer: responseJson
//      })
//    })
//    .catch((error) => {
//      console.error(error);
//    });
//  }
//
//  connectByAjax () {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = (e) => {
//       if (request.readyState !== 4) {
//         this.setState({fromServer:91});
//         return;
//       }
//
//       if (request.status === 200) {
//         console.log('success', request.responseText);
//       } else {
//         console.warn('error');
//       }
//     };
//
//     request.open('GET', API);
//     request.send();
//  }
//
//
//}
//
//
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: '#F5FCFF',
//  },
//  welcome: {
//    fontSize: 20,
//    textAlign: 'center',
//    margin: 10,
//  },
//  instructions: {
//    textAlign: 'center',
//    color: '#333333',
//    marginBottom: 5,
//  },
//});
