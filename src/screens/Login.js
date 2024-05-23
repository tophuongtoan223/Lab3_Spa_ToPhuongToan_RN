import { useState, useEffect } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { login, useMyContextController } from '../context';

const Login = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [email, setEmail] = useState('toantito223@gmail.com');
    const [password, setPassword] = useState('123456');
    const [showpassword, setShowPassword] = useState(false);

    const hasErrorEmail = () => !email.includes('@');
    const hasErrorPassword = () => password.length < 6;

    const handleLogin = () => {
        login(dispatch, email, password);
    };

    useEffect(() => {
        console.log(userLogin);
        if (userLogin != null) {
            if (userLogin.role === 'admin') {
                navigation.navigate('Admin');
            } else if (userLogin.role === 'customer') {
                navigation.navigate('Customer');
            }
        }
    }, [userLogin]);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <HelperText type="error" visible={hasErrorEmail()}>
                    Invalid email address.
                </HelperText>

                <TextInput
                    style={styles.input}
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showpassword}
                />
                <HelperText type="error" visible={hasErrorPassword()}>
                    Password must be at least 6 characters.
                </HelperText>

                <Button style={styles.loginButton} mode="contained" onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Button>

                <View style={styles.row}>
                    <Text>Don't have an account?</Text>
                    <Button onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.link}>Create new account</Text>
                    </Button>
                </View>

                <View style={styles.row}>
                    <Button onPress={() => null}>
                        <Text style={styles.link}>Forgot Password</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5', // Light background for contrast
    },
    card: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#FFCC66',
        marginBottom: 30,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    loginButton: {
        backgroundColor: '#FFCC66',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    link: {
        color: '#FFCC66',
        marginLeft: 5,
    },
});

export default Login;
