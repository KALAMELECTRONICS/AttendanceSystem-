import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Camera } from 'expo-camera';
import { 
  QrCode, 
  ArrowLeft, 
  CheckCircle, 
  XCircle,
  Flashlight,
  FlashlightOff
} from 'lucide-react-native';

export default function QRScanScreen() {
  const insets = useSafeAreaInsets();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [scanAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    // Animate the scanning line
    const animateScanning = () => {
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!scanned) {
          animateScanning();
        }
      });
    };

    if (hasPermission && !scanned) {
      animateScanning();
    }
  }, [hasPermission, scanned]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    // Simulate QR code validation
    const isValidQR = data.includes('attendance') || data.includes('class');
    
    if (isValidQR) {
      Alert.alert(
        'Attendance Marked!',
        'You have been successfully marked present for Mathematics class.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      Alert.alert(
        'Invalid QR Code',
        'This QR code is not valid for attendance marking.',
        [
          {
            text: 'Try Again',
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', padding: 24 }}>
        <XCircle size={64} color="#EF4444" style={{ marginBottom: 16 }} />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
          Camera Permission Required
        </Text>
        <Text style={{ color: '#ccc', fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
          Please enable camera access in your device settings to scan QR codes for attendance.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#3B82F6',
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 24,
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 24,
        paddingBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
            }}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#fff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
              Scan QR Code
            </Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
              Point camera at the QR code
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: flashOn ? '#F59E0B' : 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setFlashOn(!flashOn)}
          >
            {flashOn ? (
              <Flashlight size={20} color="#fff" />
            ) : (
              <FlashlightOff size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera */}
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        flashMode={flashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
      >
        {/* Scanning Overlay */}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
          {/* Scanning Frame */}
          <View style={{
            width: 250,
            height: 250,
            borderWidth: 2,
            borderColor: '#3B82F6',
            borderRadius: 20,
            backgroundColor: 'transparent',
            position: 'relative',
          }}>
            {/* Corner indicators */}
            <View style={{
              position: 'absolute',
              top: -2,
              left: -2,
              width: 30,
              height: 30,
              borderTopWidth: 4,
              borderLeftWidth: 4,
              borderColor: '#3B82F6',
              borderTopLeftRadius: 20,
            }} />
            <View style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 30,
              height: 30,
              borderTopWidth: 4,
              borderRightWidth: 4,
              borderColor: '#3B82F6',
              borderTopRightRadius: 20,
            }} />
            <View style={{
              position: 'absolute',
              bottom: -2,
              left: -2,
              width: 30,
              height: 30,
              borderBottomWidth: 4,
              borderLeftWidth: 4,
              borderColor: '#3B82F6',
              borderBottomLeftRadius: 20,
            }} />
            <View style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 30,
              height: 30,
              borderBottomWidth: 4,
              borderRightWidth: 4,
              borderColor: '#3B82F6',
              borderBottomRightRadius: 20,
            }} />

            {/* Scanning line animation */}
            <Animated.View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: '#3B82F6',
              transform: [{
                translateY: scanAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 246],
                }),
              }],
            }} />
          </View>

          {/* Instructions */}
          <View style={{
            marginTop: 40,
            paddingHorizontal: 40,
            alignItems: 'center',
          }}>
            <QrCode size={32} color="#fff" style={{ marginBottom: 16 }} />
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Position QR Code in Frame
            </Text>
            <Text style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              lineHeight: 20,
            }}>
              Hold your device steady and ensure the QR code is clearly visible within the frame
            </Text>
          </View>
        </View>
      </Camera>

      {/* Bottom Actions */}
      <View style={{
        paddingHorizontal: 24,
        paddingBottom: insets.bottom + 20,
        paddingTop: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
          }}
          onPress={() => setScanned(false)}
        >
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}>
            Scan Again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}