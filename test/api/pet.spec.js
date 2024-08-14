// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 387546401

// Em Javascript, Classe é opcional, mas pode agrupar em uma Describe
describe('API PetStore Swagger - Entidade Pet', () => {

    //Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // BaseURL
    const massa1 = require('../../vendors/json/massaPet')


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

    // Metodo POST que lê e cria 3 registros'

    it.each(massa1.array.map(elemento => [
        elemento.nomePet,
        elemento.idPet,
        elemento.nomeCategoria,
        elemento.idCategoria
    ]))
    ('POST Data Driven', async (nomePet, idPet, nomeCategoria, idCategoria ) => {

        // Atributos, Campos, Características, Configurações
        const pet = await require('../../vendors/json/pet.json')

        // Substituimos os campos que queremos personalizar através da massa
        pet.id = idPet
        pet.name = nomePet
        pet.category.id = idCategoria
        pet.category.name = nomeCategoria

        //Função de Teste em Si
        return await request
            .post('/pet')
            .send(pet)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(idPet)
                expect(res.body.name).toBe(nomePet)
                expect(res.body.category.name).toBe(nomeCategoria)
                expect(res.body.tags[0].name).toBe('vaccined')
            })


    }) // Final do método POST

    // Métodos Get, Put e Delete Simples

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

    // Testes Data Driven do CRUS (POST, GET, PUT e Delete)
    massa1.array.forEach(({ nomePet, idPet, nomeCategoria, idCategoria }) => {
        it(`POST Pet Data Driven ForEach - ${nomePet}`, () => {
             // Atributos, Campos, Características, Configurações
            const pet = require('../../vendors/json/pet.json')

            // Substituimos os campos que queremos personalizar através da massa
            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria

            //Função de Teste em Si
            return request
                .post('/pet')
                .send(pet)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.name).toBe(nomePet)
                    expect(res.body.category.name).toBe(nomeCategoria)
                    expect(res.body.tags[0].name).toBe('vaccined')
                })
            })

            it(`GET Pet Data Driven ForEach - ${nomePet}`, async () => {
                return await request
                .get(`/pet/${idPet}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.id).toBe(idPet)
                    expect(res.body.status).toBe('available')
                })
            })
        
            it(`PUT Pet Data Driven ForEach - ${nomePet}`, async () => {
                const pet = await require('../../vendors/json/petput.json')

                // Substituimos os campos que queremos personalizar através da massa
                pet.id = idPet
                pet.name = nomePet
                pet.category.id = idCategoria
                pet.category.name = nomeCategoria
        
                return await request
                    .put('/pet')
                    .send(pet)
                    .then((res) =>{
                        expect(res.statusCode).toEqual(200)
                        expect(res.body.status).toEqual('sold')
                    })
                        
            })
        
            it(`Delete Pet Data Driven ForEach - ${nomePet}`, async () => {
                return await request
                    .delete(`/pet/${idPet}`)
                    .then((res) => {
                        expect(res.statusCode).toEqual(200)
                        expect(res.body.code).toEqual(200)
                        expect(res.body.message).toBe(idPet.toString())
                    })
            })
    })
    
})// Termina a describe

