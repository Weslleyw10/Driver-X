import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreditCardInput } from "react-native-credit-card-input"

import { Keyboard } from 'react-native'

import { Container, SubTitle, Title, Button, ButtonText, Spacer } from '../../Styles'
import { paymentMethodUpdate, createUser } from '../../Store/modules/app/actions'

const Passenger = () => {
    const dispatch = useDispatch()
    const { paymentMethod } = useSelector(state => state.app)

    const [visible, setVisible] = useState(true)
    const [paymentMethod2, setPaymentMethod2] = useState({
        card_expiration_date: "",
		card_number: "",
		card_cvv: "",
		card_holder_name: ""
    })

    console.log('paymentMethod2', paymentMethod2)

    const signIn = () => {
        dispatch(paymentMethodUpdate(paymentMethod2))
        dispatch(createUser())

        console.log('STATE', paymentMethod)
    }

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
                <CreditCardInput 
                    requiresName
                    onChange={(e) => {
                        const { number, expiry, cvc, name } = e.values
                        setPaymentMethod2({
                            card_expiration_date: expiry,
                            card_number: number,
                            card_cvv: cvc,
                            card_holder_name: name
                        })
                    }}                
                />
            </Container>

            
            {visible &&
                <Container height={70} justify="flex-end">
                    <Button onPress={() => signIn()}>
                        <ButtonText>Comece a usar</ButtonText>
                    </Button>
                </Container>}
            
        </Container>
    )

}

export default Passenger