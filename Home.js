import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;

const advert = firebase
	.admob()
	.interstitial('ca-app-pub-1499256017442751/6779430141');
const request = new AdRequest();
request.addKeyword('foobar');
export default class Home extends Component {
	takeMe = val => {
		// alert("hiiii")
		advert.loadAd(request.build());

		advert.on('onAdLoaded', () => {
			console.log('Advert ready to show.');
		});

		setTimeout(() => {
			if (advert.isLoaded()) {
				advert.show();
			} else {
				console.log('error occured');
			}
		}, 1000);

		this.props.navigation.navigate('Join', {status: val});
	};
	componentDidMount = () => {};
	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
					<TouchableOpacity
						onPress={() => this.takeMe('providing')}
						style={{
							marginTop: 40,
							backgroundColor: '#e67e22',
							borderRadius: 10,
							width: '90%',
							alignSelf: 'center',
							height: 50,
							justifyContent: 'center',
						}}>
						<Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
							Are You Providing Work?
						</Text>
					</TouchableOpacity>

					<Text style={{textAlign: 'center', fontSize: 50}}>OR </Text>

					<TouchableOpacity
						onPress={() => this.takeMe('searching')}
						style={{
							marginTop: 10,
							backgroundColor: '#e67e22',
							borderRadius: 10,
							width: '90%',
							alignSelf: 'center',
							height: 50,
							justifyContent: 'center',
						}}>
						<Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
							Are You Searching Work?
						</Text>
					</TouchableOpacity>
				</View>
				<Banner
					style={{alignSelf: 'center', marginLeft: 0, marginTop: 20}}
					size={'SMALL_BANNER'}
					unitId={'ca-app-pub-1499256017442751/5964702614'}
					request={request.build()}
					onAdLoaded={() => {
						console.log('Advert loaded');
					}}
				/>
			</View>
		);
	}
}
