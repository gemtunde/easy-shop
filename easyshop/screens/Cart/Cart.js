import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  Thumbnail,
  ListItem,
  Body,
} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import { SwipeListView } from "react-native-swipe-list-view";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          {props.cartItems.map((data) => {
            return (
              <ListItem style={styles.listItem} key={Math.random()} avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri: data.product.image
                        ? data.product.image
                        : "data:image/png;base64,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",
                    }}
                  />
                </Left>
                <Body style={styles.body}>
                  <Left>
                    <Text>{data.product.name}</Text>
                  </Left>
                  <Right>
                    <Text>{data.product.price}</Text>
                  </Right>
                </Body>
              </ListItem>
            );
          })}
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {total}</Text>
            </Left>
            <Right>
              <Button title="Clear" onPress={() => props.clearCart()} />
            </Right>
            <Right>
              <Button
                title="Checkout"
                onPress={() => props.navigation.navigate("Checkout")}
              />
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  //   hiddenContainer: {
  //     flex: 1,
  //     justifyContent: 'flex-end',
  //     flexDirection: 'row'
  //   },
  //   hiddenButton: {
  //     backgroundColor: 'red',
  //     justifyContent: 'center',
  //     alignItems: 'flex-end',
  //     paddingRight: 25,
  //     height: 70,
  //     width: width / 1.2
  //   }
});
