import React, { Component } from 'react'
import { Container, Content, Header, Left, Body, Right, Button, Title, Icon, Toast } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import SQLite from 'react-native-sqlite-storage';

// 메인 채팅 화면
export default class chatScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    messages: [],
    showToast: false
    };
  }

// 예시 메시지
  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam("id");
    this.setState({
      messages: [
        {
          _id: 1,
          text: id,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

// 메시지 전송
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    })),
// 내가 입력한 메시지
    alert(messages[0].text)
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
        user={{
          _id: 1,
        }}
      />
      </Container>
    )
  }
}
