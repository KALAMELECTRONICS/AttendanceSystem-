import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Camera } from 'expo-camera';
import { 
  Camera as CameraIcon, 
  ArrowLeft, 
  CheckCircle, 
  XCircle,
  User,
  Scan
} from 'lucide-react-native';

export default function FaceRecognitionScreen() {
  const insets = useSafeAreaInsets();
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [pulseAnimation] = useState(new Animated.Value(1));
  const [progressAnimation] = useState(new Animated.Value(0));
  const scanTimeoutRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    // Pulse animation for the face outline
    const startPulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!scanComplete) {
          startPulse();
        }
      });
    };

    if (hasPermission && !scanComplete) {
      startPulse();
    }
  }, [hasPermission, scanComplete]);

  const startFaceScan = () => {
    setIsScanning(true);
    
    // Animate progress bar
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Simulate face recognition process
    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      // Simulate successful recognition
      Alert.alert(
        'Face Recognition Successful!',
        'You have been successfully marked present for Physics class.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 3000);
  };

  const resetScan = () => {
    setIsScanning(false);
    setScanComplete(false);
    progressAnimation.setValue(0);
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
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
          Please enable camera access in your device settings to use face recognition for attendance.
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
              Face Recognition
            </Text>
            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
              Position your face in the frame
            </Text>
          </View>
        </View>
      </View>

      {/* Camera */}
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.front}
        ratio="16:9"
      >
        {/* Face Recognition Overlay */}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
          {/* Face Frame */}
          <Animated.View style={{
            width: 200,
            height: 250,
            borderWidth: 3,
            borderColor: isScanning ? '#F59E0B' : scanComplete ? '#10B981' : '#3B82F6',
            borderRadius: 100,
            backgroundColor: 'transparent',
            position: 'relative',
            transform: [{ scale: pulseAnimation }],
          }}>
            {/* Face outline */}
            <View style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -30 }, { translateY: -40 }],
            }}>
              <User size={60} color={isScanning ? '#F59E0B' : scanComplete ? '#10B981' : '#3B82F6'} />
            </View>

            {/* Scanning dots */}
            {isScanning && (
              <>
                <View style={{
                  position: 'absolute',
                  top: 40,
                  left: '50%',
                  transform: [{ translateX: -2 }],
                  width: 4,
                  height: 4,
                  backgroundColor: '#F59E0B',
                  borderRadius: 2,
                }} />
                <View style={{
                  position: 'absolute',
                  top: 80,
                  left: 30,
                  width: 4,
                  height: 4,
                  backgroundColor: '#F59E0B',
                  borderRadius: 2,
                }} />
                <View style={{
                  position: 'absolute',
                  top: 80,
                  right: 30,
                  width: 4,
                  height: 4,
                  backgroundColor: '#F59E0B',
                  borderRadius: 2,
                }} />
                <View style={{
                  position: 'absolute',
                  top: 120,
                  left: '50%',
                  transform: [{ translateX: -2 }],
                  width: 4,
                  height: 4,
                  backgroundColor: '#F59E0B',
                  borderRadius: 2,
                }} />
                <View style={{
                  position: 'absolute',
                  bottom: 60,
                  left: '50%',
                  transform: [{ translateX: -2 }],
                  width: 4,
                  height: 4,
                  backgroundColor: '#F59E0B',
                  borderRadius: 2,
                }} />
              </>
            )}

            {/* Success checkmark */}
            {scanComplete && (
              <View style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -15 }, { translateY: -15 }],
              }}>
                <CheckCircle size={30} color="#10B981" />
              </View>
            )}
          </Animated.View>

          {/* Progress Bar */}
          {isScanning && (
            <View style={{
              width: 200,
              height: 4,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 2,
              marginTop: 30,
              overflow: 'hidden',
            }}>
              <Animated.View style={{
                height: '100%',
                backgroundColor: '#F59E0B',
                borderRadius: 2,
                width: progressAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }} />
            </View>
          )}

          {/* Instructions */}
          <View style={{
            marginTop: 40,
            paddingHorizontal: 40,
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              {isScanning ? 'Scanning Face...' : scanComplete ? 'Recognition Complete!' : 'Position Your Face'}
            </Text>
            <Text style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              lineHeight: 20,
            }}>
              {isScanning 
                ? 'Please hold still while we verify your identity'
                : scanComplete 
                ? 'Your attendance has been recorded successfully'
                : 'Keep your face centered in the oval frame and look directly at the camera'
              }
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
        {!isScanning && !scanComplete && (
          <TouchableOpacity
            style={{
              backgroundColor: '#3B82F6',
              borderRadius: 12,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={startFaceScan}
          >
            <Scan size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Start Face Scan
            </Text>
          </TouchableOpacity>
        )}

        {isScanning && (
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
            }}
            onPress={resetScan}
          >
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Cancel Scan
            </Text>
          </TouchableOpacity>
        )}

        {scanComplete && (
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: 'center',
            }}
            onPress={resetScan}
          >
            <Text style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Scan Again
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}