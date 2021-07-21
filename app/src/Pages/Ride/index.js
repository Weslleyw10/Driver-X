import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'

import { 
    Container, 
    Title, 
    SubTitle, 
    Button, 
    ButtonText, 
    Input, 
    Spacer, 
    AdressList,
    AddressItem

} from '../../Styles'

const Ride = () => {
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

    const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]

    return (
        <>
            <Container
                color="muted50"
                padding={30}
                justify="flex-start"
            >
                <Container
                    row
                    align="flex-start"
                    height={80}
                >
                    <Container align="flex-start" padding={20}>
                        <SubTitle>Voltar</SubTitle>
                    </Container>

                    <Container align="flex-end" padding={20}>
                        <Title>Corrida</Title>
                    </Container>

                    <Container></Container>
                </Container>

                <Container
                    padding={30}
                    justify="flex-start"
                >
                    <Container
                        height={120} 
                        justify="flex-start"
                    >
                        <Input placeholder="Embarque" />
                        <Spacer />
                        <Input placeholder="Destino" />

                    </Container>

                    <Container>
                        <AdressList
                            data={data}
                            renderItem={({item, index}) => (
                                <AddressItem>
                                    <SubTitle bold>Menlo Park</SubTitle>
                                    <SubTitle small>Palo Alto, CA</SubTitle>
                                </AddressItem>
                            )}

                        
                        
                        />
                    </Container>
                </Container>




                {visible &&
                    <Container height={70} justify="flex-end">
                        <Button>
                            <ButtonText>Comece a usar</ButtonText>
                        </Button>
                    </Container>
                }


            </Container>


        </>




    )

}

export default Ride