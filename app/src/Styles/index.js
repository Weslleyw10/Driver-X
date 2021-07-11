import styled from "styled-components";
import theme from './theme.json'


export const Container = styled.View`
    width: 100%;
    max-width: ${(props) => props.width || '100%'};
    max-height: ${(props) => (props.height ? props.height + 'px' : 'auto')};
    flex: 1;
    flex-direction: ${(props) => (props.row ? 'now' : 'column')};
    justify-content: ${(props) => props.justify || 'center'};
    align-items: ${(props) => props.align || 'center'};
    padding: ${(props) => props.padding || 0}px;
    position: ${(props) => props.position || 'relative'};
    top: ${(props) => props.top || 0};
    z-index: ${(props) => props.zIndex || 1};

    background: ${(props) => props.color ? theme.colors[props.color] : 'transparent'};

`;

export const Button = styled.TouchableOpacity`
    width: 100%;
    padding: ${(props) => (props.compact ? 5 : 15)}px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    background: ${(props) => props.type ? theme.colors[props.type] : theme.colors.primary};
    margin-top: 10px;
`;

export const ButtonText = styled.Text`
    text-align: center;
    color: ${props => props.color ? theme.colors[props.color] : theme.colors.black};
`;

export const Title = styled.Text`
    font-size: 20px;
    color: ${theme.colors.dark};
    font-weight: bold;
`;

export const SubTitle = styled.Text`
    font-size: ${props => props.small ? '12px' : '15px'};
    opacity: .7;
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    color: ${props => props.color ? theme.colors[props.color] : theme.colors.dark};
`;


export const PickerButton = styled.TouchableOpacity`
    width: 100%;
    height: 40%;
    margin-top: 2.5%;
    border-width: 3px;
    border-style: solid;
    justify-content: space-around;
    align-items: center;
    border-color: ${props => props.active ? theme.colors.primary : theme.colors.muted50};
    background-color: ${props => props.active ? theme.colors.primary + '80' : theme.colors.muted50};


`;
