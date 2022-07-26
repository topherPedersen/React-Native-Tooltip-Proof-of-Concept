import React from 'react';
import {
  SafeAreaView,
  Text,
  Modal,
  Button,
  View,
} from 'react-native';

const RedSquare = (props) => {
  const positionStyle = props.isClone ? { top: 393.33334 } : undefined;

  return (
    <View 
      ref={this.elementToBeClonedRef} 
      style={[{ width: 50, height: 50, backgroundColor: 'red' }, positionStyle]}
      onLayout={(event) => {
        if (!props.isClone) {
          const { x, y, width, height } = event.nativeEvent.layout;
          // alert(`x: ${x} y: ${y}`);
        }
      }}
    >
    </View>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.elementToBeClonedRef = React.createRef();

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
        <RedSquare />
        <Button title="Show Tooltip" onPress={this.showTooltip} />
        <Modal
          // animationType="slide"
          transparent={true}
          // transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            // this.setModalVisible(!modalVisible);
          }}
        >
          <View style={{ zIndex: 1000, flex: 1, backgroundColor: 'black', opacity: 0.5 }}>
          </View>
          <View style={{ position: 'absolute', opacity: 1.0, zIndex: 2000 }}>
              <RedSquare isClone={true} />
            </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default App;