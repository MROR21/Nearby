import { useEffect, useState, useCallback } from "react";
import { View, Alert, Text, Image, Modal, TouchableOpacity, StyleSheet, Platform } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { router, useFocusEffect } from "expo-router";
import { useRef } from "react";
import IconMapPin from 'react-native-vector-icons/MaterialIcons';

import{api} from "@/services/api"
import {fontFamily, colors} from "@/styles/theme"

import { Places } from "@/comoponents/Places";
import { PlaceProps } from "@/comoponents/place";
import { Categories , CategoriesProps} from "@/comoponents/categories";

type MarketProps = PlaceProps & {
  latitude: number,
  longitude: number,
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home(){
const [categories, setCategories] = useState<CategoriesProps>([])
const [category, setCategory] = useState("")
const [markets, setMarkets] = useState<MarketProps[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const [selectedMarket, setSelectedMarket] = useState<MarketProps | null>(null)
const [modalVisible, setModalVisible] = useState(false)
const mapRef = useRef<MapView>(null);

const handleMarkerPress = (market: MarketProps) => {

  if (Platform.OS === 'android') {
    setSelectedMarket(market);
    setModalVisible(true);
    
    mapRef.current?.animateToRegion({
    latitude: market.latitude,
    longitude: market.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }, 500);
  }
};

const closeModal = () => {
  setModalVisible(false);
  setSelectedMarket(null);
};

const navigateToMarket = () => {
  if (selectedMarket) {
    closeModal();
    router.navigate(`/market/${selectedMarket.id}`);
  }
};

async function fetchCategories(){
    setLoading(true)
    setError(null)
    try {
      const {data} = await api.get("/categories")
       setCategories(data)
       if(data && data.length > 0) {
           setCategory(data[0].id)
       }
    } catch (error){
      console.error("Erro ao buscar categorias:", error)
      setError("Falha ao carregar categorias")
      Alert.alert("Categorias", "Não foi possivel carregar as categorias. ")
    } finally {
        setLoading(false)
    }
}

async function fetchMarkets() {
  try {
    if(!category){
      return
    }

    const{data} = await api.get("/markets/category/" + category)
    setMarkets(data)
    
  } catch (error) {
    console.log(error)
    Alert.alert("Locais", "Não foi possivel carregar os locais.")
    
  }
  
}

async function getCurrentLocation(){

  try {
        const{granted} = await Location.requestForegroundPermissionsAsync()

        if(granted){
          const location = await Location.getCurrentPositionAsync({});
          console.log(location)
        }
    
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
    fetchCategories()
}, [])


useFocusEffect(
        useCallback(() => {
            if(category) {
                fetchMarkets()
            }
        }, [category])
    )

    return(
    <View style={{flex: 1, backgroundColor: "#CECECE"}}>
      {loading && (
        <View style={{position: 'absolute', top: 50, left: 0, right: 0, zIndex: 1}}>
          <Text style={{textAlign: 'center', color: colors.green.base}}>Carregando...</Text>
        </View>
      )}
      
      {error && (
        <View style={{position: 'absolute', top: 80, left: 20, right: 20, zIndex: 1}}>
          <Text style={{textAlign: 'center', color: 'red'}}>{error}</Text>
        </View>
      )}
      
      <Categories 
      data={categories} 
      onSelect={setCategory} 
      selected={category}
      />

    <MapView ref={mapRef} style={{flex: 1}}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      minZoomLevel={1}
      maxZoomLevel={20}
      showsUserLocation={false}
      showsMyLocationButton={false}
    >
   <Marker
        identifier="current"
        coordinate={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
      >
        {Platform.OS === 'android' ? (
          <IconMapPin name="share-location" size={40} color={colors.green.base} />
        ) : (
          <Image
            source={require("@/assets/location.png")}
            style={{ width: 57, height: 57 }}
            resizeMode="contain"
          />
        )}
      </Marker>

        {
            markets.map((item) => (
              <Marker
                key={item.id}
                identifier={item.id}
                coordinate={{
                  latitude: parseFloat(item.latitude.toString()),
                  longitude: parseFloat(item.longitude.toString()),
                }}
                
                anchor={{ x: 0.5, y: 1 }}
                onPress={() => handleMarkerPress(item)}
              >
                {Platform.OS === 'android' && (
                  <IconMapPin name="location-on" size={32} color={colors.red.base} />
                )}

                {Platform.OS === 'ios' && (
                  <>
                    {/* Imagem do pino para o iOS (pode trocar pelo seu require('@/assets/pin.png') se preferir) */}
                    <Image 
                      source={require("@/assets/pin.png")} 
                      style={{ width: 52, height: 52 }} 
                      resizeMode="contain" 
                    />
                  </>
                )}

                {Platform.OS === 'ios' && (
                  <Callout 
                    onPress={() => router.navigate(`/market/${item.id}`)}
                    tooltip={true}
                  >
                    <View style={{padding: 8, backgroundColor: 'white', borderRadius: 6, minWidth: 240, maxWidth: 240}}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: colors.gray[600],
                          fontFamily: fontFamily.medium,
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                      </Text>

                      <Text
                        style={{
                          fontSize: 11,
                          color: colors.gray[500],
                          fontFamily: fontFamily.regular,
                          lineHeight: 14,
                        }}
                      >
                        {item.address}
                      </Text>
                    </View>
                  </Callout>
                )}
              </Marker>
            ))}
        
        </MapView>

      <Places data={markets}/>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedMarket?.name}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalAddress}>{selectedMarket?.address}</Text>
            
            <TouchableOpacity 
              style={styles.seeMoreButton}
              onPress={navigateToMarket}
            >
              <Text style={styles.seeMoreText}>Ver mais detalhes</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    position: 'absolute',
    top: '34%',
    left: '50%',
    transform: [{translateX: -120}, {translateY: -18}],
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 8,
    width: 240,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
    flex: 1,
  },
  closeButton: {
    fontSize: 14,
    color: colors.gray[400],
    padding: 1,
  },
  modalAddress: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginBottom: 8,
  },
  seeMoreButton: {
    backgroundColor: colors.green.base,
    borderRadius: 3,
    padding: 6,
    alignItems: 'center',
  },
  seeMoreText: {
    color: 'white',
    fontSize: 11,
    fontFamily: fontFamily.medium,
  },
});