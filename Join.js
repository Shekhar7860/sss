import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Share,
  Image,
  StatusBar,
  TouchableHighlight,
  Picker,
} from 'react-native';

import React, {Component} from 'react';
import firebase from 'react-native-firebase';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const advert2 = firebase
  .admob()
  .rewarded('ca-app-pub-3671018146205481/9471072168');
const advert = firebase
  .admob()
  .interstitial('ca-app-pub-1499256017442751/7824579192');
const request = new AdRequest();
request.addKeyword('foobar');
export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      name: '',
      location: '',
      topic: 'content',
      status: '',
    };
  }
  componentDidMount = () => {
    if (this.props.navigation.state.params) {
      this.setState({status: this.props.navigation.state.params.status});
      // alert(JSON.stringify(this.props.navigation.state.params.status));
    }
  };
  static navigationOptions = {
    title: 'Welcome',
  };
  goToProducts = () => {
    // AdSettings.addTestDevice(AdSettings.currentDeviceHash);
    // InterstitialAdManager.showAd("434555400602082_434557547268534")
    // .then(didClick => {
    //   console.log('working')
    // })
    // .catch(error => {
    //   console.log(error, 'fb add rror')
    // });
    advert.loadAd(request.build());
    advert2.loadAd(request.build());

    advert2.on('onAdLoaded', () => {
      console.log('Advert2 ready to show.');
    });

    advert2.show();

    advert.on('onAdLoaded', () => {
      console.log('Advert ready to show.');
    });

    setTimeout(() => {
      if (advert.isLoaded()) {
        console.log('working');
        advert.show();
      } else {
        console.log('error occured');
      }
    }, 1000);
    this.props.navigation.navigate('ScreenOne');
  };
  share = () => {
    Share.share(
      {
        message:
          'Checkout Modicare Products - https://play.google.com/store/apps/details?id=com.newadd',
        url: 'https://play.google.com/store/apps/details?id=com.newadd',
        title: 'Start Your Own Business',
      },
      {
        // Android only:
        dialogTitle: 'Share the app',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };

  setName = name => {
    this.setState({name: name});
  };

  setMobile = mobile => {
    this.setState({mobile: mobile});
  };

  setLocation = location => {
    this.setState({location: location});
  };

  submit = () => {
    if (
      this.state.name &&
      this.state.mobile &&
      this.state.location &&
      this.state.topic &&
      this.state.mobile.length == 10
    ) {
      firebase
        .database()
        .ref('requests')
        .once('value')
        .then(snapshot => {
          // console.log(snapshot.numChildren(), 'fkkfkfk');
          if (snapshot.numChildren() < 50) {
            firebase
              .database()
              .ref('requests')
              .push({
                name: this.state.name,
                mobile: this.state.mobile,
                location: this.state.location,
                date: Date(),
                topic: this.state.topic,
                status: this.state.status,
              })
              .then(data => {
                this.setState({name: ''});
                this.setState({mobile: ''});
                this.setState({location: '', topic: '', status: ''});
                alert('data received..you will receive call shortly');
              })
              .catch(error => {
                3595763413732;
                //error callback
                console.log('error ', error);
              });
          } else {
            alert('an error occured! please try again after some time ');
          }
        })
        .catch(error => {});

      console.log(
        'name',
        this.state.name,
        'mobile',
        this.state.mobile.length,
        'location',
        this.state.location,
      );
    } else {
      alert('please enter valid details');
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.content}>
          <View style={styles.messageBox}>
            <Text style={styles.topText}>Need/Post Work</Text>

            <Text style={styles.messageBoxBodyText}>Fill Details</Text>
            <TextInput
              style={styles.textInputWidth}
              placeholder="Enter Name"
              value={this.state.name}
              onChangeText={text => this.setName(text)}
              keyboardType="default"
            />
            <TextInput
              style={styles.textInputWidth}
              placeholder="Enter Mobile"
              value={this.state.mobile}
              onChangeText={text => this.setMobile(text)}
              keyboardType="numeric"
              maxLength={10}
            />
            <TextInput
              style={styles.textInputWidth}
              placeholder="Enter Location"
              value={this.state.location}
              onChangeText={text => this.setLocation(text)}
            />

            <Text style={styles.textInputWidth2}> Choose Your Topic </Text>
            <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemPosition) =>
                this.setState({topic: itemValue, choosenIndex: itemPosition})
              }>
              <Picker.Item label="Content" value="Content" />
              <Picker.Item label="Data Entry" value="DataEntry" />
              <Picker.Item label="Mobile App" value="MobileApp" />
              <Picker.Item label="Website Development" value="Website" />
              <Picker.Item label="S.E.O" value="S.E.O" />
            </Picker>
            <TouchableHighlight
              style={styles.fullWidthButton}
              onPress={() => this.submit()}>
              <Text style={styles.fullWidthButtonText}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.footer}>
          <Banner
            style={{alignSelf: 'center'}}
            size={'SMALL_BANNER'}
            unitId={'ca-app-pub-1499256017442751/3338539271'}
            request={request.build()}
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#81c04d',
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row', //Step 1
  },
  toolbarButton: {
    width: 50, //Step 2
    color: '#fff',
    textAlign: 'center',
  },
  toolbarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20, //Step 3
  },
  mainContainer: {
    flex: 1, //Step 1
  },
  content: {
    backgroundColor: '#ebeef0',
    flex: 1, //Step 2
  },
  messageBox: {
    alignItems: 'center',
    width: '100%',
  },
  messageBoxBodyText: {
    margin: 10,
    fontSize: 18,
  },
  messageBoxBodyText2: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  messageBoxBodyText3: {
    marginTop: 5,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  topText: {
    fontSize: 25,
    marginTop: 10,
    fontWeight: 'bold',
  },
  topText2: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  inputsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textInputWidth: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
  },
  textInputWidth2: {
    width: '80%',
    fontSize: 20,
    marginBottom: 10,
  },
  fullWidthButton: {
    backgroundColor: '#e67e22',
    marginTop: 20,
    height: 50,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    height: 50,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
});
