let inputNome=document.querySelector('#nick');
let intervalo=document.querySelector('#intervalo');
let botaoComecar=document.querySelector('#comecar');
let cardDireita=document.querySelector('.direita')
let outputNome=document.querySelector('.nome');
let inputNumero=document.querySelector('#numero');
let botaoJogar=document.querySelector('#jogar');
let result=document.querySelector('#resultado')
var tentativa=document.querySelector('#tentativas');
var contTentativa=3
//função para pegar um número aleatório de 1 a n
const NumAleatorio=(n)=>Math.floor(Math.random() * (n+1)) + 1;

//n vai deixar passar se n tiver nada escrito no input do número e se ele for maior do que o intervalo
const numInvalido=(num,interv)=>{
    if(num==' ' || num>interv || num<1){
        return  true    
    }
    else{
        return false
    }
}

//função quando é se clica o botão começar
const Comecar=()=>{
    let nome=inputNome.value
    let numAdivinhar=0; 
    let interv=0;
    
    
    //verificação do nome, n vai deixar passar espaço em branco e números
    if(nome==' '){
        alert("nome inválido!")
        return ;
    }
    
    //escrever nos espaços específicados
    tentativa.innerHTML=`Você ainda tem ${contTentativa} tentativas`
    outputNome.innerHTML=`Olá <b>${nome}</b>, vamos jogar!<br> De acordo com a opçao de intervalo que você escolheu, descubra o número.`
   
    //identificar o intervalo e gerar um numero para a adivinhação do game
    switch(intervalo.value){
        case '2':
            interv=100
            numAdivinhar=NumAleatorio(interv);    
            break;
        case '3':
            interv=200
            numAdivinhar=NumAleatorio(interv);
            break;
        default:
            interv=10
            numAdivinhar=NumAleatorio(interv);
    }

    //identificar quando o usuário clica no botão jogar e retorna a cont
    botaoJogar.addEventListener('click',()=>{
        //enquanto o usuario tiver tentativas, ele vai chamar a função de comparação
        if(contTentativa!=0){
            CompararNum(numAdivinhar,interv)
            return
        }
        //apertar de novo o botão jogo, vai resetar a página, quando n tiver mais tentativas
        else{
            window.location.reload();
        }       
    })         
}

//função para comparar os dois números(escrito e aleatório)
const CompararNum=(numAdivinhar, interv)=>{
    let usuarioNum=inputNumero.value
    
    if(numInvalido(usuarioNum,interv)){
        return alert('Você digitou um número inválido!')
    }

    if(usuarioNum<numAdivinhar){
        resultado.innerHTML='O número é maior'
    }
    else if(usuarioNum>numAdivinhar){
        resultado.innerHTML='O número é menor'
    }
    else{
        resultado.innerHTML='Parabéns, você conseguiu adivinhar'
        tentativa.style.display = 'none';
        botaoJogar.innerHTML='Reiniciar';
        //colocar tentativas com valor 0 , para indicar o fim do jogo
        contTentativa=0
        return
    }
    
    contTentativa--

    if (contTentativa!=0) {

        tentativa.innerHTML=`Você ainda tem ${contTentativa} tentativas`
        
    }
    else{  
        resultado.innerHTML='Você não conseguiu adivinhar'     
        tentativa.innerHTML=`Você não tem mais tentativas, o número sorteado foi ${numAdivinhar}`
        botaoJogar.innerHTML='Reiniciar';
        return
    }
}


botaoComecar.addEventListener('click',Comecar)