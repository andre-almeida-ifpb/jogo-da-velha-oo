import { Peca } from "./Peca";
import { SituacaoPartida } from "./SituacaoPartida";

export default class AvaliadorJogo {

    private static extraiLinha(tabuleiro: (Peca | null)[][], i: number): (Peca | null)[] {
        return tabuleiro[i];
    }

    private static extraiColuna(tabuleiro: (Peca | null)[][], i: number): (Peca | null)[] {
        return [tabuleiro[0][i], tabuleiro[1][i], tabuleiro[2][i]]
    }

    private static extraiDiagonalPrincipal(tabuleiro: (Peca | null)[][]): (Peca | null)[] {
        return [tabuleiro[0][0], tabuleiro[1][1], tabuleiro[2][2]];
    }

    private static extraiDiagonalSecundaria(tabuleiro: (Peca | null)[][]): (Peca | null)[] {
        return [tabuleiro[0][2], tabuleiro[1][1], tabuleiro[2][0]];
    }

    private static verificaVencedor(trinca: (Peca | null)[]): SituacaoPartida | undefined {
        if (trinca.filter( e => e == trinca[0] ).length == 3) {
            if (trinca[0] == Peca.Xis) {
                return SituacaoPartida.VitoriaJogador1;
            } else if (trinca[0] == Peca.Circulo) {
                return SituacaoPartida.VitoriaJogador2;
            } else {
                return undefined
            }
        } else {
            return undefined;
        }
    }

    private static verificaEmpate(tabuleiro: (Peca | null)[][]): SituacaoPartida | undefined {
        const pecas = [ ...tabuleiro[0], ...tabuleiro[1], ...tabuleiro[2] ];
        if (pecas.filter( e => e != null ).length == 9) {
            return SituacaoPartida.Empate;
        } else {
            return undefined;
        }
    }

    public static verificaFim(tabuleiro: (Peca | null)[][]): SituacaoPartida {

        let situacao: SituacaoPartida | undefined = undefined;

        for (let i = 0; i < 3; i++) {
            situacao = AvaliadorJogo.verificaVencedor(AvaliadorJogo.extraiLinha(tabuleiro, i));
            if (situacao != undefined) {
                return situacao;
            }
        }

        for (let i = 0; i < 3; i++) {
            situacao = AvaliadorJogo.verificaVencedor(AvaliadorJogo.extraiColuna(tabuleiro, i));
            if (situacao != undefined) {
                return situacao;
            }
        }
        
        situacao = AvaliadorJogo.verificaVencedor(AvaliadorJogo.extraiDiagonalPrincipal(tabuleiro));
        if (situacao != undefined) {
            return situacao;
        }

        situacao = AvaliadorJogo.verificaVencedor(AvaliadorJogo.extraiDiagonalSecundaria(tabuleiro));
        if (situacao != undefined) {
            return situacao;
        }

        situacao = AvaliadorJogo.verificaEmpate(tabuleiro);
        if (situacao != undefined) {
            return situacao;
        }
        
        return SituacaoPartida.EmAndamento;
    }

}