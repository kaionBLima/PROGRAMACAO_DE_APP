import { useCallback, useState } from 'react';

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Lembrete } from '../types/Lembrete';

import {
  listarLembretes,
  salvarLembretes,
} from '../storage/lembretesStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'Inicio'>;

export default function HomeScreen({ navigation }: Props) {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);

  const carregarLembretes = useCallback(async () => {
    try {
      const dados = await listarLembretes();
      setLembretes(dados);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar os lembretes.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarLembretes();
    }, [carregarLembretes]),
  );

  async function alternarConclusao(lembrete: Lembrete) {
    const atualizados = lembretes.map((item) =>
      item.id === lembrete.id
        ? { ...item, concluido: !item.concluido }
        : item,
    );

    try {
      await salvarLembretes(atualizados);
      setLembretes(atualizados);
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o lembrete.');
    }
  }

  function confirmarExclusao(lembrete: Lembrete) {
    Alert.alert(
      'Excluir lembrete',
      `Deseja excluir "${lembrete.nome}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const atualizados = lembretes.filter(
              (item) => item.id !== lembrete.id,
            );

            try {
              await salvarLembretes(atualizados);
              setLembretes(atualizados);
            } catch {
              Alert.alert(
                'Erro',
                'Não foi possível excluir o lembrete.',
              );
            }
          },
        },
      ],
    );
  }

  function formatarRecorrencia(lembrete: Lembrete) {
    switch (lembrete.recorrencia) {
      case 'diaria':
        return 'Diariamente';
      case 'semanal':
        return 'Semanalmente';
      default:
        return 'Não repetir';
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lembrei!</Text>

      <Text style={styles.subtitulo}>
        Seus compromissos em um só lugar.
      </Text>

      <Pressable
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('NovoLembrete')}
      >
        <Text style={styles.textoBotaoAdicionar}>
          + Criar novo lembrete
        </Text>
      </Pressable>

      <Text style={styles.tituloLista}>Meus lembretes</Text>

      <FlatList
        data={lembretes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum lembrete cadastrado. Crie o seu primeiro!
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.concluido && styles.cardConcluido,
            ]}
          >
            <View style={styles.linhaTopo}>
              <Text
                style={[
                  styles.nome,
                  item.concluido && styles.nomeConcluido,
                ]}
              >
                {item.nome}
              </Text>

              <Text style={styles.horario}>{item.horario}</Text>
            </View>

            <Text style={styles.descricao}>
              {item.descricao}
            </Text>

            <Text style={styles.recorrencia}>
              {formatarRecorrencia(item)}
            </Text>

            <Text style={styles.status}>
              {item.concluido ? 'Concluído' : 'Pendente'}
            </Text>

            <View style={styles.acoes}>
              <Pressable
                style={styles.botaoConcluir}
                onPress={() => alternarConclusao(item)}
              >
                <Text style={styles.textoAcao}>
                  {item.concluido ? 'Reabrir' : 'Concluir'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.botaoExcluir}
                onPress={() => confirmarExclusao(item)}
              >
                <Text style={styles.textoAcao}>
                  Excluir
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FB',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4636A5',
  },
  subtitulo: {
    color: '#666666',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
  },
  botaoAdicionar: {
    backgroundColor: '#4636A5',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  textoBotaoAdicionar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#292929',
  },
  lista: {
    paddingBottom: 24,
  },
  vazio: {
    color: '#777777',
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E8',
    padding: 16,
    marginBottom: 12,
  },
  cardConcluido: {
    backgroundColor: '#F0F0F0',
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nome: {
    color: '#292929',
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  nomeConcluido: {
    textDecorationLine: 'line-through',
    color: '#777777',
  },
  horario: {
    color: '#4636A5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  recorrencia: {
    color: '#666666',
    fontSize: 13,
    marginTop: 10,
  },
  status: {
    color: '#4636A5',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  acoes: {
    flexDirection: 'row',
    marginTop: 14,
  },
  botaoConcluir: {
    backgroundColor: '#4636A5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  botaoExcluir: {
    backgroundColor: '#B42318',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  textoAcao: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});