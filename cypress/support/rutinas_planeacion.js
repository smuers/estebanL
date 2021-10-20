//Rutina evento Inicio de carga
Cypress.Commands.add("eventoInicCarga", (url_inic_carga, shipment, cliente) => {
    cy.log(cliente)
    cy.get('.has_sub').as('Eventos')

    cy.get('@Eventos').find('a').each(($el, index, $list) => {
    
        var link_event = $el.attr('href')

        //Validar si existe el evento Inicio de carga
        if(link_event?.includes('feature_key='+url_inic_carga)){
            cy.log('Si tengo Inicio de carga')

            //Ingresar a evento Inicio de Carga
            cy.get('.has_sub a[href*="feature_key='+url_inic_carga+'"]').click({ force: true })
            cy.wait(2000);

            switch(cliente){
                case "ayvi":
                    //Buscar shipment a asignar y dar click en Confirmar de la tabla
                    cy.get("table")
                    .contains('td', shipment)
                    .siblings()
                    .get("div")
                    .contains("button", "Confirmar")
                    .click({ force: true });

                    //Click en Confirmar evento
                    cy.get('.confirm').click()

                    cy.get('.toast-message').contains('Registro exitoso').then((contains)=>{
                        cy.log("Registro evento Entrada exitoso")  
                    })  
                    
                break;
                
                case "autozone":
                    //Buscar shipment a asignar y dar click en Confirmar de la tabla
                    cy.get("table")
                    .contains('td', shipment)
                    .siblings()
                    .get("div")
                    .contains("button", "Confirmar")
                    .click({ force: true });

                    //Click en Confirmar evento
                    cy.get('.confirm').click()

                    cy.get('.toast-message').contains('Registro exitoso').then((contains)=>{
                        cy.log("Registro evento Entrada exitoso")  
                    })  
                    
                break;
            } 
        }
    })  
})


//Fin rutina evento Inicio de carga