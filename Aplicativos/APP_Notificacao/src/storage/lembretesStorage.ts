import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Lembrete } from '../types/Lembrete';

const CHAVE = '@lembrei:lembretes';

export async function listarLembretes(): Promise<Lembrete[]> {
  const dados = await AsyncStorage.getItem(CHAVE);

  if (!dados) {
    return [];
  }

  return JSON.parse(dados) as Lembrete[];
}

export async function salvarLembretes(
  lembretes: Lembrete[],
): Promise<void> {
  await AsyncStorage.setItem(
    CHAVE,
    JSON.stringify(lembretes),
  );
}