//import 'cypress-file-upload';

//Rutina Login
Cypress.Commands.add("login", (url, user, pass) => {
    //Ingresar a página
    cy.visit(url)
    cy.log(url)

    //Ingresar credenciales 
    cy.get('#User').type(user)
    cy.get('#Password').type(pass)

    //Click en botón Iniciar Sesión
    cy.get(':nth-child(4) > .login100-form-btn').click()
    cy.wait(2000);
})
//Fin rutina login


//***** Rutinas de eventos para clientes estandar *****//

//Rutina Evento Entrada
Cypress.Commands.add("eventoEntrada", (url_entrada, credencial_condutor, shipment, eco_caja, caso) => {
       
    cy.get('.has_sub').as('Eventos')

    cy.get('@Eventos').find('a').each(($el, index, $list) => {
        
        var link_event = $el.attr('href')

        //Validar si existe el evento ENTRADA
        if(link_event?.includes('feature_key='+url_entrada)){
            cy.log('Si tengo ENTRADA')
        
            //Ingresar a evento Entrada
            cy.get('.has_sub a[href*="feature_key='+url_entrada+'"]').click({ force: true })
            //cy.get('@Eventos').eq(index).click({ force: true })

            //Ingresar datos en campos
            cy.wait(2000);
            cy.get('#credential').type(credencial_condutor)
            cy.get('#cardautentifier_certified_button').click()

            cy.get('#shipment').type(shipment)
            cy.get('#trailer_eco').type(eco_caja)
            cy.get('#shipment_card_button_save').click()
            
            switch(caso){
                case "viaje_exitoso":
                    //Caso registro exitoso
                    cy.get('.toast-message').contains('Registro exitoso').then((contains)=>{
                        //cy.log(contains)
                        cy.log("Registro evento Entrada exitoso")  
                    })  
                break;
                
                case "viaje_no_encontrado":
                    //Buscar shipment a asignar y dar click en Confirmar de la tabla
                    cy.get('.toast-message').contains('Viaje no encontrado').then((contains)=>{
                    cy.log("")  
                    })  
                    
                break;
                
                case "viaje_registrado_anteriormente":
                    //Buscar shipment a asignar y dar click en Confirmar de la tabla
                    cy.get('.toast-message').contains('Este evento ya fue registrado en otro momento').then((contains)=>{
                    cy.log("")  
                    })  
                    
                break;
            } 

        }
    
    })
}) 
//Fin rutina evento Entrada


//***** Fin rutinas de eventos para clientes estandar *****//