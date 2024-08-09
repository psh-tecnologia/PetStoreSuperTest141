// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 387546401

// Em Javascript, Classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Entidade Pet', () => {

    //Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL
    
    // Funções ou métodos: Its
    it('POST Pet', async ( ) => {
        // Atributos, Campos, Características, Configurações
        const pet = await require('../../vendors/json/pet.json')

        //Função de Teste em Si
        return await request
            .post('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(petId)
                expect(res.body.name).toBe('Snoopy')
                expect(res.body.category.name).toBe('dog')
                expect(res.body.tags[0].name).toBe('vaccined')
            })


    }) // Final do método POST

    it('GET Pet', async () => {
        return await request
        .get(`/pet/${petId}`)
        .then((res) => {
            expect(res.statusCode).toBe(200)
            expect(res.body.id).toBe(petId)
            expect(res.body.status).toBe('available')
        })
    })

    it('PUT Pet', async () => {
        const pet = await require('../../vendors/json/petput.json')

        return await request
            .put('/pet')
            .send(pet)
            .then((res) =>{
                expect(res.statusCode).toEqual(200)
                expect(res.body.status).toEqual('sold')
            })
                
    })

    it('DELETE Pet', async () => {
        return await request
            .delete(`/pet/${petId}`)
            .then((res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.message).toBe(petId.toString())
            })
    })

    
})// Termina a describe

