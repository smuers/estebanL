/// <reference types="Cypress"/>

//Suite de primeros CP
describe('Detonación de eventos Clientes Estandar', function()
{

    beforeEach(() => { 
        
        //Cargar parametros
        cy.fixture('parametros').then(function(param){
            this.param = param

            //Ingresar a página
            cy.login(this.param.ambiente.url_amb, cliente+this.param.credenciales.user, this.param.credenciales_ayvi.password)
         })

         //Cargar Inputs
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
       
    })


    //CP detonación de evento Inicio de carga
    it('CP detonación de evento Inicio de Carga', function(){

        cy.eventoInicCarga
        (this.param.eventos.inic_carga, this.inputs.inputs_autozone.ini_carga.shipment, )
   })   
   //Fin CP

   //CP detonación de evento Fin de carga
   it('CP detonación de evento Fin de Carga', function(){

        cy.eventoFinCarga
        (this.param.modulos.eventos.fin_carga, this.inputs.inputs_ayvi.fin_carga.shipment, this.param.credenciales.credenciales_ayvi.cliente)
    
    }) 
    //Fin CP

   //Evento Documentos

    /* it('Documentos', function(){
        //ingersar a modulo de carga de Documentos
        //Validar que contenga el viaje
        //validar 
    }) */


})