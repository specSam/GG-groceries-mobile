import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Button,
    Pressable,
    Modal,
    TouchableOpacity,
} from 'react-native';
import {COLORS} from '../Theme';
import SearchableList from '../components/SearchableList';

const PRODUCT_GROUP_OPTIONS = [
    'Almond Milk',
    'Organic Oats',
    'Organic Tofu',
    'Whole Wheat Bread',
];

const ProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productGroup, setProductGroup] = useState('');
    const [upc, setUpc] = useState('');
    const [cost, setCost] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalState, setModalState] = useState<'search' | 'create'>('search');
    const [newGroupName, setNewGroupName] = useState('');
    const [createError, setCreateError] = useState('');

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

    const openModal = () => {
        setModalState('search');
        setNewGroupName('');
        setCreateError('');
        setModalVisible(true);
    };

    const handleSelectGroup = (value: string) => {
        setProductGroup(value);
        setModalVisible(false);
    };

    const handleCreateGroup = () => {
        if (!newGroupName.trim()) {
            setCreateError('Product Group names cannot be blank');
            return;
        }
        setProductGroup(newGroupName.trim());
        setModalVisible(false);
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
                    <Pressable style={styles.input} onPress={openModal}>
                        <Text
                            style={[
                                styles.pressableText,
                                !productGroup && styles.placeholderText,
                            ]}>
                            {productGroup || 'Select a product group'}
                        </Text>
                    </Pressable>
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

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {modalState === 'search' ? (
                            <View style={styles.modalInner}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeButtonText}>
                                        {'✕'}
                                    </Text>
                                </TouchableOpacity>
                                <SearchableList
                                    options={PRODUCT_GROUP_OPTIONS}
                                    onSelect={handleSelectGroup}
                                    placeholder="Search product groups..."
                                    showBeforeSearch={true}
                                />
                                <Button
                                    title="Add New Product Group"
                                    onPress={() => {
                                        setModalState('create');
                                        setNewGroupName('');
                                        setCreateError('');
                                    }}
                                />
                            </View>
                        ) : (
                            <View style={styles.modalInner}>
                                <TouchableOpacity
                                    style={styles.backArrow}
                                    onPress={() => setModalState('search')}>
                                    <Text style={styles.backArrowText}>
                                        {'←'}
                                    </Text>
                                </TouchableOpacity>
                                {createError ? (
                                    <Text style={styles.errorText}>
                                        {createError}
                                    </Text>
                                ) : null}
                                <Text style={styles.modalLabel}>
                                    New Product Group Name
                                </Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={newGroupName}
                                    onChangeText={text => {
                                        setNewGroupName(text);
                                        if (createError) {
                                            setCreateError('');
                                        }
                                    }}
                                    placeholder="Enter product group name"
                                    placeholderTextColor={COLORS.secondary}
                                />
                                <Button
                                    title="Create Product Group"
                                    onPress={handleCreateGroup}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
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
    pressableText: {
        fontSize: 16,
        color: COLORS.darkText,
    },
    placeholderText: {
        color: COLORS.secondary,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: '85%',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 20,
    },
    modalInner: {
        flex: 1,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 4,
        marginBottom: 8,
    },
    closeButtonText: {
        fontSize: 20,
        color: COLORS.darkText,
    },
    backArrow: {
        alignSelf: 'flex-start',
        padding: 4,
        marginBottom: 8,
    },
    backArrowText: {
        fontSize: 24,
        color: COLORS.darkText,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 8,
    },
    modalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 6,
    },
    modalInput: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: COLORS.darkText,
        marginBottom: 12,
    },
});

export default ProductForm;
