import React from 'react'
import { Image } from 'react-native'

import car from '../../Assets/car.png'
import hand from '../../Assets/hand.png'
import { Container, Button, ButtonText, Title, SubTitle, PickerButton } from '../../Styles'

const Type = () => {

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
                <PickerButton active>
                    <Image source={car} />
                    <Title>Motorista</Title>
                </PickerButton>

                <PickerButton>
                    <Image source={hand} />
                    <Title>Passageiro</Title>
                </PickerButton>
            </Container>

            <Container height={70} justify="flex-end">
                <Button>
                    <ButtonText>Proximo Passo</ButtonText>
                </Button>
            </Container>

        </Container>
    )

}

export default Type