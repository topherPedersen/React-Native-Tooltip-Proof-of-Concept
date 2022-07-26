import React from 'react';
import {
  SafeAreaView,
  Text,
  Modal,
  Button,
  View,
} from 'react-native';

const RedSquare = (props) => {
  const positionStyle = props.isClone ? { top: props.originalElementY, left: props.originalElementX } : undefined;
  const neonGreen = "#39FF14";

  return (
    <View 
      ref={this.elementToBeClonedRef} 
      style={[{ width: 50, height: 50, backgroundColor: neonGreen }, positionStyle]}
      onLayout={(event) => {
        if (!props.isClone) {
          const { x, y, width, height } = event.nativeEvent.layout;
          props.setOriginalElementX(x);
          props.setOriginalElementY(y);
        }
      }}
    >
    </View>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      originalElementX: 0,
      originalElementY: 0,
    };
  }

  setOriginalElementX = (x) => {
    this.setState({ originalElementX: x});
  };

  setOriginalElementY = (y) => {
    this.setState({ originalElementY: y});
  };

  showTooltip = () => {
    this.setState({ showModal: true });
  };

  render() {
    return(
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>PrototypeTooltip</Text>
        <RedSquare setOriginalElementX={this.setOriginalElementX} setOriginalElementY={this.setOriginalElementY} />
        <Button title="Show Tooltip" onPress={this.showTooltip} />
        <Modal
          transparent={true}
          visible={this.state.showModal}
        >
          <View style={{ zIndex: 1000, flex: 1, backgroundColor: 'black', opacity: 0.75 }}>
          </View>
          <View style={{ position: 'absolute', opacity: 1.0, zIndex: 2000 }}>
              <RedSquare 
                isClone={true} 
                originalElementX={this.state.originalElementX} 
                originalElementY={this.state.originalElementY} 
              />
            </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default App;