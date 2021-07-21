import React, { useEffect, useState } from 'react'
import { CreditCardInput } from "react-native-credit-card-input"

import { Keyboard } from 'react-native'


import { Container, SubTitle, Title, Button, ButtonText, Spacer } from '../../Styles'

const Passenger = () => {
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
        justify="flex-start">
            <Container
                align="flex-start"
                height={80}
                padding={10}
            >
                <Title>Escolha como pagar</Title>
                <SubTitle>Preencha os dados do cartão de crédito.</SubTitle>
            </Container>

            <Spacer height={50} />

            <Container>
                <CreditCardInput requiresName/>
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

export default Passenger