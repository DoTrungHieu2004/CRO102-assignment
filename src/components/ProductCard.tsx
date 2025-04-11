import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { product })}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        {product.category && <Text style={styles.sub}>{product.category}</Text>}
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: { marginRight: 16, width: 140 },
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#eee'
  },
  name: { fontWeight: '600', fontSize: 16, marginBottom: 8 },
  sub: { fontWeight: '500', fontSize: 12, color: '#7b7b7b' },
  price: { color: '#007537', fontWeight: '500', fontSize: 16 }
});