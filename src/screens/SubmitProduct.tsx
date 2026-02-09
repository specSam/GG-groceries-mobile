import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Button} from 'react-native';
import {COLORS} from '../Theme';
import Dropdown from '../components/Dropdown';

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productGroup, setProductGroup] = useState('');
    const [upc, setUpc] = useState('');
    const [cost, setCost] = useState('');
    const [storeAddress, setStoreAddress] = useState('');

    const handleCostChange = (value: string) => {
        const cleaned = value.replace(/[^0-9.]/g, '');
        const parts = cleaned.split('.');
        if (parts.length > 2) {
            return;
        }
        if (parts[1] && parts[1].length > 2) {
            return;
        }
        setCost(cleaned);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Submit New Product</Text>
            <ScrollView style={styles.container}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Product Name:</Text>
                <TextInput
                    style={styles.input}
                    value={productName}
                    onChangeText={setProductName}
                    placeholder="Enter product name"
                    placeholderTextColor={COLORS.secondary}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Product Group:</Text>
                <Dropdown
                    options={[]}
                    selectedValue={productGroup}
                    onSelect={setProductGroup}
                    placeholder="Select a group"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>UPC:</Text>
                <TextInput
                    style={styles.input}
                    value={upc}
                    onChangeText={text => {
                        const digits = text.replace(/[^0-9]/g, '');
                        if (digits.length <= 12) {
                            setUpc(digits);
                        }
                    }}
                    placeholder="Enter 12-digit UPC"
                    placeholderTextColor={COLORS.secondary}
                    keyboardType="numeric"
                    maxLength={12}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Cost:</Text>
                <View style={styles.costContainer}>
                    <Text style={styles.dollarSign}>$</Text>
                    <TextInput
                        style={[styles.input, styles.costInput]}
                        value={cost}
                        onChangeText={handleCostChange}
                        placeholder="0.00"
                        placeholderTextColor={COLORS.secondary}
                        keyboardType="decimal-pad"
                    />
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Store Address:</Text>
                <TextInput
                    style={styles.input}
                    value={storeAddress}
                    onChangeText={setStoreAddress}
                    placeholder="Enter store address"
                    placeholderTextColor={COLORS.secondary}
                />
            </View>
            <Button title="Submit" onPress={() => {}} />
        </ScrollView>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: 20,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 6,
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 6,
    },
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: COLORS.darkText,
    },
    costContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dollarSign: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.white,
        marginRight: 6,
    },
    costInput: {
        flex: 1,
    },
});

export default ProductForm;
