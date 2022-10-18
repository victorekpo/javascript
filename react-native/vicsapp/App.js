import * as React from 'react';
import { Text, View, StyleSheet, Button  } from 'react-native';
import Constants from 'expo-constants';
import * as Brightness from 'expo-brightness';
// You can import from local files
import AssetExample from './components/AssetExample';
import * as SMS from 'expo-sms';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import * as Speech from 'expo-speech';
export default function App() {
  let result;
  const speak = () => {
    const thingToSay = 'Welcome to Vic\'s app.';
    result = Speech;
    Speech.speak(thingToSay);
    console.log("This is the tts",result);
  };
  React.useEffect(() => {    
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(1);
      }
      
    })();
    
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
      </Text>
      <Card>
       <Button title="Press to hear some words of wisdom." onPress={speak} />
        <AssetExample />
      </Card>
      
    </View>
    
        
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
