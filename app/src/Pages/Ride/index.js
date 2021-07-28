import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Keyboard } from 'react-native'

import rest from '../../Services/rest'
import { rideInfos } from '../../Store/modules/app/actions'

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
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(true)
    const [list, setList] = useState([])

    const [activeInput, setActiveInput] = useState(null)
    const [origin, setOrigin] = useState({})
    const [destination, setDestination] = useState({})

    const getPlaces = async (address) => {
        try {
            if (address !== '') {
                const { data: res } = await rest.get(`/address/${address}`)

                if(res.error) {
                    alert(res.message)
                    return false
                }

                setList(res.addressList)
            }

        } catch (error) {
            alert(error.message)
        }
    }

    const getRide = () => {
        dispatch(rideInfos(origin.place_id, destination.place_id))
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
                        <Input
                            onFocus={() => setActiveInput('setOrigin')}
                            placeholder="Embarque"
                            onChangeText={address => getPlaces(address)}
                            value={origin.description}
                        />

                        <Spacer />

                        <Input
                            onFocus={() => setActiveInput('setDestination')}
                            placeholder="Destino"
                            onChangeText={address => getPlaces(address)}
                            value={destination.description}
                        />

                    </Container>

                    <Container>
                        <AdressList
                            data={list}
                            keyExtractor={item => item.place_id}
                            renderItem={({ item, index }) => (
                                <AddressItem onPress={() => eval(activeInput)(item)}>
                                    <SubTitle bold>{item.description}</SubTitle>
                                    <SubTitle small>{item.secondary_text}</SubTitle>
                                </AddressItem>
                            )}
                        />
                    </Container>
                </Container>




                {visible &&
                    <Container height={70} justify="flex-end">
                        <Button onPress={() => getRide()}>
                            <ButtonText>Comece a usar</ButtonText>
                        </Button>
                    </Container>
                }


            </Container>


        </>




    )

}

export default Ride