import React from 'react';
import {
  SafeAreaView,
  Text,
  Modal,
  Button,
  View,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const CustomTooltip = (props) => {
  const tooltipBubbleHeight = 250;

  function Triangle() {
    const triangleStyle = {
      top: props.top + (tooltipBubbleHeight / 2.0),
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderTopWidth: 0,
      borderRightWidth: 10,
      borderBottomWidth: 17,
      borderLeftWidth: 10,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'white',
      borderLeftColor: 'transparent',
      transform: [{ rotate: '180deg' }],
    };

    const trianglePosition = {
      zIndex: 10000,
      position: 'absolute',
    };

    return <View style={[triangleStyle, trianglePosition]}></View>;
  }

  return (
    <View style={{ width: windowWidth, alignItems: 'center' }}>
      <View style={{ width: 250, height: 125, borderRadius: 10, backgroundColor: 'white', position: 'absolute', top: props.top }}></View>
      <Triangle />
    </View>
  );
};

const TooltipContainer = (props) => {
  if (!props.visible) {
    return null;
  };

  return (
    <Modal
      transparent={true}
      visible={props.visible}
    >
      <View style={{ zIndex: 1000, flex: 1, backgroundColor: 'black', opacity: 0.75 }}>
      </View>
      <View style={{ position: 'absolute', opacity: 1.0, zIndex: 2000 }}>
        {props.tooltipComponent}
        <View style={{ top: props.top, left: props.left }}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const RedSquare = (props) => {
  const positionStyle = props.isClone ? { top: props.originalElementY, left: props.originalElementX } : undefined;

  return (
    <View
      ref={this.elementToBeClonedRef}
      style={[{ width: 50, height: 50, backgroundColor: 'red' }, positionStyle]}
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
    this.setState({ originalElementX: x });
  };

  setOriginalElementY = (y) => {
    this.setState({ originalElementY: y });
  };

  showTooltip = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RedSquare setOriginalElementX={this.setOriginalElementX} setOriginalElementY={this.setOriginalElementY} />
        <Button title="Show Tooltip" onPress={this.showTooltip} />
        <TooltipContainer 
          tooltipComponent={
            <CustomTooltip 
              top={this.state.originalElementY - 160} 
            />
          } 
          visible={this.state.showModal} 
          top={this.state.originalElementY} 
          left={this.state.originalElementX}
        >
          <RedSquare isClone={true} />
        </TooltipContainer>
      </SafeAreaView>
    );
  }
}

export default App;