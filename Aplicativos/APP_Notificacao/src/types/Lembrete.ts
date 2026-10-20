export type Recorrencia =
  | 'nenhuma'
  | 'diaria'
  | 'semanal';

export interface Lembrete {
  id: string;
  nome: string;
  descricao: string;
  horario: string;
  recorrencia: Recorrencia;
  concluido: boolean;
  notificacaoId?: string;
}