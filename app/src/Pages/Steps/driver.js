import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'

import { Container, Title, SubTitle, Button, ButtonText, Input, Spacer } from '../../Styles'

const Driver = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setVisible(false)
        )

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setVisible(true)
        )

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }

    }, [])


    return (
        <Container
            color="muted50"
            padding={30}
            justify="flex-start"
        >
            <Container
                align="flex-start"
                height={80}
                padding={10}
            >
                <Title>Cadastre seu veículo</Title>
                <SubTitle>Preencha os campos abaixo.</SubTitle>
            </Container>

            <Container justify="flex-start">
                <Spacer height={50} />
                <Input placeholder="Placa do veículo" />
                <Spacer />
                <Input placeholder="Marca do veículo" />
                <Spacer />
                <Input placeholder="Modelo do veículo" />
                <Spacer />
                <Input placeholder="Cor do veículo" />
                <Spacer />
                <Input placeholder="Cor do veículo" />




            </Container>

            {visible &&
                <Container height={70} justify="flex-end">
                    <Button>
                        <ButtonText>Comece a usar</ButtonText>
                    </Button>
                </Container>}

        </Container>

    )

}

export default Driver