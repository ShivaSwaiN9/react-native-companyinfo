import React, {useState} from 'react';
import fs from 'react-native-fs';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';

import {
  Menu,
  MenuProvider,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import CompanyDropdown from '../components/company-dropdown';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import OpenPDFFromGoogleDrive from './PDFViewer';
import {UGImages} from '../assets/image';
import {logos} from '../assets/images1';
import AsyncStorage from '@react-native-async-storage/async-storage';

const companies = [
  {
    id: '1',
    name: 'UTKAL FOUNDATION',
    logo: logos.utkalfoundation,
    info: {
      fullName: 'UTKAL FOUNDATION PRIVATE LIMITED',
      cin: 'U88100OD2024NPL045152',
      registrationDate: '28-02-2024',
      pan: 'AADCU5270C',
      gstNo: '',
      tan: 'BBNU02057G',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO 39(P), DUPLEX 42, KHATA NO 328, BHAGABANPUR, Patrapada, Khorda, Balianta,Orissa, India, 751019',
      authorizedCapital: '1,00,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Education', 'Healthcare', 'Community Development'],
  },
  {
    id: '2',
    name: 'UTKAL INTERNATIONAL',
    logo: logos.utkalinternational,
    info: {
      fullName: 'UTKAL INTERNATIONAL PRIVATE LIMITED',
      cin: 'U46900DL2023PTC424665',
      registrationDate: '30-12-2023',
      pan: 'AADCU4817H',
      gstNo: '21AADCU4817H1ZK',
      tan: 'DELU09344G',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'DDA SFS F. NO 214, SEC-A, POCKET C, VASANT KUNJ, DELHI-110070',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Import/Export', 'Consulting', 'Business Development'],
  },
  {
    id: '3',
    name: 'UTKAL CORPORATION',
    logo: logos.utkalcorporation,
    info: {
      fullName: 'UTKAL CORPORATION LIMITED',
      cin: 'U46699OD2023PLC044526',
      registrationDate: '13/12/2023',
      pan: 'AADCU4695D',
      gstNo: '212500003523TRN',
      tan: 'BBNU02027E',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO D-3/12, M S NAGAR, KHANDAGIRI, Dumduma Housing Board Colony, Khorda,Balianta, Orissa, India, 751019',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Manufacturing', 'Distribution', 'Supply Chain'],
  },
  {
    id: '4',
    name: 'UTKAL GLOBAL',
    logo: logos.utkalglobal,
    info: {
      fullName: 'UTKAL GLOBAL LIMITED',
      cin: 'U46411OD2023PLC044353',
      registrationDate: '26-11-2023',
      pan: 'AADCU4591L',
      gstNo: '21AADCU4591L1Z4',
      tan: 'BBNU02019D',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'Plot NoD-3/12, Khandagiri, M. S. Nagar Bhubaneswar, Dumduma Housing Board Colony, Khorda, Balianta, Orissa, India, 751019',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['International Trade', 'Logistics', 'Global Sourcing'],
  },
  {
    id: '5',
    name: 'UTKAL BOTTLING',
    logo: logos.utkalbottling,
    info: {
      fullName: 'UTKAL BOTTLING PRIVATE LIMITED',
      cin: 'U23103OD2023PTC043620',
      registrationDate: '01-09-2023',
      pan: 'AADCU4059R',
      gstNo: '22DDDDD1234D1Z5',
      tan: 'BBNU01991D',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'D-3/12, KHANDAGIRI, MADHUSUDAN SAMABAYA NAGAR, Patrapada, Khorda, Balianta,Orissa, India, 751019',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Beverage Production', 'Distribution', 'Sales'],
  },
  {
    id: '6',
    name: 'UTKAL EDUCATION',
    logo: logos.utkaleducation,
    info: {
      fullName: 'UTKAL EDUCATION PRIVATE LIMITED',
      cin: 'U80302OR2011PTC013862',
      registrationDate: '06-07-2011',
      pan: 'AABCU6355L',
      gstNo: '',
      tan: '',
      itcCode: '',
      npcCode: '',
      registeredOffice: 'PARDESIPARA BHAWANIPATNA, BHAWANIPATNA, ODISHA-766001',
      authorizedCapital: '2,00,000',
      paidUpCapital: '2,00,000',
    },
    services: ['Educational Services', 'Training', 'Curriculum Development'],
  },
  {
    id: '7',
    name: 'UTKAL SMART',
    logo: logos.utkalsmart,
    info: {
      fullName: 'UTKAL SMART PRIVATE LIMITED',
      cin: 'U78100DL2023PTC418100',
      registrationDate: '03-08-2023',
      pan: 'AADCU3852E',
      gstNo: '21AADCU3852E1ZP',
      tan: 'DELUO9144C',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'B-1/1781, VASANT KUNJ, New Delhi, South Delhi, South Delhi, Delhi, India, 110070',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Technology Solutions', 'Software Development', 'IT Consulting'],
  },
  {
    id: '8',
    name: 'UTKAL POWER SOURCING',
    logo: logos.utkalpower,
    info: {
      fullName: 'UTKAL POWER SOURCING PRIVATE LIMITED',
      cin: 'U40106OR2022PTC041418',
      registrationDate: '12-12-2022',
      pan: 'AADCU2379N',
      gstNo: '21AADCU3852E1ZP',
      tan: 'BBNU01907D',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO-39P, KHATA NO-328, DUPLEX-42, 12TH MILESTONE, BHAGABANPUR, Khordha,BHUBANESWAR, Orissa, India, 751019',
      authorizedCapital: '15,00,000',
      paidUpCapital: '15,00,000',
    },
    services: ['Power Generation', 'Energy Management', 'Renewable Energy'],
  },
  {
    id: '9',
    name: 'UTKAL FACILITY SERVICES',
    logo: logos.utkalfacility,
    info: {
      fullName: 'UTKAL FACILITY SERVICES PRIVATE LIMITED',
      cin: 'U74140DL2010PTC202458',
      registrationDate: '10-05-2010',
      pan: 'AAHCM6350K',
      gstNo: '21AAHCM6350K1ZH',
      tan: 'BBNU02130C',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'Flat No. 214, Second Floor, Sector A, Pocket C, Vasant Kunj, New Delhi, South Delhi,India, 110070',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Facility Management', 'Maintenance', 'Cleaning Services'],
  },
  {
    id: '10',
    name: 'UTKAL HOMES',
    logo: logos.utkalhome,
    info: {
      fullName: 'UTKAL HOMES PRIVATE LIMITED',
      cin: 'U45201DL2003PTC121745',
      registrationDate: '11-08-2003',
      pan: 'AABCD8840K',
      gstNo: '',
      tan: '',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        '5948, ROOM NO.3, BASTI HARPHOOL SINGH SADAR BAZAR, North Delhi, DELHI, Delhi, India, 110006',
      authorizedCapital: '25,00,000',
      paidUpCapital: '21,00,000',
    },
    services: [
      'Real Estate Development',
      'Property Management',
      'Construction',
    ],
  },
  {
    id: '11',
    name: 'HOMEDEAL REALTY',
    logo: logos.Homedeal,
    info: {
      fullName: 'HOMEDEAL REALTY PRIVATE LIMITED',
      cin: 'U70100OR2020PTC032966',
      registrationDate: '09-05-2020',
      pan: 'AABCZ5163H',
      gstNo: '21AABCZ5163H2ZF',
      tan: '',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO. 42, GROUND FLOOR, 12 MILESTONE, BHUBANESWAR, KHORDHA, ODISHA-751019.',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: [
      'Real Estate Brokerage',
      'Property Sales',
      'Real Estate Consulting',
    ],
  },
  {
    id: '12',
    name: 'MR CORPORATE SERVICES',
    logo: logos.mrnew,
    info: {
      fullName: 'MR CORPORATE SERVICES PRIVATE LIMITED',
      cin: 'U74900DL2009PTC189542',
      registrationDate: '20-04-2009',
      pan: 'AAGCM1337B',
      gstNo: '21AAGCM1337B1Z8',
      tan: '',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'H NO. -558, FIRST FLOOR , RIGHT SIDE, NEAR SILVER OAK ROAD, South West Delhi,GHITORNI, Delhi, India, 110030',
      authorizedCapital: '1,00,000',
      paidUpCapital: '1,00,000',
    },
    services: [
      'Corporate Services',
      'Business Consulting',
      'Financial Services',
    ],
  },
  {
    id: '13',
    name: 'AYUSHMAN FOUNDATION',
    logo: logos.Ayushman,
    info: {
      fullName: 'AYUSHMAN FOUNDATION PRIVATE LIMITED',
      cin: 'U85300OR2020NPL033015',
      registrationDate: '26-05-2020',
      pan: 'AATCA4922D',
      gstNo: '',
      tan: 'BBNA04349C',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO. 42, GROUND FLOOR, PATRAPADA, 12 MILE STONE, BHUBANESWAR, KHORDHA,751019',
      authorizedCapital: '1,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Healthcare Services', 'Community Outreach', 'Public Health'],
  },
  {
    id: '14',
    name: 'ODO MANAGEMENTS',
    logo: logos.odo,
    info: {
      fullName: 'ODO MANAGEMENTS PRIVATE LIMITED',
      cin: 'U74999OR2020PTC032922',
      registrationDate: '18-04-2020',
      pan: 'AADCO1528K',
      gstNo: '',
      tan: 'BBNO02547G',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO. 42, GROUND FLOOR, PATRAPADA, 12 MILE STONE, BHUBANESWAR, KHORDHA,751019',
      authorizedCapital: '1,00,000',
      paidUpCapital: '1,00,000',
    },
    services: [
      'Management Consulting',
      'Business Operations',
      'Strategic Planning',
    ],
  },
  {
    id: '15',
    name: 'MAXIM PLUS',
    logo: logos.maxim,
    info: {
      fullName: 'MAXIM PLUS PRIVATE LIMITED',
      cin: 'U74999DL2015PTC288452',
      registrationDate: '12-12-2015',
      pan: 'CJTPM8126R',
      gstNo: '21AAKCM7589F1Z6',
      tan: 'BBNO02547G',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'P NO-108-H NO-2-A-9, HIMGIRI APARTMENTS, KISHANGARH, South Delhi, NEW DELHI,110070',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Business Solutions', 'Marketing', 'Sales Support'],
  },
  {
    id: '16',
    name: 'MYJOB SERVICES',
    logo: logos.MYJOB,
    info: {
      fullName: 'MYJOB SERVICES PRIVATE LIMITED',
      cin: 'U74110DL2012PTC238336',
      registrationDate: '03-07-2012',
      pan: 'AAFCR9343D',
      gstNo: '21AAFCR9343D1ZM',
      tan: 'BBNO02547G',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'B-1, 1781 Vasant Kunj, South Delhi, New Delhi, Delhi, India, 110070',
      authorizedCapital: '10,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Recruitment', 'Staffing', 'HR Consulting'],
  },
  {
    id: '17',
    name: 'INDOPLUS',
    logo: logos.IP,
    info: {
      fullName: 'INDOPLUS PRIVATE LIMITED',
      cin: 'U72900OR2020PTC032948',
      registrationDate: '29-04-2020',
      pan: 'AAFCI6335J',
      gstNo: '21AAFCI6335J1ZO',
      tan: 'BBNI01353C',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO. 42, GROUND FLOOR, 12 MILE STONE BHUBANESWAR, KHORDHA, ODISHA 751019,',
      authorizedCapital: '1,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Software Development', 'IT Services', 'Web Development'],
  },
  {
    id: '18',
    name: 'IBIS AUTOMOBILES',
    logo: logos.ibis,
    info: {
      fullName: 'IBIS AUTOMOBILES PRIVATE LIMITED',
      cin: 'U50101OR2006PTC008578',
      registrationDate: '10-02-2006',
      pan: 'AACCD3226A',
      gstNo: '21AACCD3226A1ZN',
      tan: '',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO. 42, GROUND FLOOR, 12 MILE STONE BHUBANESWAR, KHORDHA, ODISHA 751019',
      authorizedCapital: '50,00,000',
      paidUpCapital: '9,50,000',
    },
    services: ['Automobile Sales', 'Service', 'Parts'],
  },
  {
    id: '19',
    name: 'Z PLUS SECURITY MANAGEMENT',
    logo: logos.ZSecurity,
    info: {
      fullName: 'Z PLUS SECURITY MANAGEMENT PRIVATE LIMITED',
      cin: 'U74110DL1995PTC074355',
      registrationDate: '05-12-1995',
      pan: 'AAACH2738M',
      gstNo: '21AAACH2738M1ZP',
      tan: '',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        '25 SHEHZADA BAGH EXTN DAYA BASTI, NEW DELHI, Delhi, India, 110035',
      authorizedCapital: '15,00,000',
      paidUpCapital: '1,10,000',
    },
    services: ['Security Services', 'Risk Management', 'Security Consulting'],
  },
  {
    id: '20',
    name: 'TOPFRONT',
    logo: logos.Topfront,
    info: {
      fullName: 'TOPFRONT PRIVATE LIMITED',
      cin: 'U74999OR2020PTC032908',
      registrationDate: '09-04-2020',
      pan: 'AAHCT8327R',
      gstNo: '21AAHCT8327R1ZR',
      tan: 'BBNT01785A',
      itcCode: '',
      npcCode: '',
      registeredOffice:
        'PLOT NO. 42, GROUND FLOOR, 12 MILE STONE BHUBANESWAR, KHORDHA, ODISHA 751019',
      authorizedCapital: '1,00,000',
      paidUpCapital: '1,00,000',
    },
    services: ['Business Development', 'Marketing', 'Sales'],
  },
];

const Home = ({navigation}: any) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const fileId = '1j9PL14nVkhYi9pzUgeO3odWFGSuOOuUx';
  const downloadFileId = '1quhWkosZF7W6RRQnjZMThJQdr-QJpg57';

  const downloadPDF = async () => {
    const pdfViewUrl = `https://drive.google.com/file/d/${downloadFileId}/preview`;
    const pdfDownloadUrl = `https://drive.google.com/file/d/${downloadFileId}/view`;
    //https://drive.google.com/file/d/1quhWkosZF7W6RRQnjZMThJQdr-QJpg57/view
    navigation.navigate('PDFViewer', {
      pdfUrl: pdfViewUrl,
      pdfdownload: pdfDownloadUrl,
    });
  };

  const checkFilePath = async (filePath: string) => {
    try {
      const fileExists = await fs.exists(filePath);
      if (!fileExists) {
        Alert.alert(
          'File Error',
          'The file does not exist at the provided path.',
        );
        return false;
      }
      console.log('File exists:', filePath);
      return true;
    } catch (error) {
      console.error('File path error:', error);
      return false;
    }
  };

  const openPDF = async (filePath: string) => {
    const fileExists = await checkFilePath(filePath);
    if (!fileExists) return;

    try {
      const fileExtension = filePath.split('.').pop()?.toLowerCase();
      if (fileExtension === 'pdf') {
        await FileViewer.open(filePath);
      } else {
        Alert.alert('Error', 'The file is not a valid PDF.');
      }
    } catch (error) {
      console.error('File Viewer error:', error);
      Alert.alert('Error', 'Cannot open the PDF file.');
    }
  };

  return (
    <MenuProvider skipInstanceCheck={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ImageBackground source={UGImages.background} style={{flex: 1}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.header}>
              <Image
                source={UGImages.logo}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollView}
              keyboardShouldPersistTaps="handled">
              {companies.map(company => (
                <CompanyDropdown
                  key={company.id}
                  company={company}
                  isExpanded={expandedId === company.id}
                  onPress={() =>
                    setExpandedId(expandedId === company.id ? null : company.id)
                  }
                />
              ))}
            </ScrollView>

            <View style={styles.footer}>
              <View style={styles.menuContainer}>
                <Menu>
                  <MenuTrigger>
                    <Image source={UGImages.menu} style={styles.menuIcon} />
                  </MenuTrigger>
                  <MenuOptions customStyles={menuStyles}>
                    <MenuOption
                      onSelect={async () => {
                        try {
                          await AsyncStorage.setItem('isLoggedIn', 'false'); // Set isLoggedIn to false
                          navigation.navigate('Login'); // Navigate to Login screen
                        } catch (error) {
                          console.error('Error logging out:', error);
                        }
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={UGImages.logout}
                          style={{width: 20, height: 20}}
                        />
                        <Text style={styles.menuOptionText}>Logout</Text>
                      </View>
                    </MenuOption>
                    <MenuOption>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={UGImages.phone}
                          style={{width: 20, height: 20}}
                        />
                        <Text style={styles.menuOptionText}>
                          App Version: 1.0.0
                        </Text>
                      </View>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={downloadPDF}>
                <Text style={styles.profileText}>Utkal Group Profile</Text>
                <Image source={UGImages.pdf} style={styles.shareIcon} />
                {isDownloading && (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                    style={{marginLeft: 10}}
                  />
                )}
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: 'transparent',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  logo: {
    width: 200,
    height: 30,
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  menuContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    justifyContent: 'space-around',
  },
  profileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareIcon: {
    width: 24,
    height: 24,
  },
  progressContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
  },
  progressText: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 12,
  },
  menuOptionText: {
    fontSize: 14,
    padding: 8,
    color: '#000',
  },
});

const menuStyles = {
  optionsContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
};

export default Home;
