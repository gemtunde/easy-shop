import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { Container, Header, Icon, Input, Text, Item } from "native-base";

import SearchProduct from "./SearchProducts";
import Banner from "../../shared/Banner";
import CategoryFilter from "./CategoryFilter";
import { ScrollView } from "react-native-gesture-handler";
import ProductList from "./ProductList";

import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

//const data = require("../../assets/data/products.json");
const productCategories = require("../../assets/data/categories.json");

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsctg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setFocus(false);
    setCategories(productCategories);
    setActive(-1);

    axios
      .get(`http://localhost:3000/api/v1/products`)
      .then((res) => {
        setProducts(res.data);
        setProductsFiltered(res.data);
        setProductsCtg(res.data);
        setInitialState(res.data);
      })
      .catch((err) => {});

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  //categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus === true ? (
        <View>
          <SearchProduct
            navigation={props.navigation}
            productsFiltered={productsFiltered}
          />
        </View>
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsctg={productsctg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productsctg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsctg.map((item) => {
                  return (
                    <ProductList
                      navigation={props.navigation}
                      key={item.name}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No products found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
