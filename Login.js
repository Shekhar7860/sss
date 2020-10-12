import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');
export default class Login extends Component {
  takeMe = () => {
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Banner
          style={{alignSelf: 'center', marginLeft: 0, marginTop: 20}}
          size={'SMALL_BANNER'}
          unitId={'ca-app-pub-1499256017442751/6367015531'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />
        <Text style={{marginTop: 10, fontSize: 19, textAlign: 'center'}}>
          Welcome To Content Writing Services
        </Text>
        <Text
          style={{marginTop: 20, fontSize: 19, textAlign: 'center', margin: 5}}>
          Here You Can Find/Post Your Requirements related to content, data
          entry, app development, website development etc
        </Text>
        <Text
          style={{marginTop: 20, fontSize: 19, textAlign: 'center', margin: 5}}>
          {' '}
          So, if you are looking for part time work or work from home, click on
          the button below
        </Text>
        <TouchableOpacity
          onPress={() => this.takeMe()}
          style={{
            position: 'absolute',
            bottom: 20,
            backgroundColor: '#e67e22',
            borderRadius: 10,
            width: '90%',
            alignSelf: 'center',
            height: 50,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
            Lets Start
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
