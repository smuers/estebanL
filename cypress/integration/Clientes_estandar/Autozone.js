/// <reference types="Cypress"/>

//Suite de primeros CP
describe('Detonación de eventos Clientes Estandar', function()
{

    beforeEach(() => { 
        
        //Cargar parametros
        cy.fixture('parametros').then(function(param){
            this.param = param

            //Ingresar a página
            cy.login(this.param.ambiente.url_amb, this.param.credenciales.credenciales_autozone.user, this.param.credenciales.credenciales_autozone.password)
         })

         //Cargar Inputs
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
       
    })


    //CP detonación de evento Inicio de carga
    it('Evento Inicio de Carga Autozone', function(){

        cy.eventoInicCarga
        (this.param.modulos.eventos.inic_carga, this.inputs.inputs_autozone, this.param.credenciales.credenciales_autozone.mensaje)
   })   
   //Fin CP

   //CP detonación de evento Fin de carga
   it('Evento Fin de Carga Autozone', function(){

        cy.eventoFinCarga
        (this.param.modulos.eventos.fin_carga, this.inputs.inputs_autozone, this.param.credenciales.credenciales_autozone.mensaje)
    
    }) 
    //Fin CP


})