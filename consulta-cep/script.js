document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const localidadeInput = document.getElementById('localidade');
    const ufInput = document.getElementById('uf');
    const numeroInput = document.getElementById('numero');
    const complementoInput = document.getElementById('complemento');
    
    // Adicione uma referência ao formulário e à mensagem de sucesso
    const cepForm = document.getElementById('cepForm');
    const successMessage = document.getElementById('successMessage');

    cepInput.addEventListener('blur', async () => {
        const cep = cepInput.value.replace(/\D/g, '');

        if (cep.length === 8) {
            try {
                const url = `https://viacep.com.br/ws/${cep}/json/`;
                const response = await fetch(url);
                const data = await response.json();

                if (!data.erro) {
                    logradouroInput.value = data.logradouro;
                    bairroInput.value = data.bairro;
                    localidadeInput.value = data.localidade;
                    ufInput.value = data.uf;
                    
                    numeroInput.focus();

                } else {
                    alert('CEP não encontrado. Por favor, verifique o número.');
                    limparCampos();
                }

            } catch (error) {
                console.error('Erro ao buscar o CEP:', error);
                alert('Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.');
                limparCampos();
            }
        } else {
            limparCampos();
        }
    });

    // Adiciona o evento de submit ao formulário
    cepForm.addEventListener('submit', (event) => {
        // Previne o comportamento padrão do formulário (recarregar a página)
        event.preventDefault();

        // Verifica se os campos obrigatórios estão preenchidos
        if (cepInput.value && numeroInput.value) {
            // Exibe a mensagem de sucesso
            successMessage.classList.remove('hidden');

            // Opcional: limpa os campos após o cadastro
            limparCampos();
            cepInput.value = '';
            numeroInput.value = '';
            complementoInput.value = '';

            // Esconde a mensagem após 4 segundos
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 4000); // 4000 milissegundos = 4 segundos
        } else {
            alert("Por favor, preencha todos os campos obrigatórios (CEP e Número).");
        }
    });

    function limparCampos() {
        logradouroInput.value = '';
        bairroInput.value = '';
        localidadeInput.value = '';
        ufInput.value = '';
    }
});