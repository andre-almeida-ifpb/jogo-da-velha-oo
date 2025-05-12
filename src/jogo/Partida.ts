import Jogador from "./Jogador";
import { Peca } from "./Peca";
import { SituacaoPartida } from "./SituacaoPartida";


export default class Partida {

    private jogador1: Jogador;
    private jogador2: Jogador;
    private tabuleiro: (Peca | null)[][];
    private vezJogador1: boolean;

    constructor(jogador1: Jogador, jogador2: Jogador) {
        this.jogador1 = jogador1;
        this.jogador2 = jogador2;
        this.tabuleiro = [[null, null, null], [null, null, null], [null, null, null]];
        this.vezJogador1 = true;
    }

    public getJogador1(): Jogador {
        return this.jogador1;
    }

    public getJogador2(): Jogador {
        return this.jogador2;
    }

    public getTabuleiro(): (Peca | null)[][] {
        return this.tabuleiro;
    }

    public getVezJogador1(): boolean {
        return this.vezJogador1;
    }

    public joga(linha: number, coluna: number): boolean {
        if (this.tabuleiro[linha][coluna] == null) {
            if (this.vezJogador1) {
                this.tabuleiro[linha][coluna] = Peca.Xis;
            } else {
                this.tabuleiro[linha][coluna] = Peca.Circulo;
            }
    
            this.vezJogador1 = !this.vezJogador1;
            return true;
        } else {
            return false;
        }
    }

}
