import {useState, useEffect} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import {UGImages} from '../assets/image';
import React from 'react';

interface CompanyInfo {
  fullName:string;
  cin: string;
  registrationDate: string;
  pan: string;
  gstNo: string;
  tan: string;
  registeredOffice: string;
  authorizedCapital: string;
  paidUpCapital: string;
}

interface CompanySection {
  id: string;
  name: string;
  logo: any;
  info: CompanyInfo;
  services: string[];
}

const InfoRow = ({label, value}: {label: string; value: string}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const CompanyDropdown = ({
  company,
  isExpanded,
  onPress,
}: {
  company: CompanySection;
  isExpanded: boolean;
  onPress: () => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, animation]);

  const getBackgroundColor = (name: string) => {
    const colors: {[key: string]: string} = {
      'MR CORPORATE SERVICES PRIVATE LIMITED': '#FFE5D9',
      'ODO MANAGEMENTS PRIVATE LIMITED': '#848484',
      'MAXIM PLUS PRIVATE LIMITED': '#F6FFFC',
      'MYJOB SERVICES PRIVATE LIMITED': '#E3F2FD',
      'INDOPLUS PRIVATE LIMITED': '#FFE2E6',
      'Z PLUS SECURITY MANAGEMENT PRIVATE LIMITED': '#FFE5D9',
      'TOPFRONT PRIVATE LIMITED': '#E0F2E9',
    };
    return colors[name] || '#EEF1FF';
  };

  const getBorderColor = (name: string) => {
    const colors: {[key: string]: string} = {
      'MR CORPORATE SERVICES PRIVATE LIMITED': '#FF9671',
      'ODO MANAGEMENTS PRIVATE LIMITED': '#848484',
      'MAXIM PLUS PRIVATE LIMITED': '#367e39',
      'MYJOB SERVICES PRIVATE LIMITED': '#2196F3',
      'INDOPLUS PRIVATE LIMITED': '#FF4D6D',
      'Z PLUS SECURITY MANAGEMENT PRIVATE LIMITED': '#aa2e25',
      'TOPFRONT PRIVATE LIMITED': '#4CAF50',
    };
    return colors[name] || '#6B7AFF';
  };

  const getShadowColor = (name: string) => {
    const colors: {[key: string]: string} = {
      'MR CORPORATE SERVICES PRIVATE LIMITED': 'rgba(255, 150, 113, 0.2)',
      'ODO MANAGEMENTS PRIVATE LIMITED': 'rgba(132,132,132,1)',
      'MAXIM PLUS PRIVATE LIMITED': 'rgba(246, 255, 252, 0.2)',
      'MYJOB SERVICES PRIVATE LIMITED': 'rgba(33, 150, 243, 0.2)',
      'INDOPLUS PRIVATE LIMITED': 'rgba(255, 77, 109, 0.2)',
      'Z PLUS SECURITY MANAGEMENT PRIVATE LIMITED': 'rgba(255, 229, 201, 0.2)',
      'TOPFRONT PRIVATE LIMITED': 'rgba(76, 175, 80, 0.2)',
    };
    return colors[name] || 'rgba(107, 122, 255, 0.2)';
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const containerStyle = {
    ...styles.dropdownContainer,
    backgroundColor: getBackgroundColor(company.name),
    borderColor: getBorderColor(company.name),
    shadowColor: getShadowColor(company.name),
  };

  return (
    <>
      <Pressable style={containerStyle} onPress={onPress}>
        <View style={styles.headerRow}>
          <Image
            source={company.logo}
            style={styles.companyLogo}
            resizeMode="contain"
          />
          <Text style={styles.companyName}>{company.name}</Text>
          <Animated.Image
            source={UGImages.Down}
            style={[
              styles.arrow,
              {
                transform: [{rotate: rotateInterpolate}],
              },
            ]}
          />
        </View>

        {isExpanded && (
          <Animated.View
            style={[
              styles.detailsContainer,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              },
            ]}>
             <InfoRow label="Full Name" value={company.info.fullName} /> 
            <InfoRow label="CIN" value={company.info.cin} />
            <InfoRow
              label="Registration Date"
              value={company.info.registrationDate}
            />
            <InfoRow label="PAN" value={company.info.pan} />
            <InfoRow label="GST No." value={company.info.gstNo} />
            <InfoRow label="TAN" value={company.info.tan} />
            <InfoRow
              label="Registered Office"
              value={company.info.registeredOffice}
            />
            {/* <InfoRow
              label="Authorized Capital"
              value={company.info.authorizedCapital}
            />
            <InfoRow
              label="Paid-Up Capital"
              value={company.info.paidUpCapital}
            /> */}
            
            <Text>For services click on services button</Text>
            <TouchableOpacity
              style={styles.servicesButton}
              onPress={() => setIsModalVisible(true)}>
              <Image source={UGImages.services} style={styles.servicesIcon} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Image source={company.logo} style={styles.modalLogo} />
            <Text style={styles.modalTitle}>{company.name}</Text>

            <View style={styles.servicesList}>
              {company.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <Text style={styles.serviceNumber}>{index + 1}.</Text>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 7,
    padding: 8,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  companyLogo: {
    width: 80,
    height: 40,
    overflow: 'hidden',
    borderRadius: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  arrow: {
    height: 20,
    width: 20,
  },
  detailsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',  
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  infoValue: {
    flex: 2,
    fontSize: 14,
    color: '#333',
  },
  servicesButton: {
    position: 'absolute',
    bottom: -8,
    right: 0,
    padding: 8,
  },
  servicesIcon: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  modalLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignSelf: 'center',
    resizeMode:"center",
    overflow:"hidden",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  servicesList: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  serviceNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});

export default CompanyDropdown;
