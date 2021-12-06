//import 'cypress-file-upload';
import 'cypress-file-upload';


//***** Rutinas de beforeEach para clientes estandar *****//

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


//Rutina eventos por formulario
Cypress.Commands.add("rutinaEventosFormulario", (url_event, array_inputs, msj) => {
         
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

    //Ingresar a evento
    cy.get('.has_sub a[href*="feature_key='+url_event+'"]').click({ force: true })
    cy.wait(2000)

    //Obtención de Response de FeatureConfig
    cy.wait('@clientConfig').should(({request,response}) => {
        //expect(request.body).to.include('arg00=140')

        //Se guarda arreglo de campos encontrados en response
        var campos = response.body.register.event.fields.field;
        
        //Encontrar si hay conductor en el formulario
        campos.forEach((cms) => {

            var campo = cms['name']
            cy.log(campo)
            
            var camp_inp = array_inputs;

            camp_inp.forEach((cms2) => {

                var campo_input = cms2[campo]
                cy.log(campo_input)
            
           
                if(campo=='certificated_driver'){
                    //Ingresar datos en campos de card conductor certificado
                    cy.get('#credential').should('be.visible').type(campo_input)
                    cy.get('#cardautentifier_certified_button').should('be.visible').click()

                }else if(campo=='uncertificated_driver'){
                    //Ingresar datos en campos de card conductor no certificado
                    cy.get('#cardautentifier_uncertified_tab').should('be.visible').click()
                    cy.get('#uncertified_driver_name').should('be.visible').type(campo_input)
                    cy.get('#uncertified_transline_name').type('Recurso Confiable', {force: true})
                    cy.wait(1000)
                    cy.get('#ui-id-6').click()
                    //cy.get('.ui-menu-item > a').eq("Rc").click()
                    cy.get('#cardautentifier_uncertified_button').should('be.visible').click()
                }
            })
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
    
    //Validar mensaje de evento
    cy.get('.toast-message').contains(msj).then((contains)=>{
        //cy.log(contains)
        cy.log("CP evento Entrada exitoso")  
        cy.wait(2000)
    })  
}) 
//Fin rutina eventos por formulario


//Rutina eventos por listado
Cypress.Commands.add("rutinaEventosListado", (url_documentos, inputs) => {
    
    //Preparado para interceptar FeatureConfig de pantalla
    cy.intercept('POST', '**/FeatureConfig').as('clientConfig')
    
    //Ingresar a evento
    cy.get('.has_sub a[href*="feature_key='+url_documentos+'"]').click({ force: true })
    cy.wait(2000)

    cy.wait('@clientConfig').should(({request,response}) => {
        //expect(request.body).to.include('arg00=140')
 
        //Se guarda arreglo de campos encontrados en response
        var columnas = response.body.register.report.table_def;
        cy.log(columnas)
        
        //Obtener las filas
        cy.get('thead > tr').as('filas')
        
        //Encontrar las columnas de las filas
         cy.get('@filas').find('th').each(($el, index, $list) => {
        
            //Encontrar la columna con el titulo 
            columnas.forEach((cms) => {
                var columna = cms['title']
                var nom_column = $el.attr('aria-label')

                if(nom_column?.includes(columna)){
                    
                    cy.log('Se encontró la columna ' + columna)
                }
            })
        })
    })

    //Encontrar llave Shipment de arreglo 
    inputs.forEach((cms2) => {
        var campo_int_2 = cms2['shipment']
        cy.log(campo_int_2)
        
        //Confirmar viaje
        cy.get('.btn-danger[onclick*="'+campo_int_2+'"]').should('be.visible').click()
        cy.wait(1000)
        
        //confirmar acción
        cy.get('.confirm').should('be.visible').click()
        cy.wait(2000)
    })  
})
//Fin rutina eventos por listado


//Rutina eventos por listado + formulario
Cypress.Commands.add("rutinaEventosListadoMasFormualrio", (url_entrada, arry_inputs, msj ) => {
    
    //Preparado para interceptar FeatureConfig de pantalla
    cy.intercept('POST', '**/FeatureConfig').as('clientConfig')
    
    //Ingresar a evento
    cy.get('.has_sub a[href*="feature_key='+url_entrada+'"]').click({ force: true })
    cy.wait(2000)


    //Encontrar llave Shipment de arreglo 
    arry_inputs.forEach((cms2) => {
        var campo_int_2 = cms2['shipment']
        cy.log(campo_int_2)
        
        //Confirmar viaje
        cy.get('.btn-danger[onclick*="'+campo_int_2+'"]').should('be.visible').click()
        cy.wait(1000)
    })

          //nuevo Esteban

       //Obtención de Response de FeatureConfig
       cy.wait('@clientConfig').should(({request,response}) => {
        //expect(request.body).to.include('arg00=140')

        //Se guarda arreglo de campos encontrados en response
        var campos = response.body.register.event.fields.field;
        
        //Encontrar si hay conductor en el formulario
        campos.forEach((cms) => {

            var campo = cms['name']
            cy.log(campo)
            
            var camp_inp = arry_inputs;

            camp_inp.forEach((cms2) => {

                var campo_input = cms2[campo]
                cy.log(campo_input)
            
           
                if(campo=='certificated_driver'){
                    //Ingresar datos en campos de card conductor certificado
                    cy.get('#credential').should('be.visible').type(campo_input)
                    cy.get('#cardautentifier_certified_button').should('be.visible').click()

                }else if(campo=='uncertificated_driver'){
                    //Ingresar datos en campos de card conductor no certificado
                    cy.get('#cardautentifier_uncertified_tab').should('be.visible').click()
                    cy.get('#uncertified_driver_name').should('be.visible').type(campo_input)
                    cy.get('#uncertified_transline_name').type('Recurso Confiable', {force: true})
                    cy.wait(1000)
                    cy.get('#ui-id-6').click()
                    //cy.get('.ui-menu-item > a').eq("Rc").click()
                    cy.get('#cardautentifier_uncertified_button').should('be.visible').click()
                }
            })
        })

        //Llenar campos del formulario
        campos.forEach((cms) => {

            var campo = cms['name']
            cy.log(campo)
            
            if(campo!='certificated_driver' && campo!='uncertificated_driver'){

                var camp_inp = arry_inputs;
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
    
    //Validar mensaje de evento
    cy.get('.toast-message').contains(msj).then((contains)=>{
        //cy.log(contains)
        cy.log("CP evento Entrada exitoso")  
        cy.wait(2000)
    })  
})
//Fin rutina eventos por listado + formulario

//***** Fin rutinas de eventos para clientes estandar *****//