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
const windowHeight = Dimensions.get('window').height;


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
    <View style={{ position: 'absolute', height: windowHeight, width: windowWidth }}>
      <View style={{ zIndex: 1000, flex: 1, backgroundColor: 'black', opacity: 0.75 }}>
      </View>
      <View style={{ position: 'absolute', opacity: 1.0, zIndex: 2000 }}>
        {props.tooltipComponent}
        <View style={{ top: props.top, left: props.left }}>
          {props.children}
        </View>
      </View>
    </View>
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
        {/* <RedSquare /> is the component which we want to highlight with a tooltip */}
        <RedSquare setOriginalElementX={this.setOriginalElementX} setOriginalElementY={this.setOriginalElementY} />
        <Button title="Show Tooltip" onPress={this.showTooltip} />
        {/* The <TooltipContainer /> should be a sibling component of the component which you would like to highlight */}
        {/* Set the visibile prop equal to true to show the tooltip */}
        {/* Pass a tooltipComponent as a prop, this is the actual tooltip bubble which will be displayed near the highlighted element */}
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
          {/* Add the component you would like to highlight as a child of <TooltipContainer /> */}
          {/* And make sure to set the isClone prop equal to true */}
          <RedSquare isClone={true} />
        </TooltipContainer>
      </SafeAreaView>
    );
  }
}

export default App;