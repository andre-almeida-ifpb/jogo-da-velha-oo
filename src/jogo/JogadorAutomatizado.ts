import AvaliadorJogo from "./AvaliadorJogo";
import Jogador from "./Jogador";
import { Peca } from "./Peca";
import { SituacaoPartida } from "./SituacaoPartida";

export default class JogadorAutomatizado extends Jogador {

    constructor(nome: string) {
        super(nome);
    }

    private minimax(tabuleiro: (Peca | null)[][], maximizando: boolean): number {

        const situacao: SituacaoPartida = AvaliadorJogo.verificaFim(tabuleiro);
        if (situacao != SituacaoPartida.EmAndamento) {
            if (situacao == SituacaoPartida.VitoriaJogador1) {                
                return -1;
            } else if (situacao == SituacaoPartida.VitoriaJogador2) {                
                return 1;
            } else {                
                return 0;
            }
        }

        let copiaTabuleiro: (Peca | null)[][] = JSON.parse(JSON.stringify(tabuleiro));
        let melhorValor: number = maximizando ? -Infinity : Infinity;
        
        if (maximizando) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {                    
                    if (tabuleiro[i][j] === null) {         
                        copiaTabuleiro[i][j] = Peca.Circulo;
                        const valor: number = this.minimax(copiaTabuleiro, !maximizando);                        
                        melhorValor = Math.max(melhorValor, valor);
                        copiaTabuleiro[i][j] = null;
                    }
                }
            }            
        } else {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {                    
                    if (tabuleiro[i][j] === null) {         
                        copiaTabuleiro[i][j] = Peca.Xis;
                        const valor: number = this.minimax(copiaTabuleiro, !maximizando);
                        melhorValor = Math.min(melhorValor, valor);
                        copiaTabuleiro[i][j] = null;
                    }
                }
            }
        }

        return melhorValor;
    }

    public realizaJogada(tabuleiro: (Peca | null)[][]): [number, number] | undefined {
        
        let copiaTabuleiro: (Peca | null)[][] = JSON.parse(JSON.stringify(tabuleiro));

        let melhorValor: number = -Infinity;
        let movimento: [number, number] | undefined = undefined;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tabuleiro[i][j] === null) {         
                    copiaTabuleiro[i][j] = Peca.Circulo;
                    const valor: number = this.minimax(copiaTabuleiro, false);                    
                    copiaTabuleiro[i][j] = null                    
                    if (valor > melhorValor) {
                        melhorValor = valor;
                        movimento = [i, j];                        
                    }
                }
            }
        }

        return movimento;
    }

}