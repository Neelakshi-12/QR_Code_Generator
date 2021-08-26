import React, {useCallback, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Barcode from 'react-native-barcode-svg';
import {Icon} from 'react-native-elements';
import {Surface, Shape} from '@react-native-community/art';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';
import {Base64} from 'js-base64';
import {captureScreen} from 'react-native-view-shot';
import {captureRef} from 'react-native-view-shot';
import ViewShot from 'react-native-view-shot';

const Details = () => {
  const [typeText, settypeText] = useState('');
  const [barcodeValue, setbarcodeValue] = useState('');
  const [imageURI, setImageURI] = useState(null);
  const [savedImagePath, setSavedImagePath] = useState('');
  const full = useRef();
  const viewRef = useRef();

  // const takeScreenShot = () => {
  //   captureScreen({
  //     format: 'jpg',
  //     quality: 0.8,
  //   }).then(
  //     uri => {
  //       setSavedImagePath(uri);
  //       setImageURI(uri);
  //     },
  //     error => console.error('Oops, Something Went Wrong', error),
  //   );
  // };
  const takeScreenShot = useCallback(() => {
    full.current.capture().then(
      uri => {
        setSavedImagePath(uri);
        setImageURI(uri);
      },
      error => console.error('Oops, Something Went Wrong', error),
    );
  }, []);

  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      const shareResponse = await Share.open({url: uri});
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ScrollView>
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
            onPress={() => setbarcodeValue(typeText)}>
            <Text style={styles.buttonText}>Generate bar Code</Text>
          </TouchableOpacity>
          <View
            style={{
              borderTopWidth: 2,
              borderTopColor: 'purple',
              marginTop: 40,
            }}></View>
          <ViewShot ref={full}>
            <View style={{marginTop: 30, alignSelf: 'center'}}>
              <Barcode
                getRef={ref => (qrCode = ref)}
                format="CODE128B"
                text="0000002021954Q"
                maxWidth={(Dimensions.get('window').width * 2) / 3}
                value={barcodeValue ? barcodeValue : 'NA'}
              />
            </View>
          </ViewShot>

          <View style={styles.container}>
            <View>
              <Image
                source={{uri: imageURI}}
                ref={viewRef}
                style={{
                  width: 200,
                  height: 300,
                  resizeMode: 'contain',
                  marginTop: 15,
                  marginLeft: 80,
                }}
              />
              <TouchableOpacity
                style={styles.buttongenerate}
                onPress={takeScreenShot}>
                <Text style={styles.buttonText}>Take Screenshot</Text>
              </TouchableOpacity>
              {/* <Text style={styles.textStyle}>
                {savedImagePath ? `Saved Image Path\n ${savedImagePath}` : ''}
              </Text> */}
            </View>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={shareImage}
              style={{
                backgroundColor: 'green',
                width: 50,
                padding: 10,
                borderRadius: 50,

                marginTop: 0,
              }}>
              <Entypo name="share" size={30} color="white" />
            </TouchableOpacity>
            <Text style={{marginTop: 15, marginLeft: 10, fontWeight: 'bold'}}>
              Share bar Code
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
export default Details;

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
