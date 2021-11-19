//import 'cypress-file-upload';
import 'cypress-file-upload';


//***** Rutinas de beforeEach para clientes estandar *****//

//Rutina obtención de configuración cliente
Cypress.Commands.add("configClient", () => {
    //Interceptar POST
    cy.intercept('POST', '**/FeatureConfig').as('client-config')
    cy.log('@client-config') 
    console.log('@client-config')
    //cy.wait(8000);
    //return ('@client-config')
    //cy.wait('@client-config').its('response.statusCode').should('eq',200)

    //Interceptar POST y validar su contenido
    /*cy.intercept('POST', '/graphql', (req) => {
    console.log(req)
    })*/

})
//Fin rutina obtención de configuración cliente


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
Cypress.Commands.add("CCitasManual", (url_ccm) => {

    cy.get('.has_sub a[href*="feature_key='+url_ccm+'"]').click({ force: true })

})


//***** Rutinas de eventos para clientes estandar *****//

//Rutina Evento Entrada
Cypress.Commands.add("eventoEntrada", (url_entrada, credencial_condutor, shipment, eco_caja, caso) => {
       
    cy.get('.has_sub').as('Eventos')

    cy.get('@Eventos').find('a').each(($el, index, $list) => {
        
        var link_event = $el.attr('href')

        //Validar si existe el evento ENTRADA
        if(link_event?.includes('feature_key='+url_entrada)){
            cy.log('Si tengo ENTRADA')
        
            //Preparado para interceptar FeatureConfig de pantalla
            cy.intercept('POST', '**/FeatureConfig').as('client-config')

            //Ingresar a evento Entrada
            cy.get('.has_sub a[href*="feature_key='+url_entrada+'"]').click({ force: true })
            //cy.get('@Eventos').eq(index).click({ force: true })

            //Obtener FeatureConfig de pantalla
            cy.wait('@client-config').then(console.log)
            console.log('@client-config')

              
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


//Rutina evento Fin de carga
Cypress.Commands.add("eventoFinCarga", (url_fin_carga, shipment, cliente) => {
    cy.log(cliente)
    cy.get('.has_sub').as('Eventos')

    cy.get('@Eventos').find('a').each(($el, index, $list) => {
    
        var link_event = $el.attr('href')

        //Validar si existe el evento Inicio de carga
        if(link_event?.includes('feature_key='+url_fin_carga)){
            cy.log('Si tengo Inicio de carga')

            //Ingresar a evento Inicio de Carga
            cy.get('.has_sub a[href*="feature_key='+url_fin_carga+'"]').click({ force: true })
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
//Fin rutina evento Fin de carga

//***** Fin rutinas de eventos para clientes estandar *****//