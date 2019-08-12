import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

// 로그인 화면

// 서버 주소
const API = 'http://3.112.67.233:3001/users/login';

export default class loginScreen extends Component {

  static navigationOptions = {
    title: 'Login',
  };

  constructor(props){
    super(props);

    // state 초기화
    this.state = {
      fromServer: '',
      id_input: '',
      pw_input: '',
      };
    }

connectByFetch(){
    // 네비게이션
    const { navigate } = this.props.navigation;
    fetch(API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id_input,
        pw: this.state.pw_input,
        }),
      })
    .then((response) => response.text())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
      fromServer: responseJson
        })
         // 서버 응답 있을 시 화면 이동(아이디를 화면에 전달)
         if (responseJson.length > 0) {
           navigate('chatScreen', { id: this.state.id_input })
          }
      })
    .catch((error) => {
    console.error(error);
    });
  }



  // 화면 렌더: 아이디와 패스워드를 3자리 입력하기 전에는 로그인 버튼 비활성화
  render(prop) {
    if (this.state.id_input.length > 3 && this.state.pw_input.length > 3) {
      login_button = <Button block onPress={() => this.connectByFetch()}><Text>Login</Text></Button>
    } else {
      login_button = <Button block light disabled><Text>Login</Text></Button>
    } return (
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(id_input) => this.setState({id_input})} value={this.state.id_input}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(pw_input) => this.setState({pw_input})}/>
            </Item>
          </Form>
          {login_button}
          <Text>{this.state.fromServer}</Text>
        </Content>
      </Container>
    );
  }
}