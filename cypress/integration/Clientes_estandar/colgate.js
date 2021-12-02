/// <reference types="Cypress"/>

describe('Detonación de eventos Clientes Estandar', function()
    {
        it('Evento Inicio de Carga Colgate', function(){

        cy.eventoFinCarga
        (this.param.modulos.eventos.fin_carga, this.inputs.inputs_colgate.fin_carga.shipment, this.param.credenciales.credenciales_ayvi.cliente)
        
    })
})