it('CP detonación de evento Fin de Carga', function(){

    cy.eventoFinCarga
    (this.param.modulos.eventos.fin_carga, this.inputs.inputs_colgate.fin_carga.shipment, this.param.credenciales.credenciales_ayvi.cliente)
    
})