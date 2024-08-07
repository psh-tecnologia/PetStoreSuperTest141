// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 387546401

// Em Javascript, Classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Entidade Pet', () => {

    //Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL
    
    // Funções ou métodos: Its
    it('POST Pet', ( ) => {
        // Atributos, Campos, Características, Configurações

        // Funções de Apoio (Opcional)

        // Funções de Teste em Si


    }) // Final do método POST

    
})// Termina a describe

