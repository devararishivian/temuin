import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Footer from '../components/Footer';

export default function TimelineScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Timeline Screen</Text>
            <Button
                title="Go to Landing"
                onPress={() => navigation.navigate('Landing')}
            />
            <Footer></Footer>
        </View>
    );
}