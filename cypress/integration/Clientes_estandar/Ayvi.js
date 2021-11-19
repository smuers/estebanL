/// <reference types="Cypress"/>

//Suite de primeros CP
describe('Detonación de eventos Clientes Estandar', function()
{

    beforeEach(() => { 
        
        //Llamar rutina carga de configuración cliente
    
        //Cargar parametros de parametros.json 
        cy.fixture('parametros').then(function(param){
            this.param = param

            //Llamar rutina login
            cy.login
            (this.param.ambiente.url_amb, this.param.credenciales.credenciales_ayvi.user, this.param.credenciales.credenciales_ayvi.password)
        })

         //Cargar Inputs de inputs.json
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
       
    })

    //CU evento Entrada
    it('Evento Entrada', function(){
        
        //Llamar rutina evento entrada
        cy.eventoEntrada
        (this.param.modulos.eventos.entrada, this.inputs.inputs_ayvi.entrada.credencial_condutor, this.inputs.inputs_ayvi.entrada.shipment, this.inputs.inputs_ayvi.entrada.eco_caja, this.inputs.inputs_ayvi.entrada.caso_prueba)


    })  
    //Fin CP evento Entrada

    //CP evento Inicio de carga
    it('Evento Inicio de Carga', function(){
       
        //Llamar rutina evento inicio de carga
        cy.eventoInicCarga
        (this.param.modulos.eventos.inic_carga, this.inputs.inputs_ayvi.ini_carga.shipment, this.param.credenciales.credenciales_ayvi.cliente)
        
    }) 
    //Fin CP


    //CP evento Fin de carga
    it('Evento Fin de Carga', function(){

        //Llamar rutina evento fin de carga
        cy.eventoFinCarga
        (this.param.modulos.eventos.fin_carga, this.inputs.inputs_ayvi.fin_carga.shipment, this.param.credenciales.credenciales_ayvi.cliente)
        
    }) 
    //Fin CP


    //Evento Fin de Carga by Miguel
/*     it('Fin de Carga', function(){

        //ingersar a modulo de carga de pedidos
        cy.get('.has_sub a[href*="END_LOAD"]').click({ force: true })
        //busqueda del folio de carga actual
        cy.get('.sorting_1').contains(this.param.inputs_entrada.shipment).should('be.visible')
        //Clic en boton Detalle de viaje
        cy.get(':nth-child(5) > .btn').should('be.visible').click()
        cy.wait(3000)
        //Validar Pedido contenga el # de viaje
        cy.get('.card-order-header > h5').contains(this.param.Detalles_de_viaje.pedido).should('be.visible')//.should('be.visible',this.param.Detalles_de_viaje.pedido)//
        //validar F/H cita de entrega
        cy.get(':nth-child(3) > .order-point').contains(this.param.Detalles_de_viaje.Cita_de_entrega).should('be.visible')//should('be.visible',this.param.Detalles_de_viaje.Cita_de_entrega)//
        //Cerrar detalles
        cy.get('.fa-arrow-right').click({ force: true })
        //Click en boton confirmar
        cy.get(':nth-child(6) > .btn').should('be.visible').click({ force: true })
        //Validar contenga el el modal de confirmacion
        cy.get('.confirmation-modal > .modal-dialog > .modal-content').should('be.visible')
        //Validar presente el viaje que se cargo en el modal
        cy.get('.confirmation-modal > .modal-dialog > .modal-content > .modal-body').contains(this.param.inputs_entrada.shipment).should('be.visible') ////.should('be.visible','have.text', this.param.inputs_entrada.shipment)
        //validar boton cancelar
        cy.get('.cancel').should('be.visible').click({force: true})
        cy.wait(2000)
        //validar nuevamente el boton confirmar viaje
        cy.get(':nth-child(6) > .btn').should('be.visible').click({ force: true })
        //Validar nuevamente el popup y que presente el viaje que se cargo en el modal
        cy.get('body > div.confirmation-modal.modal.fade.in > div > div').contains(this.param.inputs_entrada.shipment).should('be.visible')//.contains(this.param.inputs_entrada.shipment).should('be.visible')
        //clic en el boton confirmar
        cy.get('.confirm').should('be.visible').click({force: true})
   }) */
   //Fin CP

   //Evento Documentos

    /* it('Documentos', function(){
        //ingersar a modulo de carga de Documentos
        //Validar que contenga el viaje
        //validar 
    }) */


})