export class ClienteService {
    static BASE_URL = 'http://localhost:3000/clientes';



    // Buscar cliente por código
    static async buscarPorCodigo(codigo) {
        try {
            const response = await fetch(`${this.BASE_URL}/${codigo}`);
            const text = await response.text();

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                throw new Error(error.error || 'Erro ao buscar cliente');
            }

            return text ? JSON.parse(text) : null;
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            throw error;
        }
    }

    // Buscar plantas do cliente
    static async buscarPlantasDoCliente(codigo) {
        try {
            const response = await fetch(`${this.BASE_URL}/${codigo}/plantas/estado`);

            // Primeiro, obtemos o texto/JSON da resposta UMA ÚNICA VEZ
            const responseData = await response.text();

            // Verifica se é 404 - retorna false
            if (response.status === 404) {
                return false;
            }

            // Verifica outros erros
            if (!response.ok) {
                const error = responseData ? JSON.parse(responseData) : { error: 'Erro na requisição' };
                throw new Error(error.error || `Erro ${response.status} ao buscar plantas`);
            }

            // Se chegou aqui, é sucesso (200-299)
            return responseData ? JSON.parse(responseData) : [];

        } catch (error) {
            console.error('Erro ao buscar plantas do cliente:', error);

            // Distingue entre erro de rede e outros erros
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Erro de conexão - verifique sua internet');
            }

            throw error;
        }
    }

    // Buscar cliente por email
    static async buscarPorEmail(email) {
        try {
            const response = await fetch(`${this.BASE_URL}/buscar/${encodeURIComponent(email)}`);
            const text = await response.text();

            if (response.status === 404) { return false; }

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                return null;
                //throw new Error(error.error || 'Erro ao buscar cliente por email');
            }

            return text ? JSON.parse(text) : null;
        } catch (error) {
            //console.error('Erro ao buscar cliente por email:', error);
            return null;
        }
    }


    static async verificarSenha(email, senha) {
        try {
            const response = await fetch(`${this.BASE_URL}/verificar-senha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao verificar senha');
            }

            return await response.json();
        }
        catch (error) {
            console.error('Erro ao verificar senha:', error);
            throw error;
        }
    }
    // Buscar endereço do cliente
    static async buscarEnderecoDoCliente(codigo) {
        try {
            const response = await fetch(`${this.BASE_URL}/${codigo}/endereco`);
            const text = await response.text();

            if (response.status === 404) { return false; }

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                throw new Error(error.error || 'Erro ao buscar endereço do cliente');
            }
            const t = text ? JSON.parse(text) : null;  // Parse aqui
            return t;
        } catch (error) {
            console.error('Erro ao buscar endereço do cliente:', error);
            throw error;
        }
    }
    //Criar endereço do cliente
    static async criarEndereco(endereco) {
        try {
            const response = await fetch(`${this.BASE_URL}/adiciona/endereco`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(endereco)
            });

            const text = await response.text();
            console.log(text);

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                throw new Error(error.error || 'Erro ao criar endereço');
            }

            return text ? JSON.parse(text) : { message: 'Endereço criado com sucesso' };
        } catch (error) {
            console.error('Erro ao criar endereço:', error);
            throw error;
        }
    }

    //Modificar endereço do cliente
    static async atualizarEndereco(codigo, enderecoData) {
        try {
            const response = await fetch(`${this.BASE_URL}/${codigo}/atualiza/endereco`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enderecoData)
            });

            const text = await response.text();

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                throw new Error(error.error || 'Erro ao atualizar endereço');
            }

            return text ? JSON.parse(text) : { message: 'Endereço atualizado com sucesso' };
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
            throw error;
        }
    }

    // Adicionar novo cliente
    static async adicionarCliente(novoCliente) {
        try {
            const response = await fetch(`${this.BASE_URL}/adiciona/cliente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoCliente)
            });

            const text = await response.text();
            console.log(text);

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                throw new Error(error.error || 'Erro ao adicionar cliente');
            }

            return text ? JSON.parse(text) : { message: 'Cliente adicionado com sucesso' };
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error);
            throw error;
        }
    }

    // Atualizar cliente (exemplo adicional)
    static async atualizarCliente(codigo, dadosAtualizados) {
        try {
            const response = await fetch(`${this.BASE_URL}/${codigo}/atualiza/cliente`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            });

            const text = await response.text();

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                throw new Error(error.error || 'Erro ao atualizar cliente');
            }

            return text ? JSON.parse(text) : { message: 'Cliente atualizado com sucesso' };
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw error;
        }
    }

    // Remover cliente (exemplo adicional)
    static async removerCliente(codigo) {
        try {
            const response = await fetch(`${this.BASE_URL}/${codigo}/deleta`, {
                method: 'DELETE'
            });

            const text = await response.text();

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                throw new Error(error.error || 'Erro ao remover cliente');
            }

            return text ? JSON.parse(text) : { message: 'Cliente removido com sucesso' };
        } catch (error) {
            console.error('Erro ao remover cliente:', error);
            throw error;
        }
    }

    // Método fazerLogin CORRIGIDO
    static async fazerLogin(email, senha) {
        try {
            // Validação dos inputs
            if (!email || !senha) {
                return {
                    success: false,
                    error: 'Email e senha são obrigatórios',
                    errorType: 'MISSING_CREDENTIALS',
                    statusCode: 400
                };
            }


            const loginData = {
                EMAIL: email,
                SENHA: senha
            };

            const response = await fetch(`${this.BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const responseData = await response.json();

            if (response.ok) {
                // Login bem-sucedido
                return {
                    success: true,
                    user: responseData.user, // ← Dados completos do usuário
                    message: responseData.message,
                    statusCode: response.status
                };
            } else {
                // Login falhou
                return {
                    success: false,
                    error: responseData.error || 'Erro no login',
                    errorType: 'LOGIN_FAILED',
                    statusCode: response.status
                };
            }

        } catch (error) {
            console.error('Erro no login:', error);

            // Tratamento de erros de rede
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                return {
                    success: false,
                    error: 'Erro de conexão. Verifique sua internet',
                    errorType: 'NETWORK_ERROR',
                    statusCode: 0
                };
            }

            return {
                success: false,
                error: 'Erro interno do servidor',
                errorType: 'INTERNAL_ERROR',
                statusCode: 500
            };
        }
    } catch(error) {
        console.error('Erro no login:', error);

        // Identifica o tipo de erro
        let errorMessage = 'Erro durante o login';
        let errorType = 'UNKNOWN_ERROR';

        if ((error.message.includes('Cliente não encontrado')) || (error.message.includes('Pessoa não encontrada'))) {
            errorMessage = 'Email não encontrado';
            errorType = 'EMAIL_NOT_FOUND';
            return 1;
        } else if (error.message.includes('network')) {
            errorMessage = 'Problema de conexão. Verifique sua internet';
            errorType = 'NETWORK_ERROR';
            return 2;
        } else if (error.message.includes('fetch')) {
            errorMessage = 'Servidor indisponível no momento';
            errorType = 'SERVER_ERROR';
            return 3;
        }
    }


    //imagem
    static async uploadImagemPerfil(codigo, arquivoImagem) {
        try {
            const formData = new FormData();
            formData.append('profileImage', arquivoImagem);

            const response = await fetch(`${this.BASE_URL}/${codigo}/upload-image`, {
                method: 'POST',
                body: formData
                // Note: Não definir Content-Type header, o browser fará isso automaticamente
                // com o boundary correto para FormData
            });

            const text = await response.text();

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro no upload da imagem' };
                throw new Error(error.error || 'Erro ao fazer upload da imagem');
            }

            return text ? JSON.parse(text) : { message: 'Imagem enviada com sucesso' };
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);

            // Tratamento específico para erros comuns
            if (error.message.includes('tamanho')) {
                throw new Error('A imagem é muito grande. Tamanho máximo: 5MB');
            } else if (error.message.includes('imagem')) {
                throw new Error('Formato de arquivo não suportado. Use JPG, PNG ou GIF');
            } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Erro de conexão. Verifique sua internet');
            }

            throw error;
        }
    }

    // REMOVER IMAGEM DE PERFIL
    static async removerImagemPerfil(codigo) {
        try {
            const response = await fetch(`${this.BASE_URL}/${codigo}/remove-image`, {
                method: 'DELETE'
            });

            const text = await response.text();

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro ao remover imagem' };
                throw new Error(error.error || 'Erro ao remover imagem de perfil');
            }

            return text ? JSON.parse(text) : { message: 'Imagem removida com sucesso' };
        } catch (error) {
            console.error('Erro ao remover imagem:', error);

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Erro de conexão. Verifique sua internet');
            }

            throw error;
        }
    }

    // OBTER URL COMPLETA DA IMAGEM (helper function)
    static getUrlImagemPerfil(nomeArquivo) {
        if (!nomeArquivo) return null;
        return `${this.BASE_URL.replace('/clientes', '')}/uploads/profiles/${nomeArquivo}`;
    }

    // VALIDAR IMAGEM ANTES DO UPLOAD (client-side validation)
    static validarImagem(arquivo) {
        // Verificar se é um arquivo
        if (!arquivo || !(arquivo instanceof File)) {
            throw new Error('Nenhum arquivo selecionado');
        }

        // Verificar tamanho (máximo 5MB)
        const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
        if (arquivo.size > tamanhoMaximo) {
            throw new Error('A imagem deve ter no máximo 5MB');
        }

        // Verificar tipo do arquivo
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!tiposPermitidos.includes(arquivo.type)) {
            throw new Error('Formato de imagem não suportado. Use JPG, PNG, GIF ou WebP');
        }

        return true;
    }

    //recuperação de senha
    static async solicitarRecuperacaoSenha(email) {
        try {
            const response = await fetch(`${this.BASE_URL}/solicitar-recuperacao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao solicitar recuperação');
            }

            return data;
        } catch (error) {
            console.error('Erro ao solicitar recuperação:', error);
            throw error;
        }
    }

    static async verificarCodigoRecuperacao(email, code) {
        try {
            console.log('Iniciando verificação para email:', email, 'código:', code);  // DEBUG: Log inicial

            const response = await fetch(`${this.BASE_URL}/verificar-codigo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code })
            });

            console.log('Status da resposta:', response.status);  // DEBUG: Status HTTP
            console.log('OK?', response.ok);  // DEBUG: OK?

            // Pega o texto da resposta PRIMEIRO para debugar
            const responseText = await response.text();
            console.log('Texto da resposta:', responseText);  // DEBUG: Conteúdo cru (JSON ou erro)

            let data;
            try {
                data = responseText ? JSON.parse(responseText) : {};
            } catch (parseError) {
                console.error('Erro ao parsear JSON:', parseError);  // DEBUG: Se JSON inválido
                throw new Error(`Resposta inválida do servidor: ${responseText.substring(0, 200)}`);  // Trunca para não poluir
            }

            if (response.ok) {
                // Sucesso: código válido
                console.log('Código válido!');  // DEBUG
                return {
                    success: true,
                    valid: data.valid || true,
                    message: data.message || 'Código verificado com sucesso'
                };
            } else if (response.status === 400) {
                // Código inválido/expirado: não fatal
                console.log('Código inválido (400)');  // DEBUG
                return {
                    success: false,
                    valid: false,
                    error: data.error || 'Código inválido ou expirado'
                };
            } else {
                // Outros erros (ex.: 500)
                console.error('Erro HTTP não tratado:', response.status, data);  // DEBUG
                throw new Error(data.error || `Erro ${response.status} do servidor`);
            }
        } catch (error) {
            console.error('Erro completo na verificação:', {
                message: error.message,
                name: error.name,
                stack: error.stack,
                email: email,
                code: code  // Mas não logue o código real em prod!
            });  // Linha ~478: Este é o log que você vê

            // Tipos de erro comuns:
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                return { success: false, valid: false, error: 'Erro de conexão. Verifique sua internet' };
            } else if (error.name === 'SyntaxError') {
                return { success: false, valid: false, error: 'Resposta inválida do servidor' };
            } else {
                return { success: false, valid: false, error: error.message || 'Erro ao verificar código' };
            }
        }
    }

    static async redefinirSenha(email, code, newPassword) {
        try {
            const response = await fetch(`${this.BASE_URL}/redefinir-senha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code, newPassword })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao redefinir senha');
            }

            return data;
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            throw error;
        }
    }

    static async criarContato(contato) {
        try {
            const response = await fetch(`${this.BASE_URL}/contato`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contato)
            });

            const text = await response.text();
            console.log(text);

            if (!response.ok) {
                const error = text ? JSON.parse(text) : { error: 'Erro na requisição' };
                throw new Error(error.error || 'Erro ao adicionar contato');
            }

            return text ? JSON.parse(text) : { message: 'Contato adicionado com sucesso' };
        } catch (error) {
            console.error('Erro ao adicionar contato:', error);
            throw error;
        }
    }

}