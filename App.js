import React from 'react';
import {
  SafeAreaView,
  Text,
  Modal,
  Button,
  View,
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  showTooltip = () => {
    this.setState({ showModal: true });
  };

  render() {
    return(
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>PrototypeTooltip</Text>
        <Button title="Show Tooltip" onPress={this.showTooltip} />
        <Modal
          animationType="slide"
          transparent={true}
          // transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            // this.setModalVisible(!modalVisible);
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.5 }}>

          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default App;