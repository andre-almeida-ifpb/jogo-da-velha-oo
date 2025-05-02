import Jogador from "./Jogador";
import { Peca } from "./Peca";

export default class JogadorAutomatizado extends Jogador {

    constructor(nome: string) {
        super(nome);
    }

    public realizaJogada(tabuleiro: (Peca | undefined)[][]): [number, number] | undefined {
        
        for (let i = 0; i < tabuleiro.length; i++) {
            for (let j = 0; j < tabuleiro[i].length; j++) {
                if (tabuleiro[i][j] == undefined) {
                    return [i, j];
                }
            }
        }

        return undefined;

    }

}