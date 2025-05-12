import AvaliadorJogo from "./jogo/AvaliadorJogo";
import Jogador from "./jogo/Jogador";
import JogadorAutomatizado from "./jogo/JogadorAutomatizado";
import Jogo from "./jogo/Jogo";
import Partida from "./jogo/Partida";
import { Peca } from "./jogo/Peca";
import { SituacaoPartida } from "./jogo/SituacaoPartida";

const prompt = require("prompt-sync")();

function exibeTabuleiro(partida: Partida) {
    let tabuleiro = partida.getTabuleiro();

    for (let i = 0; i < tabuleiro.length; i++) {
        let linha = ""
        for (let j = 0; j < tabuleiro[i].length; j++) {
            if (tabuleiro[i][j] == null) {
                linha += " - ";
            } else if (tabuleiro[i][j] == Peca.Xis) {
                linha += " X ";
            } else {
                linha += " O ";
            }

            if (j < 2) {
                linha += "|";
            }
        }
        console.log(linha);
    }
    console.log();
}

function exibePlacar() {
    console.log(">>> Placar <<<");
    console.log(`Você: ${jogo.getJogador1().getVitorias()} x ${jogo.getJogador2().getVitorias()} :CPU`);
    console.log(`Partidas: ${jogo.getNumeroPartidas()}`);
    console.log();
}

let jogo: Jogo = new Jogo(new Jogador("Você"), new JogadorAutomatizado("CPU"));

let continuaJogo: boolean = true;
while (continuaJogo) {

    let partida: Partida = jogo.iniciaPartida();

    let continuaPartida: boolean = true;
    while (continuaPartida) {

        exibeTabuleiro(partida);
        console.log("Escolha uma posição (linha e coluna) para jogar: ");
        let linha: number = parseInt(prompt("Linha: "));
        let coluna: number = parseInt(prompt("Coluna: "));
        if (!partida.joga(linha, coluna)) {
            console.log("Você realizou uma jogada inválida! ");
        }
        
        if (AvaliadorJogo.verificaFim(partida.getTabuleiro()) != SituacaoPartida.EmAndamento) {
            continuaPartida = false;
        } else {
            
            let jogadaCpu: [number, number] | undefined = (jogo.getJogador2() as JogadorAutomatizado).realizaJogada(partida.getTabuleiro());
            if (jogadaCpu == undefined) {
                console.log("CPU não conseguiu realizar uma jogada!");                
            } else {
                if (!partida.joga(jogadaCpu[0], jogadaCpu[1])) {
                    console.log("CPU realizou uma jogada inválida! ");                    
                }

                if (AvaliadorJogo.verificaFim(partida.getTabuleiro()) != SituacaoPartida.EmAndamento) {
                    continuaPartida = false;
                }
            }
        }
    }

    let situacao: SituacaoPartida = AvaliadorJogo.verificaFim(partida.getTabuleiro());
    if (situacao == SituacaoPartida.VitoriaJogador1) {
        partida.getJogador1().adicionaVitoria();
        console.log(`${partida.getJogador1().getNome()} venceu!`);
    } else if (situacao == SituacaoPartida.VitoriaJogador2) {
        partida.getJogador2().adicionaVitoria();
        console.log(`${partida.getJogador2().getNome()} venceu!`);
    } else if (situacao == SituacaoPartida.Empate) {  
        console.log("Empate!");
    }
    jogo.incrementaPartidas();

    exibePlacar();

    console.log("Deseja continuar jogando? (s/n)");
    let resposta: string = prompt();
    if (resposta.toLowerCase() == "n") {
        continuaJogo = false;
    }
}




