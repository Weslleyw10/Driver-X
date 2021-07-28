import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native'

import car from '../../Assets/car.png'
import hand from '../../Assets/hand.png'
import { Container, Button, ButtonText, Title, SubTitle, PickerButton } from '../../Styles'

import { updateUser } from '../../Store/modules/app/actions'

const Type = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.app)

    const toggleType = (type) => {
        dispatch( updateUser({ type }))
    }

    const nextPage = () => {
        const route = user.type === "M" ? "Driver" : "Passenger"
        navigation.navigate(route)
    }


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
                <Title>Passageiro ou Motorista?</Title>
                <SubTitle>Selecione qual será a sua função no Driver-X</SubTitle>
            </Container>

            <Container>
                <PickerButton active={user.type === 'M'} onPress={() => toggleType('M')}>
                    <Image source={car} />
                    <Title>Motorista</Title>
                </PickerButton>

                <PickerButton active={user.type === 'P'} onPress={() => toggleType('P')}>
                    <Image source={hand} />
                    <Title>Passageiro</Title>
                </PickerButton>
            </Container>

            <Container height={70} justify="flex-end">
                <Button onPress={() => nextPage()}>
                    <ButtonText>Proximo Passo</ButtonText>
                </Button>
            </Container>

        </Container>
    )

}

export default Type