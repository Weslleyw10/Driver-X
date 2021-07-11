import React from 'react'
import { Text, Image } from 'react-native'


import { Container, Button, ButtonText } from '../../Styles/index'
import logo from '../../Assets/logo.png'
import bgBottom from '../../Assets/bg-bottom-login.png'

const Login = () => {
    return (
        <Container 
        color="muted50"
        justify="flex-end"
        >
            <Container
                justify="space-around"
                padding={30}
                position="absolute"
                heigth={270}
                top={100}
                zIndex={9}            
            >
                <Image source={logo} />

                <Button type="info">
                    <ButtonText color="light">Login com Facebook</ButtonText>
                </Button>
                <Button type="light">
                    <ButtonText>Login com Google</ButtonText>
                </Button>

            </Container>
                <Image source={bgBottom} />
        </Container>
    )
}

export default Login