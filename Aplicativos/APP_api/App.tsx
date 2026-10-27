
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

type Publicacao = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function App() {
  const [publicacao, setPublicacao] = useState<Publicacao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [contador, setContador] = useState(1);
  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');

  // GET: buscar uma publicação
  async function buscarPublicacao(id: number = contador) {
    try {
      setCarregando(true);
      setErro(null);

      const resposta = await fetch(`${API_URL}/${id}`);

      if (!resposta.ok) {
        throw new Error('Publicação não encontrada.');
      }

      const dados: Publicacao = await resposta.json();

      setPublicacao(dados);
      setContador(id);
      setTitulo(dados.title);
      setCorpo(dados.body);
    } catch (e) {
      setErro(
        e instanceof Error
          ? e.message
          : 'Não foi possível carregar os dados.'
      );
    } finally {
      setCarregando(false);
    }
  }

  // POST: criar uma publicação
  async function criarPublicacao() {
    try {
      if (!titulo.trim() || !corpo.trim()) {
        Alert.alert('Atenção', 'Preencha o título e o conteúdo.');
        return;
      }

      setCarregando(true);
      setErro(null);

      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: titulo,
          body: corpo,
          userId: 1,
        }),
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível criar a publicação.');
      }

      const dados: Publicacao = await resposta.json();
      setPublicacao(dados);

      Alert.alert('POST realizado', `ID retornado: ${dados.id}`);
    } catch (e) {
      setErro(
        e instanceof Error ? e.message : 'Erro ao criar publicação.'
      );
    } finally {
      setCarregando(false);
    }
  }

  // PUT: substituir a publicação inteira
  async function atualizarComPUT() {
    if (!publicacao) return;

    try {
      if (!titulo.trim() || !corpo.trim()) {
        Alert.alert('Atenção', 'Preencha o título e o conteúdo.');
        return;
      }

      setCarregando(true);
      setErro(null);

      const resposta = await fetch(`${API_URL}/${publicacao.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          id: publicacao.id,
          userId: publicacao.userId,
          title: titulo,
          body: corpo,
        }),
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível substituir a publicação.');
      }

      const dados: Publicacao = await resposta.json();
      setPublicacao(dados);

      Alert.alert('PUT realizado', 'Publicação substituída na resposta da API.');
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao executar PUT.');
    } finally {
      setCarregando(false);
    }
  }

  // PATCH: alterar somente o título
  async function atualizarComPATCH() {
    if (!publicacao) return;

    try {
      if (!titulo.trim()) {
        Alert.alert('Atenção', 'Digite um título.');
        return;
      }

      setCarregando(true);
      setErro(null);

      const resposta = await fetch(`${API_URL}/${publicacao.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: titulo,
        }),
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível alterar o título.');
      }

      const dados: Publicacao = await resposta.json();
      setPublicacao(dados);
      setTitulo(dados.title);
      setCorpo(dados.body);

      Alert.alert('PATCH realizado', 'Título alterado na resposta da API.');
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao executar PATCH.');
    } finally {
      setCarregando(false);
    }
  }

  // DELETE: excluir uma publicação
  async function excluirPublicacao() {
    if (!publicacao) return;

    try {
      setCarregando(true);
      setErro(null);

      const resposta = await fetch(`${API_URL}/${publicacao.id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível excluir a publicação.');
      }

      const idExcluido = publicacao.id;

      setPublicacao(null);
      setTitulo('');
      setCorpo('');

      Alert.alert(
        'DELETE realizado',
        `A API confirmou a exclusão simulada da publicação ${idExcluido}.`
      );
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao executar DELETE.');
    } finally {
      setCarregando(false);
    }
  }

  // Executa GET quando a tela abre
  useEffect(() => {
    buscarPublicacao(1);
  }, []);

  function proximaPublicacao() {
    const proximo = contador >= 100 ? 1 : contador + 1;
    buscarPublicacao(proximo);
  }

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.texto}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tituloPrincipal}>App API - JSONPlaceholder</Text>

      {erro ? (
        <View style={styles.caixaErro}>
          <Text style={styles.erro}>{erro}</Text>
          <Button
            title="Tentar novamente"
            onPress={() => buscarPublicacao(contador)}
          />
        </View>
      ) : null}

      {publicacao ? (
        <View style={styles.card}>
          <Text style={styles.subtitulo}>
            Publicação #{publicacao.id}
          </Text>
          <Text style={styles.tituloPublicacao}>{publicacao.title}</Text>
          <Text style={styles.corpo}>{publicacao.body}</Text>
        </View>
      ) : (
        <Text style={styles.texto}>Nenhuma publicação selecionada.</Text>
      )}

      <Button title="GET - Buscar próxima" onPress={proximaPublicacao} />

      <Text style={styles.subtitulo}>Dados da publicação</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, styles.inputCorpo]}
        placeholder="Digite o conteúdo"
        value={corpo}
        onChangeText={setCorpo}
        multiline
      />

      <View style={styles.botao}>
        <Button title="POST - Criar publicação" onPress={criarPublicacao} />
      </View>

      <View style={styles.botao}>
        <Button title="PUT - Substituir publicação" onPress={atualizarComPUT} />
      </View>

      <View style={styles.botao}>
        <Button title="PATCH - Alterar título" onPress={atualizarComPATCH} />
      </View>

      <View style={styles.botao}>
        <Button
          title="DELETE - Excluir publicação"
          color="#dc2626"
          onPress={excluirPublicacao}
        />
      </View>

      <Text style={styles.rodape}>
        API de testes: as alterações não são salvas permanentemente.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 55,
    backgroundColor: '#f3f4f6',
  },
  centralizado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  texto: {
    marginTop: 10,
    fontSize: 16,
    color: '#374151',
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1d4ed8',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  tituloPublicacao: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
  },
  corpo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  inputCorpo: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  botao: {
    marginTop: 8,
    marginBottom: 8,
  },
  caixaErro: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  erro: {
    color: '#b91c1c',
    marginBottom: 10,
    fontSize: 16,
  },
  rodape: {
    marginTop: 20,
    marginBottom: 30,
    color: '#6b7280',
    textAlign: 'center',
  },
});
