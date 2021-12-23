/// <reference types="Cypress"/>

describe('Detonación de eventos Clientes Estandar', function()
{
    beforeEach(() => { 
        cy.fixture('parametros').then(function(param){
            this.param = param
            //login
            cy.login
            (this.param.ambiente.url_amb, this.param.credenciales.credenciales_bimbo.user, this.param.credenciales.credenciales_bimbo.password)
        })
         //Cargar Inputs 
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
    })
    //evento de entrada
    it('Evento Entrada Bimbo', function(){
        //rutina evento entrada
        cy.rutinaEventosFormulario
        (this.param.modulos.eventos.entrada, this.inputs.inputs_bimbo, this.param.credenciales.credenciales_bimbo.mensaje)
    }) 
    //fin evento entrada
    //evento de incio de carga/ consulta de operadores 
    it('Evento Inicio de Carga/Consulta de operadores', function(){
        //Llamar rutina evento inicio de carga/ consulta de operadores 
        cy.rutinaEventosFormulario
       (this.param.modulos.eventos.inic_carga,  this.inputs.inputs_bimbo, this.param.credenciales.credenciales_bimbo.mensaje)
        
    }) 
    //fin de carga 
    //inicio de salida
    it('Evento Fin de Carga bimbo', function(){
        //rutina evento salida 
        cy.rutinaEventosFormulario
        (this.param.modulos.eventos.salida, this.inputs.inputs_bimbo, this.param.credenciales.credenciales_bimbo.mensaje)
    })   
    //Fin 
})