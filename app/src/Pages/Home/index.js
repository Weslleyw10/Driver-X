import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'

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


export const Home = () => {

    // d = driver, p = passenger
    const type = 'd'

    // S = dont ride, I = informations, P = search, C = ride
    const status = 'c'

    return (
        <Container>
            <Map
                initialRegion={{
                    latitude: -30.011364,
                    longitude: -51.1637373,
                    longitudeDelta: 0.0922,
                    latitudeDelta: 0.0421
                }}
                disabled={status === 'p'}
            />

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
                    {status === 's' || type === 'd' && (
                        <TouchableOpacity>
                            <Avatar
                                // elevation={50}
                                source={{ uri: 'https://cdn.dribbble.com/users/361185/screenshots/3803404/flat-portrait.png?compress=1&resize=400x300' }}
                            />
                        </TouchableOpacity>
                    )}

                    {type === 'p' && status !== "s" && (
                        <Container
                            elevation={50}
                            color="light"
                            justify="flex-end"
                        >

                            <Container padding={20}>
                                <Container justify="flex-start" row>
                                    <Bullet />
                                    <SubTitle>Endereço de embarque completo</SubTitle>
                                </Container>

                                <Spacer height={5} />

                                <Container justify="flex-start" row>
                                    <Bullet destination />
                                    <SubTitle>Endereço de destino completo</SubTitle>
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


                {/*Passageiro procurando corrida */}
                {status === 'p' && (
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
                    {type === 'p' && status === 's' && (
                        <Container align="flex-start">
                            <SubTitle>Olá, Weslley L Silva</SubTitle>
                            <Title>Para onde você quer ir?</Title>
                            <Spacer />
                            <Input placeholder="Procure um destino..." />
                        </Container>
                    )}

                    {/* passageiro: informações da corrida */}
                    {type === 'p' && (status === 'i' || status === 'p') && (
                        <Container align="flex-start">
                            <Container padding={20}>
                                <SubTitle>Driver X convencional</SubTitle>
                                <Spacer />

                                <Container height={50} row>
                                    <Container>
                                        <Title>R$13,90</Title>
                                    </Container>
                                    <VerticalSeparator />
                                    <Container>
                                        <Title>5 mins</Title>
                                    </Container>
                                </Container>

                                <Spacer />

                                <Button type={status === 'p' ? 'muted' : 'primary'}>
                                    <ButtonText>
                                        {status === 'p' ? 'Cancelar Driver X' : 'Chamar Driver X'}
                                    </ButtonText>
                                </Button>
                            </Container>
                        </Container>
                    )}

                    {/* passageiro: em corrida */}
                    {type === 'p' && status === 'c' && (
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
                    {type === 'd' && status === 's' && (
                        <Container justify="center">
                            <SubTitle>Olá, Juliana</SubTitle>
                            <Title>Ainda não temos corrida para você...</Title>
                            <Spacer />
                            {/* <Input placeholder="Procure um destino..." /> */}
                        </Container>
                    )}

                    {/* motorista: em corrida */}
                    {type === 'd' && status === 'c' && (
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