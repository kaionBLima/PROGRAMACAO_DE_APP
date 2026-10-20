import { useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Lembrete, Recorrencia } from '../types/Lembrete';

import {
  listarLembretes,
  salvarLembretes,
} from '../storage/lembretesStorage';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'NovoLembrete'
>;

const opcoes: { valor: Recorrencia; texto: string }[] = [
  { valor: 'nenhuma', texto: 'Não repetir' },
  { valor: 'diaria', texto: 'Diariamente' },
  { valor: 'semanal', texto: 'Semanalmente' },
];

export default function NovoLembreteScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('09:00');
  const [recorrencia, setRecorrencia] =
    useState<Recorrencia>('nenhuma');
  const [salvando, setSalvando] = useState(false);

  async function handleSalvar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Digite o nome do lembrete.');
      return;
    }

    if (!descricao.trim()) {
      Alert.alert('Atenção', 'Digite a descrição do lembrete.');
      return;
    }

    const formatoHorario = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

    if (!formatoHorario.test(horario)) {
      Alert.alert(
        'Horário inválido',
        'Digite o horário no formato HH:mm, por exemplo 08:30.',
      );
      return;
    }

    setSalvando(true);

    try {
      const novoLembrete: Lembrete = {
        id: `${Date.now()}`,
        nome: nome.trim(),
        descricao: descricao.trim(),
        horario,
        recorrencia,
        concluido: false,
      };

      const existentes = await listarLembretes();

      await salvarLembretes([
        ...existentes,
        novoLembrete,
      ]);

      Alert.alert('Sucesso', 'Lembrete salvo!');

      navigation.goBack();
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível salvar o lembrete.',
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Novo lembrete</Text>

        <Text style={styles.label}>Nome do lembrete</Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: Estudar programação"
          value={nome}
          onChangeText={setNome}
          maxLength={60}
        />

        <Text style={styles.label}>Descrição</Text>

        <TextInput
          style={[styles.input, styles.inputDescricao]}
          placeholder="Descreva o que você precisa fazer"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          textAlignVertical="top"
          maxLength={300}
        />

        <Text style={styles.label}>Horário</Text>

        <TextInput
          style={styles.input}
          placeholder="09:00"
          value={horario}
          onChangeText={setHorario}
          keyboardType="numbers-and-punctuation"
          maxLength={5}
        />

        <Text style={styles.dica}>
          Utilize o formato de 24 horas: HH:mm.
        </Text>

        <Text style={styles.label}>Recorrência</Text>

        {opcoes.map((opcao) => (
          <Pressable
            key={opcao.valor}
            style={[
              styles.opcao,
              recorrencia === opcao.valor && styles.opcaoSelecionada,
            ]}
            onPress={() => setRecorrencia(opcao.valor)}
          >
            <Text
              style={[
                styles.textoOpcao,
                recorrencia === opcao.valor &&
                  styles.textoOpcaoSelecionada,
              ]}
            >
              {recorrencia === opcao.valor ? '●  ' : '○  '}
              {opcao.texto}
            </Text>
          </Pressable>
        ))}

        <Pressable
          style={[
            styles.botaoSalvar,
            salvando && styles.botaoDesabilitado,
          ]}
          onPress={handleSalvar}
          disabled={salvando}
        >
          <Text style={styles.textoBotao}>
            {salvando ? 'Salvando...' : 'Salvar lembrete'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FB',
  },
  conteudo: {
    padding: 22,
    paddingBottom: 36,
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4636A5',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292929',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8D8E3',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  inputDescricao: {
    minHeight: 100,
  },
  dica: {
    color: '#666666',
    fontSize: 12,
    marginTop: 6,
  },
  opcao: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#D8D8E3',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 8,
  },
  opcaoSelecionada: {
    borderColor: '#4636A5',
    backgroundColor: '#EEECFF',
  },
  textoOpcao: {
    fontSize: 15,
    color: '#444444',
  },
  textoOpcaoSelecionada: {
    color: '#4636A5',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#4636A5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});