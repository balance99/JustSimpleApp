import React, { Component } from 'react'
import { Container, Content, Header, Left, Body, Right, Button, Title, Icon, Toast } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import SQLite from 'react-native-sqlite-storage';

// 서버 주소
const API = 'http://3.112.67.233:3002/chat/insert';
const API2 = 'http://3.112.67.233:3002/chat/select';

// 메인 채팅 화면
export default class chatScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      responseData: '',
      showToast: false,
    };
  }

// 예시 메시지
  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam("id");
    this.getPreviousMessages(id);

  }

  // 이전 대화내용 불러오기
  // TODO 어디까지 불러올 것인가 결정(DB SELECT 단계부터 for문 표시까지)
  getPreviousMessages(id){
    fetch(API2, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          }),
        })
        .then((response) => response.text())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            messages: [{
              _id: 1,
              text: 'Welcome ' + JSON.parse(responseJson)[1].user_message,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        })
      })
     .catch((error) => {
      console.error(error);
      });
  }

// 메시지 전송
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    })),
// 내가 입력한 메시지 (메시지 본문, 유저 아이디, 입력 시간 순)
//    alert(messages[0].text + messages[0].user._id + messages[0].createdAt),
          fetch(API, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: messages[0].user._id,
              user_message: messages[0].text,
              sended_date: messages[0].createdAt,
              }),
            })
          .then((response) => response.text())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({
            fromServer: responseJson
              })
            })
          .catch((error) => {
          console.error(error);
          });
  }

// 로그인 화면으로 이동
// TODO 로그아웃 기능 추가
  moveBack() {
    const { navigate } = this.props.navigation;
    navigate('Home')
  }

  render() {
    return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Chat</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='search' />
          </Button>
          <Button transparent>
            <Icon name='heart' />
          </Button>
          <Button transparent onPress={() => this.moveBack()}>
            <Icon name='more' />
          </Button>
        </Right>
      </Header>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        createdAt={new Date()}
        user={{
          _id: this.props.navigation.getParam("id"),
        }}
      />
      </Container>
    )
  }
}
