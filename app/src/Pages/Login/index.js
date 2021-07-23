import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native'

import social from '../../Services/social'

import { Container, Button, ButtonText } from '../../Styles/index'
import logo from '../../Assets/logo.png'
import bgBottom from '../../Assets/bg-bottom-login.png'

import { updateUser } from '../../Store/modules/app/actions'

const Login = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.app)

    const login = async () => {
        try {
            const auth = await social.authorize("facebook", {
                scopes: 'email'
            })

            const userFB = await social.makeRequest(
                'facebook',
                '/me?fields=id,name,email'
            )

            console.tron.log(auth)
            console.tron.log(userFB)

            dispatch(
                updateUser({
                    fbId: userFB.data.id,
                    name: userFB.data.name,
                    email: "weslleylopes.dev@gmail.com",
                    accessToken: auth.response.credentials.accessToken,
                })
            )

        } catch (error) {
            alert(error.message)
        }

    }



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
                    <ButtonText onPress={() => login()} color="light">Login com Facebook</ButtonText>
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