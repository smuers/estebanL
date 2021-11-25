//import 'cypress-file-upload';
import 'cypress-file-upload';


//***** Rutinas de beforeEach para clientes estandar *****//

//Rutina obtención de configuración cliente
Cypress.Commands.add("configClient", () => {
    //Interceptar POST
    //Preparado para interceptar FeatureConfig de pantalla
    cy.intercept('POST', '**/FeatureConfig').as('client-config')
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
Cypress.Commands.add("eventoEntrada", (url_entrada, array_inputs, msj) => {
         
    //***** Código para validar si existe el evento ENTRADA *****//
    /* cy.get('.has_sub').as('Eventos')

    cy.get('@Eventos').find('a').each(($el, index, $list) => {
        
        var link_event = $el.attr('href')

        if(link_event?.includes('feature_key='+url_entrada)){
            cy.log('Si tengo ENTRADA')
            cy.get('@Eventos').eq(index).click({ force: true }) 
        }
    }) */
    //***** Fin código para validar si existe evento *****//

                
    //Preparado para interceptar FeatureConfig de pantalla
    cy.intercept('POST', '**/FeatureConfig').as('clientConfig')

    //Ingresar a evento Entrada
    cy.get('.has_sub a[href*="feature_key='+url_entrada+'"]').click({ force: true })
    cy.wait(2000)

    //Obtención de Response de FeatureConfig
    cy.wait('@clientConfig').should(({request,response}) => {
        //expect(request.body).to.include('arg00=140')
        var campos = response.body.register.event.fields.field;
        
        //Encontrar si hay conductor en el formulario
        campos.forEach((cms) => {

            var campo = cms['name']
            cy.log(campo)
            
            if(campo=='certificated_driver'){
                //Ingresar datos en campos
                cy.get('#credential').should('be.visible').type('70525')
                cy.get('#cardautentifier_certified_button').should('be.visible').click()

            }else if(campo=='uncertificated_driver'){
                //Ingresar datos en campos
                cy.get('#cardautentifier_uncertified_tab').should('be.visible').click()
                cy.get('#uncertified_driver_name').should('be.visible').type('Esteban Leyva')
                cy.get('#uncertified_transline_name').type('Rc', {force: true})
                cy.wait(1000)
                cy.get('#ui-id-6').click()
                //cy.get('.ui-menu-item > a').eq("Rc").click()
                cy.get('#cardautentifier_uncertified_button').should('be.visible').click()

            }

        })

        //Llenar campos del formulario
        campos.forEach((cms) => {

            var campo = cms['name']
            cy.log(campo)
            
            if(campo!='certificated_driver' && campo!='uncertificated_driver'){

                var camp_inp = array_inputs;
                    cy.log(camp_inp)
                    
                    camp_inp.forEach((cms2) => {

                        var campo_int_2 = cms2[campo]
                        cy.log(campo_int_2)
                        
                            //Ingresar datos en campos
                        cy.get('#'+campo).should('be.visible').type(campo_int_2)

                    })
            }
        })
    })
    //Fin obtención de Response de FeatureConfig

    //Guardar evento
    cy.get('#shipment_card_button_save').should('be.visible').click() 
    
    cy.get('.toast-message').contains(msj).then((contains)=>{
        //cy.log(contains)
        cy.log("CP evento Entrada exitoso")  
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