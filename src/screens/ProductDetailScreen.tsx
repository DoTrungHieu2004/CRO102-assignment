import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => setQuantity(q => q + 1);
  const handleSubtract = () => setQuantity(q => (q > 0 ? q - 1 : 0));

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back' size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{product.name}</Text>
        <TouchableOpacity>
          <Ionicons name='cart-outline' size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode='contain' />

        <View style={styles.badges}>
          <Text style={styles.badge}>{product.type}</Text>
          <Text style={styles.badge}>{product.category}</Text>
        </View>

        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>

        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Kích cỡ</Text>
            <Text style={styles.value}>{product.size}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Xuất xứ</Text>
            <Text style={styles.value}>{product.origin}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Tình trạng</Text>
            <Text style={[styles.value, { color: 'green' }]}>Còn {product.stock} sp</Text>
          </View>
        </View>

        <View style={styles.quantityRow}>
          <Text style={{ fontSize: 18 }}>Đã chọn {quantity} sản phẩm</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={handleSubtract} style={styles.btn}>
              <Ionicons name='remove' size={24} />
            </TouchableOpacity>
            <Text style={styles.count}>{quantity}</Text>
            <TouchableOpacity onPress={handleAdd} style={styles.btn}>
              <Ionicons name='add' size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtotal}>
            Tạm tính {quantity * product.price}đ
          </Text>
        </View>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  title: { fontSize: 18, fontWeight: '600', color: '#333' },
  content: { flex: 1 },
  image: { width: '90%', height: 250, borderRadius: 16 },
  badges: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  badge: {
    color: '#fff',
    backgroundColor: '#006400',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  price: {
    fontSize: 20,
    color: '#007357',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12
  },
  infoBox: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontWeight: '600', fontSize: 16, marginTop: 8 },
  value: { color: '#333', fontSize: 16, marginBottom: 4 },
  quantityRow: { marginTop: 16, alignItems: 'center' },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  btn: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4
  },
  count: { marginHorizontal: 12, fontSize: 20, fontWeight: 'bold' },
  subtotal: { fontSize: 20, fontWeight: '500' },
  buyButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  buyText: { color: '#fff', fontWeight: 'bold' }
});