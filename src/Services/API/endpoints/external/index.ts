import axios from "axios";

const externalRequest = {
  getAddress: async (cepInputValue: string) =>
    axios
      .get(`https://viacep.com.br/ws/${cepInputValue}/json/`)
      .then((resp) => {
        const { cep, logradouro, bairro, localidade, uf, erro } = resp.data;
        if (erro) return;
        return { cep, logradouro, bairro, localidade, uf };
      }),
};

export default externalRequest;
