/// <reference types="Cypress"/>
describe('Detonación de eventos Clientes Estandar', function()
{
    beforeEach(() => { 
        cy.fixture('parametros').then(function(param){
            this.param = param
            //login
            cy.login
            (this.param.ambiente.url_amb, this.param.credenciales.credenciales_kimberly.user, this.param.credenciales.credenciales_kimberly.password)
        })
         //Cargar Inputs 
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
    })
    //carga de pedidos
   it('Carga de pedidos kimberly', function(){
        //Llamar carga de pedidos
        cy.rutinaCargaArchivosTXT
        (this.param.modulos.planeacion.carga_pedidos, this.param.archivos.carga_pedidos_txt_kimberly,this.param.archivos.nume_citas)
    })
    //fin de pedidos
    //evento de entrada
    it('Evento Entrada kimberly', function(){
        //rutina evento entrada
        cy.rutinaEventosFormulario
        (this.param.modulos.eventos.entrada, this.inputs.inputs_kimberly, this.param.credenciales.credenciales_kimberly.mensaje)
    }) 
    //fin evento entrada
    //evento de incio de carga/ consulta de operadores 
    it('Evento Inicio de Carga', function(){
        //Llamar rutina evento inicio de carga/ consulta de operadores 
        cy.rutinaEventosListadoMasFormulario
       (this.param.modulos.eventos.inic_carga,  this.inputs.inputs_kimberly, this.param.credenciales.credenciales_kimberly.mensaje)
        
    }) 
    //fin de carga 
    //inicio de salida
    it('Evento Fin de Carga kimberly', function(){
        //rutina evento salida 
        cy.rutinaEventosFormulario
        (this.param.modulos.eventos.salida, this.inputs.inputs_kimberly, this.param.credenciales.credenciales_kimberly.mensaje)
    })   
    //Fin 
    //inicio fin de documentos
    it('Evento Documentos kimberly', function(){
        //Llamar documentos 
         cy.rutinaEventosFormulario
        (this.param.modulos.eventos.docs, this.inputs.inputs_kimberly, this.param.credenciales.credenciales_kimberly.mensaje)
    }) 
    //fin
})