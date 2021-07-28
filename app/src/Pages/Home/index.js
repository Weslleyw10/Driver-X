import React, { useState, useEffect } from 'react'
import { Marker, Polyline } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'

import initialMarker from '../../Assets/initial-marker.png'
import finalMarker from '../../Assets/final-marker.png'

import {
    Container,
    Title,
    SubTitle,
    Spacer,
    Input,
    Map,
    Avatar,
    Button,
    ButtonText,
    VerticalSeparator,
    Bullet,
    PulseCircle

} from '../../Styles'


export const Home = ({ navigation }) => {
    const { user, ride } = useSelector(state => state.app)

    const rideStatus = () => {
        if (ride?.user?._id) {
            if (ride?.driver?._id) {
                return 'inRide';
            } else {
                return 'inSearch';
            }
        }

        return 'empty';
    };

    console.log('RIDESTATUS', rideStatus())


    // M = driver, P = passenger
    const type = user.type

    // S = dont ride, I = informations, P = search, C = ride
    const status = 's'

    return (
        <Container>
            <Map
                initialRegion={{
                    latitude: -30.011364,
                    longitude: -51.1637373,
                    longitudeDelta: 0.0922,
                    latitudeDelta: 0.0421
                }}
                disabled={rideStatus() === 'inSearch'}
            >

                {
                    ride?.info && (
                        <Polyline 
                            coordinates={ride?.info?.route}
                            strokeWidth={4}
                            strokeColor="#000"
                        />
                    )
                }

                {
                    ride?.info && (
                        <Marker coordinate={ride?.info?.route[0]}>
                            <Avatar source={initialMarker} small />
                        </Marker>
                    )
                }

                {
                    ride?.info && (
                        <Marker coordinate={ride?.info?.route[ride?.info?.route.length -1]}>
                            <Avatar source={finalMarker} small />
                        </Marker>
                    )
                }

            </Map>

            <Container
                position="absolute"
                justify="space-between"
                align="flex-start"
                padding={20}
                zIndex={999}
                pointerEvents="box-none"
                style={{
                    height: '100%',
                }}>

                {/* top screen */}
                <Container
                    height={170}
                    justify="center"
                    align="flex-start"
                    padding={10}
                >
                    {/* AVATAR */}
                    {rideStatus() === 'empty' && !ride?.info && (
                        <TouchableOpacity>
                            <Avatar
                                // elevation={50}
                                // source={{ uri: 'https://cdn.dribbble.com/users/361185/screenshots/3803404/flat-portrait.png?compress=1&resize=400x300' }}
                                source={{ uri: `https://graph.facebook.com/${user.fbId}/picture?type=large&access_token=${user.accessToken}` }}
                            />
                        </TouchableOpacity>
                    )}

                    {/* ORIGIN & DESTINATION */}
                    {type === 'P' && rideStatus() === 'empty' && (
                        <Container
                            elevation={50}
                            color="light"
                            justify="flex-end"
                        >

                            <Container padding={20}>
                                <Container justify="flex-start" row>
                                    <Bullet />
                                    <SubTitle numberOfLines={1}>{ride?.info?.start_address}</SubTitle>
                                </Container>

                                <Spacer height={5} />

                                <Container justify="flex-start" row>
                                    <Bullet destination />
                                    <SubTitle numberOfLines={1}>{ride?.info?.end_address}</SubTitle>
                                </Container>
                            </Container>

                            <Button type="dark" compact>
                                <ButtonText color="light">
                                    Toque para editar
                                </ButtonText>
                            </Button>
                        </Container>
                    )}
                </Container>


                {/* Passageiro procurando corrida */}
                {rideStatus() === 'inSearch' && user.type === 'P' && (
                    <Container padding={20} zIndex={-1}>
                        <PulseCircle
                            numPulses={3}
                            diameter={400}
                            speed={20}
                            duration={2000}
                        />
                    </Container>
                )}

                {/* bottom screen */}
                <Container
                    height={200}
                    elevation={50}
                    color="light"
                    justify="center"
                    padding={10}
                >
                    {/* passageiro: sem corrida */}
                    {type === 'P' && rideStatus() === 'empty' && !ride?.info && (
                        <Container align="flex-start">
                            <SubTitle>Olá, Weslley L Silva</SubTitle>
                            <Title>Para onde você quer ir?</Title>
                            <Spacer />
                            <TouchableOpacity
                                style={{ width: '100%' }}
                                onPress={() => navigation.navigate('Ride')}
                            >
                                <Input editable={false} placeholder="Procure um destino..." />
                            </TouchableOpacity>
                        </Container>
                    )}

                    {/* passageiro: informações da corrida */}
                    {type === 'P' && rideStatus() !== 'inRide' && ride?.info && (
                        <Container align="flex-start">
                            <Container padding={20}>
                                <SubTitle>Driver X convencional</SubTitle>
                                <Spacer />

                                <Container height={50} row>
                                    <Container>
                                        <Title>R${ride?.info?.priceRide}</Title>
                                    </Container>
                                    <VerticalSeparator />
                                    <Container>
                                        <Title>{ride?.info?.duration.text}</Title>
                                    </Container>
                                </Container>

                                <Spacer />

                                <Button type={rideStatus() === 'inSearch' ? 'muted' : 'primary'}>
                                    <ButtonText>
                                        {rideStatus() === 'inSearch' ? 'Cancelar Driver X' : 'Chamar Driver X'}
                                    </ButtonText>
                                </Button>
                            </Container>
                        </Container>
                    )}

                    {/* passageiro: em corrida */}
                    {type === 'P' && rideStatus() === 'inRide' && (
                        <Container justify="flex-end">
                            <Container row>
                                <Container align="flex-start" padding={20} row>
                                    <Avatar
                                        source={{
                                            uri: 'https://beblesscharity.com/wp-content/uploads/2019/12/MALE.jpg'
                                        }}
                                    />

                                    <Container align="flex-start">
                                        <SubTitle bold>Matheus Antonio</SubTitle>
                                        <SubTitle>ABC-123, BMW, X6, Preto</SubTitle>
                                    </Container>
                                </Container>

                                <VerticalSeparator />

                                <Container width={140}>
                                    <Title>R$12,90</Title>
                                    <SubTitle bold>Aprox. 5 mins</SubTitle>
                                </Container>
                            </Container>

                            <Button type="muted">
                                <ButtonText >
                                    Cancelar corrida
                                </ButtonText>
                            </Button>
                        </Container>
                    )}

                    {/* motorista: sem corrida */}
                    {type === 'D' && rideStatus() === 'empty' && (
                        <Container justify="center">
                            <SubTitle>Olá, Juliana</SubTitle>
                            <Title>Ainda não temos corrida para você...</Title>
                            <Spacer />
                            {/* <Input placeholder="Procure um destino..." /> */}
                        </Container>
                    )}

                    {/* motorista: em corrida */}
                    {type === 'D' && rideStatus() === 'inRide' && (
                        <Container justify="flex-end">
                            <Container row>
                                <Container align="center" padding={20} row>
                                    <Avatar
                                        source={{
                                            uri: 'https://beblesscharity.com/wp-content/uploads/2019/12/MALE.jpg'
                                        }}
                                    />

                                    <Container>
                                        <Container height={15} justify="flex-start" row>
                                            <Bullet />
                                            <SubTitle small>Endereço de embarque completo</SubTitle>
                                        </Container>

                                        <Container height={15} justify="flex-start" row>
                                            <Bullet destination />
                                            <SubTitle small>Endereço de destino completo</SubTitle>
                                        </Container>
                                    </Container>

                                    {/* <Container align="flex-start">
                                        <SubTitle bold>Weslley L Silva (2km)</SubTitle>
                                        <SubTitle>ABC-123, BMW, X6, Preto</SubTitle>
                                    </Container> */}


                                </Container>

                                <VerticalSeparator />

                                <Container width={140}>
                                    <Title>R$12,90</Title>
                                    <SubTitle bold>Aprox. 5 mins</SubTitle>
                                </Container>

                            </Container>

                            <Button type="primary">
                                <ButtonText >
                                    Aceitar corrida
                                </ButtonText>
                            </Button>
                        </Container>
                    )}


                </Container>

            </Container>

        </Container >

    )



}

export default Home