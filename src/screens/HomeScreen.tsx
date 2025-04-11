import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { API_URL } from '@env';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, []);

  const renderSection = (title, type) => {
    const filtered = products.filter(p => p.type === type);

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      {/* Header & banner */}
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerText}>Planta - tỏa sáng không gian nhà bạn</Text>
          <TouchableOpacity>
            <Text style={styles.bannerLink}>Xem hàng mới về →</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name='cart-outline' size={24} color='black' />
        </TouchableOpacity>
      </View>

      {/* Sections */}
      {renderSection('Cây trồng', 'Cây trồng')}
      {renderSection('Phụ kiện chăm sóc', 'Phụ kiện chăm sóc')}
      {renderSection('Chậu cây trồng', 'Chậu cây trồng')}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  banner: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bannerText: { fontSize: 24, fontWeight: '500' },
  bannerLink: { fontSize: 16, fontWeight: '500', color: '#007537' },
  cartButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 8
  },
  section: { marginTop: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  sectionTitle: { fontSize: 24, fontWeight: '500', color: '#221f1f' },
  link: { fontSize: 16, fontWeight: '500', textDecorationLine: 'underline', color: '#221f1f' }
});