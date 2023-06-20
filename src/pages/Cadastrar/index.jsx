import {useNavigate } from 'react-router-dom';
import {MdOutlinePersonOutline, MdEmail, MdLock} from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText,ContaText, LoginText, Row, Wrapper, ContainerCadastro} from './styles';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
const Cadastrar = () => {
            
        const navigate = useNavigate();
        
        const { control, handleSubmit, formState: { errors  } } = useForm({
            reValidateMode: 'onChange',
            mode: 'onChange',
        });

        const onSubmit = async (formData) => {
            try{
                const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
                
                if(data.length && data[0].id){
                    navigate('/feed') 
                    return
                }

                alert('Usuário ou senha inválido')
            }catch(e){
                //TODO: HOUVE UM ERRO
            }
        };

        console.log('errors', errors);

    return (<>
        <Header>Dio.me </Header>
        
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <ContainerCadastro>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo" leftIcon={<MdOutlinePersonOutline/>} name="nome" control={control}/>                              
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                    </form> 
                </ContainerCadastro>
                <Row>
                    <EsqueciText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</EsqueciText>
                    <ContaText> Já tenho conta.</ContaText>
                    <LoginText>Fazer Login</LoginText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}
  





 
export {Cadastrar} 