import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';
const Home = () => {
  const [typeText, settypeText] = useState('');
  const [qrcodeValue, setQrcodeValue] = useState('');
  let qrCode = useRef();

  const shareQRCode = () => {
    console.log('qrCode', qrCode);
    qrCode.toDataURL(callback);
  };

  const callback = async dataURL => {
    console.log('dataURL', dataURL);
    try {
      const result = await Share.open({
        title: 'React Native',
        url: `data:image/png;base64,${dataURL}`,
        subject: 'Share Link',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={typeText => settypeText(typeText)}
          placeholder="Enter your Text here...."
          value={typeText}
        />
        <TouchableOpacity
          style={styles.buttongenerate}
          onPress={() => setQrcodeValue(typeText)}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
        <View
          style={{
            borderTopWidth: 2,
            borderTopColor: 'purple',
            marginTop: 40,
          }}></View>
        <View style={{marginTop: 30, alignSelf: 'center'}}>
          <QRCode
            getRef={ref => (qrCode = ref)}
            value={qrcodeValue ? qrcodeValue : 'NA'}
            size={250}
            color="black"
            backgroundColor="white"
          />
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={shareQRCode}
            style={{
              backgroundColor: 'green',
              width: 50,
              padding: 10,
              borderRadius: 50,

              marginTop: 20,
            }}>
            <Entypo name="share" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{marginTop: 35, marginLeft: 10, fontWeight: 'bold'}}>
            Share QR Code
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 10,
  },
  textInput: {
    flexDirection: 'row',
    height: 45,
    marginTop: 20,
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    width: '80%',
    padding: 10,
  },
  buttongenerate: {
    backgroundColor: 'purple',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 15,
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
