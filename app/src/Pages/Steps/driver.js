import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Keyboard } from 'react-native'

import { Container, Title, SubTitle, Button, ButtonText, Input, Spacer } from '../../Styles'
import { updateCar, createUser } from '../../Store/modules/app/actions'

const Driver = () => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(true)

    const [car, setCar] = useState({
        licensePlate: '',
        brand: '',
        model: '',
        color: ''
    })

    const signIn = () => {
        dispatch(updateCar(car))
        dispatch(createUser())
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
                <Input 
                    placeholder="Placa do veículo"
                    onChangeText={(licensePlate) => setCar({ ...car, licensePlate})}
                    value={car.licensePlate}          
                />
                <Spacer />
                <Input 
                    placeholder="Marca do veículo"
                    onChangeText={(brand) => setCar({ ...car, brand})}                         
                    value={car.brand}          
                />
                <Spacer />
                <Input 
                    placeholder="Modelo do veículo" 
                    onChangeText={(model) => setCar({ ...car, model})}                         
                    value={car.model}          
                />
                <Spacer />
                <Input 
                    placeholder="Cor do veículo" 
                    onChangeText={(color) => setCar({ ...car, color})}                         
                    value={car.color}          
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

export default Driver